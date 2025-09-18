import { modes } from '@/constants/modes';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const SelectMode = () => {
  const router = useRouter();

//   const modes = 
//   const modes = ["Easy", "Medium", "Hard"];

  return (
    <View style={styles.container}>
      <FlatList 
              contentContainerStyle={styles.menuContainer}
              data={Object.keys(modes)}
              keyExtractor={item => item}
              renderItem={({ item }: { item: string }) => (
                <Pressable 
                  style={({ pressed }) => [
                    {backgroundColor: pressed ? '#000' : '#f0f0f0'}, 
                    styles.menuItem 
                  ]}
                  onPress={()=>{ 
                    router.push({ 
                        pathname: `./play`, 
                        params: { settings: JSON.stringify(modes[item as keyof typeof modes]) }
                    }) 
                  }}>
                  {({pressed}) => (
                    <Text style={pressed ? {...styles.menuItemText, color: '#fff'} : styles.menuItemText}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  )}
                </Pressable>
              )}
            />
    </View>
  )
}

export default SelectMode

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea'
      },
    menuContainer:{
        flex: 1,
        marginTop: -50,
        alignItems:'center',
        justifyContent: 'center',
      },
      menuItem:{
        // flex: 1,
        width: 300,
        height: 50,
        paddingHorizontal: 40,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 25,
        marginBottom: 17,
        justifyContent: 'center'
      },
      menuItemText:{
        // height: '100%',
        // width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      },
})