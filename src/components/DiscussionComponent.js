import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icons from '../constants/Icons';
import * as ImagePicker from 'expo-image-picker';

const posts = [
  {
    id: 1,
    author: 'Alice',
    avatar: Icons.avatar,
    content: 'This is a sample text post.',
    timestamp: '10:00 4/14/23 ',
  },
  {
    id: 2,
    author: 'Bob',
    avatar: Icons.avatar,
    content: 'This is another sample text post.',
    image: Icons.reading,
    timestamp: '12:30 3/15/23',
  },
  {
    id: 3,
    author: 'Casey',
    avatar: Icons.avatar,
    content: 'This is another sample text post.',
    //image: Icons.reading,
    timestamp: '6:30 2/18/23',
  },
  {
    id: 4,
    author: 'David',
    avatar: Icons.avatar,
    content: 'This is another sample text post.',
    //image: Icons.reading,
    timestamp: '18:20 7/11/22',
  },
];

function DiscussionComponent() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [inputHeight, setInputHeight] = useState(30);

  function deletePost(){
    Alert.alert('Confirm delete', 
                'Do you want to delete this post?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Confirm', onPress: () =>{} },
                ])
  }

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

  function handleSend(){

  }

  function renderItem({item}) {
    return (
      <View key={item.id} style={styles.postBackground}>
        <View style={styles.post}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.postInfo}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.postContent}>
            <Text style={styles.content}>{item.content}</Text>
            {item.image && (
              <Image source={item.image} style={styles.postImage} />
            )}
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={deletePost}>
              <Ionicons name='trash-outline' size={20} color='grey'/>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollView}
        />
        <View style={styles.inputContainer}>
          <View style={styles.customInputContainer}>
          {image && (
              <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setImage(null)}>
                  <Ionicons name="close-circle-outline" size={25} color="#fff"
                            style={{marginTop: -1.7, marginLeft: -0.5}}/>
                </TouchableOpacity>
                <Image source={image} style={styles.imagePreview} />
              </View>)}
            <TextInput
                style={[styles.input, {height: inputHeight}]}
                placeholder="Write your message..."
                onChangeText={setMessage}
                value={message}
                multiline={true}
                onContentSizeChange={(event) => {
                  setInputHeight(Math.max(30, event.nativeEvent.contentSize.height));
                }}
            />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addImage}>
              <Ionicons name="camera-sharp" size={30} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={25} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    scrollView: {
      //padding: 10,
    },
    flatListContainer: {
        flex: 1
    },
    post: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 10
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    postInfo: {
      flex: 1,
    },
    author: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    timestamp: {
      fontSize: 12,
      color: '#999',
      marginBottom: 5,
    },
    postBackground: {
        backgroundColor: '#fff',
        //borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      },
      contentContainer: {
        marginTop: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'relative',
      },
    postImage: {
        width: 200, 
        height: 200,
        marginTop: 20, 
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#d9d9d9',
        resizeMode: 'contain'
    },
    separator: {
        marginVertical: 10,
    },
    inputContainer: {
      borderColor: 'black',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#eee',
      backgroundColor: '#fff',
      //height: 100,
    },
    customInputContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 5,
      backgroundColor: '#f8f8f8',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginRight: 10,
      marginBottom: 20,
    },
    input: {
      //flex: 1,
      fontSize: 16,
      width: '100%'
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
    },
      sendContainer:{
        flexDirection: 'row',
        alignItems: 'center'
      },    
      addButton: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        //width: 50
      },
      sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        //width: 50,
        marginTop: 15,
        marginRight: 5,
      },
      iconContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      imageContainer: {
        position: 'relative',
      },
      closeButton: {
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
        top: -5,
        right: -5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      },
      deleteButton: {
        position: 'absolute',
        bottom: -20, 
        right: 0, 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
});
   
export default DiscussionComponent;