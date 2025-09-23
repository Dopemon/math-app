import { mode } from '@/constants/modes';
import { colors } from '@/constants/styles';
import { generate } from '@/services/generate';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';

const Play = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { primary, secondary } = colors[colorScheme || "light"];

    const { settings } = useLocalSearchParams();
    const gameSettings = JSON.parse(settings as string) as mode;

    const [input, setInput] = useState("");
    const [activeProblem, setActiveProblem] = useState(0);
    const [complete, setComplete] = useState(false);
    const [problems, setProblems] = useState<{problem: string, answer: string}[]>([]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const ms = milliseconds % 1000;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
      
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
      };

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            const startTime = Date.now() - time;
            timerRef.current = setInterval(() => {
            setTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning, time]);

    useEffect(() => {
        if (problems.length > 0) {
            setIsRunning(true);
        }
    }, [problems]);
    
    useEffect(()=>{
        var newProblems = [];
        for(var i = 0;i<gameSettings.problemCount;i++){
            var newProblem = 
            generate.randomProblem(
                gameSettings.digits, 
                gameSettings.numbers, 
                gameSettings.operands
            )
            newProblems.push(newProblem);
        }
        setProblems(newProblems);
    },[])

  return (
    <KeyboardAvoidingView
            style={{...styles.container, backgroundColor:primary}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Text style={{...styles.timerText, color: secondary}}>{formatTime(time)}</Text>
        <View style={{...styles.problemContainer}}>
            <Text style={{...styles.problem, opacity: 0.2, color: secondary}}>
                {problems[activeProblem-1] ? problems[activeProblem-1].problem : ""}
            </Text>
            <Text style={{...styles.problem, color: secondary}}>
                {problems[activeProblem] ? problems[activeProblem].problem : ""}
            </Text>
            <Text style={{...styles.problem, opacity: 0.2, color: secondary}}>
                {problems[activeProblem+1] ? problems[activeProblem+1].problem : ""}
            </Text>
        </View>
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TextInput 
                style={{...styles.input, backgroundColor: primary, color: secondary, borderColor: secondary}} 
                value={input} 
                onChangeText={(v)=>{
                    if(v === problems[activeProblem].answer){
                        if(activeProblem < problems.length-1){
                            setInput("");
                            setActiveProblem(activeProblem+1);
                        }else{
                            setInput("");
                            setComplete(true);
                            setIsRunning(false);
                            router.push({
                                pathname: "../results", 
                                params: { results: JSON.stringify({
                                    mode: gameSettings.name,
                                    time: formatTime(time), 
                                    problems: gameSettings.problemCount, 
                                    operands: ["+", "-", "*", "/"], 
                                    digits: gameSettings.digits, 
                                    numbers: gameSettings.numbers,
                                    timeInMs: time
                                })}
                            });
                        }
                    }else{
                        setInput(v);
                    }
                }} 
                keyboardType="numeric" 
                autoFocus />
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Play

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    problemContainer:{
        paddingVertical:0,
        display: 'flex',
        overflow:'hidden',
        justifyContent: 'center',
        alignItems:'center'
    },
    problem:{
        fontSize: 46,
        textAlign:'center'
    },
    input:{
        borderWidth: 2,
        borderColor: 'black',
        fontSize: 46,
        textAlign:'center',
        marginTop: -55
    },
    timerText: {
        fontSize: 42,
        textAlign:'center',
        opacity:0.7,
        marginTop:30
      },
})