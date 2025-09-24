import { colors } from '@/constants/styles';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';

const I = ({children}: {children: React.ReactNode}) => (<Text style={{fontStyle:'italic'}}>{children}</Text>)
const B = ({children}: {children: React.ReactNode}) => (<Text style={{fontStyle:'normal', fontWeight:'800'}}>{children}</Text>)

const Info = () => {

  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"]

  const [name, setName] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
    // Navigation
    const router = useRouter();
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
    <ScrollView>
        <View style={{...styles.container, backgroundColor: primary}}>
            <Text style={{...styles.heading, color: secondary}}>Digit Range</Text>
            <Text style={{...styles.result, color: secondary}}>Numbers are generated randomly. The "digit" setting determines how many digits are generated for each number.</Text>
            <Text style={{...styles.result, color: secondary}}>However, in order to maintain reasonable complexity for division whenever division is the randomly selected operation instead of generating a random number and adding it on to the end of the equation, two random numbers in the digit range are multiplied together. The result is placed first, and the 2nd randomly generated number is added after the division. This helps ensure numbers are reasonably divisible.</Text>
            <Text style={{...styles.result, color: secondary}}><B>Example:</B></Text>
            <Text style={{...styles.result, color: secondary}}>When division is selected, this formula {"\n"}(<I>a * b = c</I>) is ran where <I>a</I> and <I>b</I> are randomly generated based on the digit range provided. Which is transformed into <I>c / b</I> before being added onto the equation.</Text>
            <Text style={{...styles.result, color: secondary}}></Text>
            {/* Section Break */}
            <Text style={{...styles.heading, color: secondary}}>Number Range</Text>
            <Text style={{...styles.result, color: secondary}}>First, a random number is generated to start the equation.</Text>
            <Text style={{...styles.result, color: secondary}}>Then a random operation (within the accepted operations) is selected, followed by another random number.</Text>
            <Text style={{...styles.result, color: secondary}}>However, if division is selected the previous number is removed for the first number in the division equation as described in the <B>Digit Range</B> section</Text>
            
        </View>
    </ScrollView>
  )
}

export default Info

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
        // justifyContent:'center',
        // marginTop: 100
    },
    resultsContainer:{
        display: 'flex',
        justifyContent:'space-around'
    },
    heading:{
        fontSize: 36,
        // textAlign:'center'
    },
    result:{
        fontSize: 20,
        // textAlign:'center',
        marginTop: 20,
    },
    modal:{
        flex: 1,
        padding: 22,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignContent: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderBottomWidth: 2,
        fontSize: 18,
        padding: 5,
        width: '80%',
        marginHorizontal: 'auto',
        textAlign: 'center',
        borderRadius: 20,
        fontWeight: 'bold'
      },
    submitButton: {
        height: 50, 
        borderRadius:25,
        borderWidth: 2, 
        marginBottom: '10%', 
        width: '80%',
        marginHorizontal: 'auto',
        marginTop: 50
    },
    submitButtonText:{
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 24, 
        textAlignVertical: 'center',
        height: '100%'
    },
})

