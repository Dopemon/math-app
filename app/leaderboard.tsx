import Picker from '@/component/picker';
import { colors } from '@/constants/styles';
import { fetchResults, init, Result } from '@/services/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

const Leaderboard = () => {

  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"];

  const [results, setResults] = useState<Result[]>([]);
  const [selected, setSelected] = useState<{value: string, label: string}[]>([{value: "Easy", label: "Easy"}]);

  useEffect(() => {
    const populateResults = async () => {
        try {
            await init();
            const res = await fetchResults({mode: selected[0].value});
            setResults(res);
        } catch (err) {
            console.error('Failed to add result.', err);
        }
    };
    populateResults();
  }, [selected]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const ms = milliseconds % 1000;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
  
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  return (
    <View style={{...styles.container, backgroundColor: primary}}>
      <View style={{...styles.table}}>
        <View style={{...styles.tableRow, ...styles.tableHeader, borderColor: secondary}}>
          <Text style={{...styles.headerText, color: secondary}}>
            Name
          </Text>
          <Text style={{...styles.headerText, color: secondary}}>
            Time
          </Text>
        </View>
        {results.map((d, i)=>(
          <View key={d.name+'-'+d.time+'-'+i} style={{...styles.tableRow, borderColor: secondary}}>
            <Text style={{...styles.rowText, color: secondary}}>
            {d.name}
          </Text>
          <Text style={{...styles.rowText, color: secondary}}>
            {formatTime(d.time)}
          </Text>
          </View>
        ))}
      </View>
      <View style={{...styles.picker}}>
        <Picker 
          colors={{primary, secondary}}
          selectionMax={1}
          fontSize={20}
          arr={[{value: "Easy", label: "Easy"}, {value: "Medium", label: "Medium"}, {value: "Hard", label: "Hard"}]} 
          selected={selected}
          onPress={(choice:{label:string,value:any}[])=>{setSelected([...choice])}} />
      </View>
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20%',
    paddingBottom: '20%',
  },
  text: {
    textAlign:'center',
    fontSize: 32
  },
  table:{
    width: '80%'
  },
  tableRow:{
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  tableHeader:{
    
  },
  headerText:{
    fontSize: 28,
    fontWeight:'bold',
    flex: 1
  },
  rowText:{
    fontSize: 24,
    paddingVertical:6,
    flex: 1
  },
  picker:{
    marginTop:40,
    width:'80%'
  }
})