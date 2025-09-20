import { results } from '@/constants/modes';
import { colors } from '@/constants/styles';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

const Results = () => {
  const { results } = useLocalSearchParams();
  const gameSettings = JSON.parse(results as string) as results;

  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"]

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

  return (
    <View style={{...styles.container, backgroundColor: primary}}>
        <Text style={{...styles.heading, color: secondary}}>Results</Text>
        <Text style={{...styles.result, color: secondary}}>{gameSettings.mode}</Text>
        <Text style={{...styles.result, color: secondary}}>{gameSettings.time}</Text>
        <Text style={{...styles.result, color: secondary}}>Problems: {gameSettings.problems}</Text>
        <Text style={{...styles.result, color: secondary}}>Digits: {Math.min(...gameSettings.digits)}~{Math.max(...gameSettings.digits)}</Text>
        <Text style={{...styles.result, color: secondary}}>Operands: {gameSettings.operands.join(" ")}</Text>
        <Text style={{...styles.result, color: secondary}}>Numbers: {Math.min(...gameSettings.numbers)}~{Math.min(...gameSettings.numbers)}</Text>
    </View>
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
    }
})
