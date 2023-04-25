import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import UploadImage from '../components/UploadImage';
import Icons from '../constants/Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [userName, setUserName] = useState('Your Name');
    const [isEditingName, setIsEditingName] = useState(false);
    const userEmail = 'user@example.com';
    const logOutColor = 'orange';
    const versionNumber = 'Version 0.1.0';
    const supportEmail = 'motify@gmail.com';
    const switchBackgroundColor = '#cccccc';


    function SettingItem({ label, value }) {
        return (
            <View style={styles.settingItemContainer}>
                <Text style={styles.settingItemLabel}>{label}</Text>
                <Text style={styles.settingItemValue}>{value}</Text>
            </View>
            );
    }

    function SettingSwitch({ label, isEnabled, toggleSwitch }) {
    return (
        <View style={styles.settingSwitchContainer}>
        <Text style={styles.settingSwitchLabel}>{label}</Text>
        <Switch
            trackColor={{false: switchBackgroundColor,true: 'orange' }}
            ios_backgroundColor={switchBackgroundColor}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        </View>
    );
    }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
            <UploadImage />
            {isEditingName ? (
                <TextInput
                    style={styles.profileNameInput}
                    value={userName}
                    onChangeText={setUserName}
                    onSubmitEditing={() => setIsEditingName(false)}
                    autoFocus={true}
                    blurOnSubmit={true}
                />
                ) : (
                <View style={styles.profileNameContainer}>
                    <Text style={styles.profileName}>{userName}</Text>
                    <View style={styles.penIcon}>
                      <TouchableOpacity onPress={() => setIsEditingName(true)}>
                          {/* <Image source={Icons.pencil} style={styles.pencil}/> */}
                          <FontAwesome name='pencil' size={20} color="grey" style={styles.pencil}/>
                          {/* <Ionicons name='pencil' size={20} style={styles.pencil} color=''/> */}
                      </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <SettingItem label="Email" value={userEmail} />
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <SettingSwitch
            label="Enable Notifications"
            isEnabled={notificationsEnabled}
            toggleSwitch={() => setNotificationsEnabled(!notificationsEnabled)}
            />
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            <SettingItem label="About" value={versionNumber} />
            <SettingItem label="Contact us" value={supportEmail} />
        </View>

        <TouchableOpacity style={[styles.button, {backgroundColor: logOutColor}]}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}


export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingItemLabel: {
    fontSize: 14,
  },
  settingItemValue: {
    fontSize: 14,
    color: '#888',
  },
  settingSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingSwitchLabel: {
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  profileNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 10,
    paddingHorizontal: 10, 
    width: '100%',
  },
  penIcon: {
    marginLeft: 10,
    marginTop: 10
  },
  profileNameInput: {
    paddingTop: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'black',
},
  pencil: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: -20,
    top: -10,
  }
});


