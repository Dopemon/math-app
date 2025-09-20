import { colors } from '@/constants/styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

const Index = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { primary, secondary } = colors[colorScheme || "light"] as colors

  return (
    <View style={{...styles.baseContainer, backgroundColor: primary}}>
      <View style={styles.titleContainer}>
        <Text style={{...styles.title, color: secondary}}>Math App</Text>
      </View>
      <FlatList 
        contentContainerStyle={styles.menuContainer}
        data={[{label: "Play", value: "selectMode"}, {label: "Settings", value: "settings"}, {label:"Leaderboard", value:"leaderboard"}]}
        keyExtractor={item => item.value}
        renderItem={({item}: {item: {label: string, value: string}}) => (
          <Pressable 
            key={item.value} 
            style={({ pressed }) => [
              {backgroundColor: pressed ? secondary : primary}, 
              {...styles.menuItem, borderColor: secondary}
            ]}
            onPress={()=>{ router.push(`./${item.value}`) }}>
            {({pressed}) => (
              <Text style={pressed ? {...styles.menuItemText, color: primary} : {...styles.menuItemText, color: secondary}}>
                {item.label}
              </Text>
            )}
          </Pressable>
        )}
      />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  baseContainer:{
    flex: 1,
    alignContent: 'space-between',
    padding: 24,
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