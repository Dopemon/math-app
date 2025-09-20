import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Picker = ({colors, selectionMax, fontSize, arr, selected, onPress}:{
    colors: {primary: string, secondary: string}
    selectionMax: number,
    fontSize: number,
    arr:{label: string, value: any}[], 
    selected:{label: string, value: any}[], 
    onPress: (choice:{label: string, value: any}[])=>void
}) => {
    const {primary, secondary} = colors;
    const padding = 2;
  return (
    <View style={{...styles.container, borderRadius: 20, borderColor: secondary}}>
        {
            arr.map((str, i)=>{console.log(str);return (
                <Pressable 
                    key={str.label+"-"+str.value} 
                    style={({ pressed }) => [
                        {backgroundColor: pressed||selected.find((v)=>v.value==str.value) ? secondary : primary}, 
                        i == 0 ? {...styles.firstItem } : {...styles.item, borderLeftColor: selected.find((v)=>v.value==str.value) ? primary : secondary}
                    ]}
                    onPress={() => {
                        if(selected.find((v)=>v.value==str.value)){
                            onPress(selected.filter(v => v.value!=str.value))
                        }else if(!selected.find((v)=>v.value==str.value) && selected.length<selectionMax){
                            onPress([...selected, str])
                        }
                    }}>

                    {({pressed}) => (
                        <Text style={pressed||selected.find((v)=>v.value==str.value) ? {...styles.itemText, color: primary, fontSize, padding} : {...styles.itemText, fontSize, padding, color: secondary}}>
                            {str.label}
                        </Text>
                    )}

                </Pressable>
            )})
        }
    </View>
  )
}

export default Picker

const styles = StyleSheet.create({
    container:{
        width:"100%",
        flexDirection:'row',
        borderWidth: 2,
        overflow:'hidden',
        height:40
    },
    firstItem:{
        flex: 1,
        marginVertical: 'auto',
    },
    item:{
        flex: 1,
        alignSelf: 'flex-start',
        marginVertical: 'auto',
        borderLeftWidth: 1
    },
    itemText:{
        display: 'flex',
        flex: 1,
        textAlign:'center',
        textAlignVertical:'center'
    }
})