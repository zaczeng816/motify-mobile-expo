import React, { useState } from 'react';
import { StyleSheet, Image, Button, View, Text, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import LoginInput from '../components/LoginInput';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const loginTextHeight = screenHeight * 0.3;
const inputHeight = screenHeight * 0.3;

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSubmit = () => {
        console.log('Email:', email, 'Password:', password);
    };
    
    function signUpHandler(){
        navigation.navigate('SignUp');
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <View style={[styles.titleContainer, {height: loginTextHeight}]}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.loginText}>Please sign in to continue.</Text>
            </View>
            <View style={[styles.inputFields, {height: inputHeight}]}>
                <LoginInput title='Email' 
                            iconName='mail-outline'
                            onChangeText={setEmail}
                            value={email}
                            isPassword={false}/>
                <LoginInput title='Password' 
                            iconName='key-outline'
                            onChangeText={setPassword}
                            value={password}
                            isPassword={true}/>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.bottomTextContainer, {width: screenWidth}]}>
                <Text style={styles.noAccountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={signUpHandler}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleContainer:{
    justifyContent: 'flex-end',
    marginBottom: -20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
    
  },
  loginText:{
    color: '#A9A9A9',
    fontWeight: 'bold',
  },
  inputFields:{
    justifyContent: 'flex-end',
  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  buttonContainer:{
    marginTop: 50,
    borderRadius: 50,
    backgroundColor: 'orange',
    width: 300,
    height: 60,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
        width: 1,
        height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 6,
  },
  bottomTextContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
  },
  noAccountText:{
    color: '#A9A9A9',
    marginRight: 10,
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'orange',
    fontWeight: 'bold',
  },
});

export default LoginPage;
