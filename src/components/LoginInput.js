import React, {useEffect, useState} from "react";
import { TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function LoginInput({title, iconName, onChangeText, value, isPassword}){
    const [isMasked, setIsMasked] = useState(isPassword);
    const [isFocused, setIsFocused] = useState(false);
    const [iconColor, setIconColor] = useState('grey');
    const eyeIconColor = isMasked ? 'grey' : 'orange';

    const toggleMask = () => {
        setIsMasked(!isMasked);
    };

    useEffect(() => {
        if (isFocused){
            setIconColor('black');
        }
        else{
            setIconColor('grey');
        }
    }, [isFocused])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return(
        <View style={[styles.container, isFocused && styles.focused]}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={30} color={iconColor}/>
            </View>
            <TextInput placeholder={title}
                        onChangeText={onChangeText}
                        value={value}
                        style={styles.textBox}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        secureTextEntry={isMasked}/>
            {isPassword && (
                <TouchableOpacity onPress={toggleMask} style={{marginTop: 3}}>
                    <Ionicons name={isMasked ? 'eye-outline' : 'eye-off-outline'} size={24} color={eyeIconColor} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default LoginInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    focused:{
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    iconContainer:{
        marginRight: 15,
    },
    textBox:{
        flex: 1,
    }
})