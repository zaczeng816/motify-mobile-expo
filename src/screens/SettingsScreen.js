import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Switch } from 'react-native';
import Icons from '../constants/Icons';

function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const userName = 'Your Name';
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
            <Image
            style={styles.profileImage}
            source={Icons.avatar}
            />
            <Text style={styles.profileName}>{userName}</Text>
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
    //backgroundColor: '#F5F5F5',
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
    //marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});


