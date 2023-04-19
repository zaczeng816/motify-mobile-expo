import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icons from '../constants/Icons';
//import { FlatList } from 'react-native-gesture-handler';

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

  function handleSend(){

  }

  function renderItem({item}) {
    return (
      <View key={item.id} style={styles.postBackground}>
        <View style={styles.post}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.postContent}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{item.content}</Text>
          {item.image && (
            <Image source={item.image} style={styles.postImage} />
          )}
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
            <FlatList data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.scrollView}>
            </FlatList>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder="Write your message..."
                    onChangeText={setMessage}
                    value={message}
                    />
                    <View style={styles.iconContainer}>
                        <TouchableOpacity style={styles.addButton}>
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
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    postContent: {
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
    // content: {
    //   marginTop: 10,
    // },
    postBackground: {
        backgroundColor: '#fff',
        //borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      },
    contentContainer: {
        marginTop: 10,
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
      //backgroundColor: '#FFF',
      //marginVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
        height: 100
      },
      input: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#f8f8f8', 
        borderColor: '#ccc',
        borderWidth: 1, 
        borderRadius: 25, 
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        marginRight: 10,
        fontSize: 16, // Increase the font size
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }
});
   
export default DiscussionComponent;
