import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import ModifyChallengeModal from '../../modals/ModifyChallengeModal';

function AddChallengeButton({refresh}) {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  function hideAddModal(){
      setIsAddModalVisible(false);
  }

  function onAddHandler(){
      setIsAddModalVisible(true);
  }

  return (
    <View>
      <TouchableOpacity onPress={onAddHandler} style={styles.addButton}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
      <ModifyChallengeModal isModalVisible={isAddModalVisible}
                          hideModal={hideAddModal}
                          isNew={true}
                          refresh={refresh}/>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'orange',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddChallengeButton;
