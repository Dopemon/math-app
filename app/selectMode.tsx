import { modes } from '@/constants/modes';
import { colors } from '@/constants/styles';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

const SelectMode = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"];

  // Navigation
  const navigation = useNavigation();

  // Effect
  useEffect(() => { 
      const listener = navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
          router.push("/");
      });
      return () => {
          navigation.removeListener('beforeRemove', listener);
      };
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: primary}}>
      <FlatList 
              contentContainerStyle={styles.menuContainer}
              data={[...Object.keys(modes), "Custom"]}
              keyExtractor={item => item}
              renderItem={({ item }: { item: string }) => (
                <Pressable 
                  style={({ pressed }) => [
                    {backgroundColor: pressed ? secondary : primary}, 
                    {...styles.menuItem, borderColor: secondary} 
                  ]}
                  onPress={()=>{ 
                    if(item == "Custom"){
                      router.push("/customize");
                    }else{
                      router.push({ 
                        pathname: `./play`, 
                        params: { settings: JSON.stringify(modes[item as keyof typeof modes]) }
                    })
                    } 
                  }}>
                  {({pressed}) => (
                    <Text style={pressed ? {...styles.menuItemText, color: primary} : {...styles.menuItemText, color: secondary}}>
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
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      },
})