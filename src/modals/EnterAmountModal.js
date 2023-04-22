// import React, { useState } from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions,} from 'react-native';

// function EnterAmountModal({isModalVisible, hideModal, onSubmit, challenge}){
//     const [inputValue, setInputValue] = useState('');
//     const isTimeBased = challenge.isTimeBased;
//     // console.log(isTimeBased);

//     const handleSubmit = () => {
//         onSubmit(inputValue);
//         setInputValue('');
//         hideModal();
//     };

//   return (
//     <Modal
//       animationType="fade"
//       transparent
//       visible={isModalVisible}
//       onRequestClose={hideModal}
//     >
//       <View style={styles.container}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>
//             {isTimeBased ? 'Enter duration' : 'Enter amount'}
//           </Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             onChangeText={setInputValue}
//             value={inputValue}
//           />
//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//               <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={hideModal}>
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fafafa',
//     width: Dimensions.get('window').width * 0.7,
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'orange',
//   },
//   input: {
//     backgroundColor: 'white',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: 'orange',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default EnterAmountModal;
