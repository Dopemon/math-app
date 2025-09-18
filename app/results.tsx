import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Results = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Results</Text>
        <Text style={styles.result}>00:00:46</Text>
        <Text style={styles.result}>36 problems</Text>
        <Text style={styles.result}>1-3 Digits</Text>
        <Text style={styles.result}>All Operands</Text>
        <Text style={styles.result}>2-4 Numbers per. Equation</Text>
    </View>
  )
}

export default Results

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
        justifyContent:'center'
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
