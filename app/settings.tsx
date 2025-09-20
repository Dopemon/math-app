import Picker from '@/component/picker';
import { colors } from '@/constants/styles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

const Settings = () => {
    const colorScheme = useColorScheme();
    const { primary, secondary } = colors[colorScheme || "light"];

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

    const [minMaxNumberRange, setMinMaxNumberRange] = useState([1,10])


  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <View style={styles.section}>
            <Text style={styles.settingHeader}>Max Digits per Number</Text>
            <View style={{}}>
                <Picker 
                    colors={{primary, secondary}}
                    selectionMax={1}
                    fontSize={20}
                    arr={numberLengthOptions} 
                    selected={digits}
                    onPress={(choice:{label:string,value:any}[])=>{setDigits(choice)}} />
            </View>
        </View>
        <View style={styles.section}>
            <Text style={styles.settingHeader}>Available Operands</Text>
            <View style={{}}>
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
            <Text style={styles.settingHeader}>Max Numbers</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Text style={styles.minMaxStylesValue}>
                    {minMaxNumberRange[0]<10 ? "0"+minMaxNumberRange[0] : minMaxNumberRange[0]}
                </Text>
                <MultiSlider 
                    values={[minMaxNumberRange[0], minMaxNumberRange[1]]}
                    sliderLength={250}
                    onValuesChange={setMinMaxNumberRange}
                    min={1}
                    max={10}
                    step={1}
                    snapped
                    markerStyle={styles.marker}
                    selectedStyle={styles.selectedTrack}
                    unselectedStyle={styles.unselectedTrack}
                />
                <Text style={styles.minMaxStylesValue}>
                    {minMaxNumberRange[1]<10 ? "0"+minMaxNumberRange[1] : minMaxNumberRange[1]}
                </Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    settingItem:{
        flex: 1,
        padding: 20
    },
    settingHeader:{
        fontSize: 24,
        marginBottom: 10
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
    }
})