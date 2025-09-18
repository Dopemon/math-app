import { results } from '@/constants/modes';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Results = () => {

  const { results } = useLocalSearchParams();
  const gameSettings = JSON.parse(results as string) as results;

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Results</Text>
        <Text style={styles.result}>{gameSettings.time}</Text>
        <Text style={styles.result}>Problems: {gameSettings.problems}</Text>
        <Text style={styles.result}>Digits: {gameSettings.digits}</Text>
        <Text style={styles.result}>Operands: {gameSettings.operands.join(" ")}</Text>
        <Text style={styles.result}>Numbers: {gameSettings.numbers}</Text>
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
