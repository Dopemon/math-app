import { results } from '@/constants/modes';
import { colors } from '@/constants/styles';
import { fetchResults, init, insertResult } from '@/services/database';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';

const Results = () => {
  const { results } = useLocalSearchParams();
  const gameSettings = JSON.parse(results as string) as results;

  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"]

  const [name, setName] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
    // Navigation
    const router = useRouter();
    const navigation = useNavigation();

    // Effect
    useEffect(() => { 
        const listener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            router.push("/selectMode");
        });
        return () => {
            navigation.removeListener('beforeRemove', listener);
        };
    }, []);

    useEffect(() => { 
        const startup = async () => {
            try {
                await init();
                const res = await fetchResults({mode: gameSettings.mode});
                if(res.length < 10 || Math.max(...res.map(v=>v.time)) > gameSettings.timeInMs){
                    setModalVisibility(true);
                }
            }catch (err) {
                console.error('Failed to set modal visibility.', err);
            }
        }
        startup();
    }, []);

    const addResult = async (mode: string, lowDigitRange: number, highDigitRange: number, lowMaxDigitRange: number, highMaxDigitRange: number, problems: number, operands: string[], timeInMs: number, name: string) => {
        try {
            await insertResult(mode, lowDigitRange, highDigitRange, lowMaxDigitRange, highMaxDigitRange, problems, operands, timeInMs, name);
            const res = await fetchResults({mode});
        } catch (err) {
            console.error('Failed to add result.', err);
        }
    };

    const submitHighScore = async () => {
        setModalVisibility(false);
        await addResult(
            gameSettings.mode, 
            Math.min(...gameSettings.digits), 
            Math.max(...gameSettings.digits), 
            Math.min(...gameSettings.numbers), 
            Math.max(...gameSettings.numbers), 
            gameSettings.problems, 
            gameSettings.operands,
            gameSettings.timeInMs, 
            name)
    }

  return (
    <>
        <View style={{...styles.container, backgroundColor: primary}}>
            <Text style={{...styles.heading, color: secondary}}>Results</Text>
            <Text style={{...styles.result, color: secondary}}>{gameSettings.mode}</Text>
            <Text style={{...styles.result, color: secondary}}>{gameSettings.time}</Text>
            <Text style={{...styles.result, color: secondary}}>Problems: {gameSettings.problems}</Text>
            <Text style={{...styles.result, color: secondary}}>Digits: {Math.min(...gameSettings.digits)}~{Math.max(...gameSettings.digits)}</Text>
            <Text style={{...styles.result, color: secondary}}>Operands: {gameSettings.operands.join(" ")}</Text>
            <Text style={{...styles.result, color: secondary}}>Numbers: {Math.min(...gameSettings.numbers)}~{Math.min(...gameSettings.numbers)}</Text>
        </View>
        <Modal visible={modalVisibility} transparent={true} animationType='slide'>
            <View style={{...styles.modal, backgroundColor: primary}}>
                <Text style={{color: 'white', fontSize: 24, textAlign: 'center', marginBottom: 20}}>New High Score!</Text>
                <TextInput 
                    autoCapitalize = {"characters"}
                    value={name} 
                    onChangeText={setName} 
                    style={{...styles.textInput, color: secondary}} 
                    maxLength={5}
                    autoFocus={true}
                    autoComplete='off' 
                    autoCorrect={false} />
                <Text style={{color: 'white', fontSize: 24, textAlign: 'center', marginTop: 20}}>{gameSettings.time}</Text>
                <Pressable 
                    style={({ pressed }) => [
                        {backgroundColor: pressed ? secondary : primary}, 
                        {...styles.submitButton, borderColor: secondary} 
                    ]}
                    onPress={submitHighScore}>
                    {({pressed}) => (
                        <Text style={pressed ? {...styles.submitButtonText, color: primary} : {...styles.submitButtonText, color: secondary}}>
                            Submit
                        </Text>
                    )}
                </Pressable>
            </View>
        </Modal>
    </>
  )
}

export default Results

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
        justifyContent:'center',
        marginTop: -200
    },
    resultsContainer:{
        display: 'flex',
        justifyContent:'space-around'
    },
    heading:{
        fontSize: 36,
        textAlign:'center'
    },
    result:{
        fontSize: 24,
        textAlign:'center',
        marginTop: 20,
    },
    modal:{
        flex: 1,
        padding: 22,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#ffffff',
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff',
        fontSize: 18,
        padding: 5,
        width: '80%',
        marginHorizontal: 'auto',
        textAlign: 'center',
        borderRadius: 20,
        fontWeight: 'bold'
      },
    submitButton: {
        height: 50, 
        borderRadius:25,
        borderWidth: 2, 
        marginBottom: '10%', 
        width: '80%',
        marginHorizontal: 'auto',
        marginTop: 50
    },
    submitButtonText:{
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 24, 
        textAlignVertical: 'center',
        height: '100%'
    },
})

