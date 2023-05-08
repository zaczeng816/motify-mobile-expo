import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function AmountInput({inputValue, setInputValue, challenge}){
    return (
      <View>
        <Text style={styles.modalTitle}>Completed amount</Text>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              onChangeText={setInputValue}
              value={inputValue}
            />
            <Text style={styles.unitText}>{challenge.workload.unit}</Text>
          </View>
      </View>
    )
}

function DurationInput({inputTime, setInputTime}){
    return (
      <View>
        <Text style={styles.modalTitle}>Completed time</Text>
        <View style={styles.pickerContainer}>
            <DateTimePicker
                value={inputTime}
                mode='time'
                is24Hour={true}
                display='spinner'
                onChange={(_, selectedDate) => setInputTime(selectedDate)}
                style={{height: 150}}
            />
        </View>
      </View>
    )
}

function EnterAmountModal({isModalVisible, hideModal, onSubmit, challenge, refresh}){
    const [amountInputValue, setAmountInputValue] = useState(0);
    const [timeInputValue, setTimeInputValue] = useState(new Date(0,0,0,0,0,0));
    const [isTimeBased, setIsTimeBased] = useState(challenge.workload.type === 'time');

    useEffect(() => {
      setIsTimeBased(challenge.workload.type === 'time');
    }, [challenge])

    const handleSubmit = () => {
      if (isTimeBased) {
        onSubmit(timeInputValue.toISOString());
      }
      else{
        onSubmit(amountInputValue);
      }
      setAmountInputValue('');
      setTimeInputValue(new Date(0,0,0,0,0,0));
      refresh();
      hideModal();
    };

    const cancelHandler = () => {
      hideModal();
      setAmountInputValue('');
      setTimeInputValue(new Date(0,0,0,0,0,0));
    }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {isTimeBased && <DurationInput inputTime={timeInputValue}
                                  setInputTime={setTimeInputValue}/>}
          {!isTimeBased && <AmountInput challenge={challenge}
                                  inputValue={amountInputValue}
                                  setInputValue={setAmountInputValue}/>}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelHandler}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fafafa',
    width: Dimensions.get('window').width * 0.7,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'orange',
  },
  amountInput: {
    backgroundColor: 'white',
    width: 80,
    textAlign: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginRight: 5,
  },
  unitText: {
    fontSize: 20,
    color: '#444',
    // fontWeight: 'bold',
    marginLeft: 10,
},
  amountInputContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'orange',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cancelButton:{
    backgroundColor: '#C0C0C0'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  pickerContainer: {
    borderColor: 'gray',
    borderRadius: 5,
    margin: 30,
  },
});

export default EnterAmountModal;
