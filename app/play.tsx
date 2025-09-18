import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Play = () => {

    const router = useRouter();

    const [input, setInput] = useState("");
    const [activeProblem, setActiveProblem] = useState(0);
    const [complete, setComplete] = useState(false);

    const problems = [
        {problem: "5 * 5", answer: "25"},
        {problem: "5 + 5", answer: "10"},
        {problem: "2 + 4", answer: "6"},
        {problem: "4 * 8", answer: "32"},
        {problem: "10 + 5", answer: "15"},
        {problem: "10 / 2", answer: "5"},
    ]
  return (
    <View style={styles.container}>
        <View style={{...styles.problemContainer}}>
            <Text style={{...styles.problem, opacity: 0.2}}>
                {problems[activeProblem-1] ? problems[activeProblem-1].problem : ""}
            </Text>
            <Text style={styles.problem}>
                {problems[activeProblem] ? problems[activeProblem].problem : ""}
            </Text>
            <Text style={{...styles.problem, opacity: 0.2}}>
                {problems[activeProblem+1] ? problems[activeProblem+1].problem : ""}
            </Text>
        </View>
        <TextInput 
            style={styles.input} 
            value={input} 
            onChangeText={(v)=>{
                if(v === problems[activeProblem].answer){
                    if(activeProblem < problems.length-1){
                        setInput("");
                        setActiveProblem(activeProblem+1);
                    }else{
                        console.log("COMPLETE");
                        setInput("");
                        setComplete(true);
                        router.push("../results");
                    }
                }else{
                    setInput(v);
                }
            }} 
            keyboardType="numeric" 
            autoFocus />
    </View>
  )
}

export default Play

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    problemContainer:{
        paddingVertical:40,
        maxHeight: 200,
        overflow:'hidden'
    },
    problem:{
        fontSize: 46,
        textAlign:'center'
    },
    input:{
        borderWidth: 2,
        borderColor: 'black',
        fontSize: 46,
        textAlign:'center'
    }
})