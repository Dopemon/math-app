import Picker from '@/component/picker';
import { mode } from '@/constants/modes';
import { colors } from '@/constants/styles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

const Customize = () => {
    const router = useRouter();

    const colorScheme = useColorScheme();
    const { primary, secondary } = colors[colorScheme || "light"]


    const numberLengthOptions = [
        {label: "#", value: 1}, 
        {label: "##", value: 2}, 
        {label: "###", value: 3}, 
        {label: "####", value: 4}
    ];
    const [digits, setDigits] = useState([{label: "#", value: 1}]);

    const operandOptions = [
        {label: "+", value: "+"}, 
        {label: "-", value: "-"}, 
        {label: "*", value: "*"}, 
        {label: "/", value: "/"}
    ];
    const [operands, setOperands] = useState([
        {label: "+", value: "+"}, 
        {label: "-", value: "-"}, 
        {label: "*", value: "*"}, 
        {label: "/", value: "/"}
    ]);

    const minMaxNumberRangeOptions = [
        {label: "1+1", value: 2}, 
        {label: "1+1+1", value: 3}, 
        {label: "1+1+1+1", value: 4}
    ];

    const [minMaxNumberRange, setMinMaxNumberRange] = useState([{label: "1+1", value: 2}])

    const [problems, setProblems] = useState(20);

    const play = () => {
        router.push({ 
            pathname: `./play`, 
            params: { settings: JSON.stringify({
                name: "Custom",
                digits: digits.map(d=>d.value).sort(),
                operands: operands.map(o=>o.value),
                numbers: minMaxNumberRange.map(mm=>mm.value).sort(),
                problemCount: problems
            } as mode) }
        }) 
    }

  return (
    <View style={{...styles.container, backgroundColor: primary}}>
      <View style={styles.settingItem}>
        <View style={styles.section}>
            <Text style={{...styles.settingHeader, color: secondary}}>Digit Range</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Picker 
                    colors={{primary, secondary}}
                    selectionMax={2}
                    fontSize={20}
                    arr={numberLengthOptions} 
                    selected={digits}
                    onPress={(choice:{label:string,value:any}[])=>{setDigits(choice)}} />
            </View>
        </View>
        <View style={styles.section}>
            <Text  style={{...styles.settingHeader, color: secondary}}>Available Operations</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Picker 
                    colors={{primary, secondary}}
                    selectionMax={4}
                    fontSize={20}
                    arr={operandOptions} 
                    selected={operands}
                    onPress={(choice:{label:string,value:any}[])=>{setOperands(choice)}} />
            </View>
        </View>
        <View style={styles.section}>
            <Text  style={{...styles.settingHeader, color: secondary}}>Max Numbers</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Picker 
                    colors={{primary, secondary}}
                    selectionMax={2}
                    fontSize={20}
                    arr={minMaxNumberRangeOptions} 
                    selected={minMaxNumberRange}
                    onPress={(choice:{label:string,value:any}[])=>{setMinMaxNumberRange(choice)}} />
            </View>
        </View>
        <View style={styles.section}>
            <Text style={{...styles.settingHeader, color: secondary}}>Problems</Text>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Pressable 
                    style={({ pressed }) => [
                        {backgroundColor: pressed ? secondary : primary}, 
                        {...styles.incrementButtons, ...styles.left, borderColor: secondary} 
                    ]}
                    onPress={() => setProblems(problems-1)}>
                    {({pressed}) => (
                        <Text style={{...styles.incrementButtonsText, fontSize: 18, color: pressed ? primary : secondary }}>-</Text>
                    )}
                </Pressable>
                <Text style={{...styles.incrementText, width: '20%', textAlign: 'center', color: secondary}}>{problems}</Text>
                <Pressable 
                    style={({ pressed }) => [
                        {backgroundColor: pressed ? secondary : primary}, 
                        {...styles.incrementButtons, ...styles.right, borderColor: secondary} 
                    ]}
                    onPress={() => setProblems(problems+1)}>
                        {({pressed}) => (
                            <Text style={{...styles.incrementButtonsText, color: pressed ? primary : secondary}}>+</Text>
                        )}
                </Pressable>
            </View>
        </View>
      </View>
      <Pressable 
        style={({ pressed }) => [
            {backgroundColor: pressed ? secondary : primary}, 
            {...styles.submitButton, borderColor: secondary} 
        ]}
        onPress={()=>play()}>
        {({pressed}) => (
            <Text style={pressed ? {...styles.submitButtonText, color: primary} : {...styles.submitButtonText, color: secondary}}>
                Start
            </Text>
        )}
      </Pressable>
    </View>
  )
}

export default Customize

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    settingItem:{
        flex: 1,
        padding: 20,
        maxWidth: '90%',
    },
    settingHeader:{
        fontSize: 24,
        marginBottom: 10,
        width:'100%'
    },
    section:{
        marginBottom: 30
    },
    marker: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#000', // Red color for the thumbs
        borderWidth: 2,
        borderColor: '#f0f0f0',
    },
    selectedTrack:{
        backgroundColor:'#000',
        height:5
    },
    unselectedTrack:{
        backgroundColor:'#f0f0f0',
        height:5
    },
    minMaxStylesValue:{
        fontSize: 20,
        textAlignVertical:'center',
        color: '#555'
    },
    submitButton: {
        height: 50, 
        borderRadius:25,
        borderWidth: 2, 
        marginBottom: '10%', 
        width: '80%'
    },
    submitButtonText:{
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 24, 
        textAlignVertical: 'center',
        height: '100%'
    },
    incrementButtonsText:{
        fontSize: 18,
        width:'100%',
        marginVertical:'auto',
        textAlignVertical:'center',
        textAlign:'center'
    },
    incrementButtons:{
        height: 40,
        width: 75,
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2
    },
    left:{
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20
    },
    right:{
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    incrementText:{
        marginVertical:'auto',
        fontSize: 24,
    }
})