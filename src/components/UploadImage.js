import React, { useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Icons from '../constants/Icons';

function UploadImage() {
    const [image, setImage] = useState(Icons.avatar);

    const addImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Please grant camera roll permissions inside your system's settings");
            return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setImage({ uri: result.assets[0].uri });
            }
        }
    };
    

    return (
        <View style={imageUploaderStyles.container}>
            {
                <Image source={image} style={imageUploaderStyles.profileImage} />
            }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default UploadImage;

const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 150,
        width: 150,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 999,
    },
    uploadBtnContainer: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        backgroundColor: '#DCDCDC',
        borderRadius: 25,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        zIndex: 20,
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
});

