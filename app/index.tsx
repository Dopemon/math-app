import { generate } from '@/services/generate';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.baseContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Math App</Text>
      </View>
      <FlatList 
        contentContainerStyle={styles.menuContainer}
        data={["Play", "Settings", "Leaderboard"]}
        keyExtractor={item => item}
        renderItem={({item}: {item: string}) => (
          <Pressable 
            key={item} 
            style={({ pressed }) => [
              {backgroundColor: pressed ? '#000' : '#f0f0f0'}, 
              styles.menuItem 
            ]}
            onPress={()=>{ router.push(`./${item.toLowerCase()}`) }}>
            {({pressed}) => (
              <Text style={pressed ? {...styles.menuItemText, color: '#fff'} : styles.menuItemText}>
                {item}
              </Text>
            )}
          </Pressable>
        )}
      />
      <View style={styles.footerContainer}>
        <Pressable onPress={() => {
          console.log(generate.randomProblem([1,10], 3, ["+","-","*","/"]))
        }}>
          <Text>Generate</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  baseContainer:{
    flex: 1,
    alignContent: 'space-between',
    padding: 24,
    backgroundColor: '#eaeaea'
  },
  titleContainer:{
    flex: 1,
  },
  title:{
    fontSize: 36,
    textAlign: 'center'
  },
  menuContainer:{
    display: 'flex',
  },
  menuItem:{
    flex: 1,
    paddingHorizontal: 40,
    borderColor: '#000',
    borderWidth: 2,
    height: 50,
    borderRadius: 25,
    marginBottom: 17,
  },
  menuItemText:{
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  footerContainer:{
    flex: 1,
  },
})