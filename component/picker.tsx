import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Picker = ({selectionMax, fontSize, arr, selected, onPress}:{
    selectionMax: number,
    fontSize: number,
    arr:string[], 
    selected:string[], 
    onPress: (choice:string[])=>void
}) => {
    const padding = 2;
  return (
    <View style={{...styles.container, borderRadius: 20}}>
        {
            arr.map((str, i)=>(
                <Pressable 
                    key={str} 
                    style={({ pressed }) => [
                        {backgroundColor: pressed||selected.includes(str) ? '#000' : '#f0f0f0'}, 
                        i == 0 ? {...styles.firstItem} : {...styles.item}
                    ]}
                    onPress={() => {
                        if(selected.includes(str)){
                            onPress(selected.filter(v => v!= str))
                        }else if(!selected.includes(str) && selected.length<selectionMax){
                            onPress([...selected, str])
                        }
                    }}>

                    {({pressed}) => (
                        <Text style={pressed||selected.includes(str) ? {...styles.itemText, color: '#fff', fontSize, padding} : {...styles.itemText, fontSize, padding}}>
                            {str}
                        </Text>
                    )}

                </Pressable>
            ))
        }
    </View>
  )
}

export default Picker

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor: 'black',
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
        borderLeftWidth: 1,
        borderLeftColor:'black',
    },
    itemText:{
        display: 'flex',
        flex: 1,
        textAlign:'center',
        textAlignVertical:'center'
    }
})