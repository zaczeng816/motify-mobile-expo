import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, StyleSheet, Modal, Switch, TouchableOpacity, Animated, TextInput, Keyboard} from 'react-native';
import { Text, Button, Divider,  } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import ScreenHeader from '../components/ScreenHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchSelector from 'react-native-switch-selector';
import PickerModal from '../components/PickerModal';
import Icons from '../constants/Icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const categories = [
  'Reading',
  'Exercise',
  'Meditation',
  'Sleeping',
  'Professional',
  'Social',
  'Finance',
];

const Section = ({title, showScrollModal, value}) => {
    function onPress(){
            showScrollModal(title);

    }

    if (value instanceof Date){
        const hour = value.getHours();
        const min = value.getMinutes();
        value = hour === 0? '': hour + 'hr ';
        value += min + ' min';
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionValue}>{value}</Text>
            </View> 
        </TouchableOpacity>
    )
};

const Title = ({title, setTitle, handleContentSizeChange, titleIcon}) => {
    return (
        <View style={styles.titleContainer}>
            <Image source={titleIcon} style={styles.titleIcon}/>
            <TextInput
                value={title}
                onChangeText={setTitle}
                onContentSizeChange={handleContentSizeChange}
                placeholder="Title..."
                placeholderTextColor="#C4C4C4"
                style={[styles.titleFont]}
            />
        </View>
    )
}

const Access = ({isPrivate, accessOptions, accessSwitchHandler}) => {
    return (
        <View style={styles.row}>
            <SwitchComponent value={isPrivate? 'private' : 'public'}
                            options={accessOptions} 
                            switchHandler={accessSwitchHandler}/>
        </View>
    )
}

const SwitchComponent = ({options, switchHandler}) => {
    return (
        <SwitchSelector options={options}
            initial={0}
            onPress={switchHandler}
            buttonColor='orange'
            borderRadius={10}
            />
    )
}

const Type = ({typeOptions, typeSwitchHandler}) => {
    return (
        <View style={styles.row}>
            <SwitchComponent options={typeOptions} 
                            switchHandler={typeSwitchHandler}/>
        </View>
    )
}

const FrequencyPicker = ({curFrequency, setCurFrequency}) => {
    return (
        <View>
            {/* <Text style={styles.titleText}>Frequency</Text> */}
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={curFrequency}
                onValueChange={(itemValue) => setCurFrequency(itemValue)}
                >
                <Picker.Item label="Day" value="day" />
                <Picker.Item label="Week" value="week" />
                <Picker.Item label="Month" value="month" />
                </Picker>
            </View>
        </View>
    )
}

const CategoryPicker = ({curCategory, setCurCategory}) => {
    return (
        <View>
            {/* <Text style={styles.titleText}>Category</Text> */}
            <View style={styles.pickerContainer}>
                <Picker
                selectedValue={curCategory}
                onValueChange={(itemValue) => setCurCategory(itemValue)}
                >
                {categories.map((cat, index) => (
                    <Picker.Item key={index} label={cat} value={cat} />
                ))}
                </Picker>
            </View>
      </View>
    )
}

const TimeBasedSwitch = ({isTimeBased, setIsTimeBased}) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Time-based</Text>
            <Switch value={isTimeBased} 
                    onValueChange={setIsTimeBased}
                    trackColor={{true: 'orange', false: 'grey'}} />
        </View>
    )
}

const OngoingSwitch = ({isOngoing, setIsOngoing}) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Ongoing</Text>
            <Switch value={isOngoing} 
                    onValueChange={setIsOngoing}
                    trackColor={{true: 'orange', false: 'grey'}} />
        </View>
    )
}

const TimePicker = ({curDuration, setCurDuration}) => {
    // const format = (date) => {
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     return `${hours}h ${minutes}m`;
    //   };

    return (
        <View style={styles.pickerContainer}>
            <DateTimePicker 
                value={curDuration}
                mode='time'
                is24Hour={true}
                display='spinner'
                onChange={(_, selectedDate) => setCurDuration(selectedDate)}
            />
        </View>
    )
}

const EnterAmount = ({amount, setAmount, unit, setUnit}) => {
    const amountWidthStyle = amount.toString().length > 3? {}: {width: 50};
    const unitWidthStyle = unit.length > 3? {}: {width: 50};

    return (
        <View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Amount</Text>
                <TextInput
                    style={[styles.amountInput, amountWidthStyle]}
                    label="Amount"
                    value={amount.toString()}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Unit</Text>
                <TextInput
                    style={[styles.amountInput, unitWidthStyle]}
                    label="Unit"
                    value={unit}
                    onChangeText={setUnit}
                    //placeholder="Enter unit"
                />
            </View>
        </View>
      )
}

const DatePicker = ({title, date, dateHandler}) => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={dateHandler}
                accentColor='orange'

            />
        </View>
    )
}

const Description = ({description, setDescription}) => {

    return (
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Challenge description..."
                    multiline
                    style={styles.descriptionInput}
                />
            </View>
    )
}


function ModifyChallengeModal({isModalVisible, hideModal, isNew, challenge}){

    const [title, setTitle] = isNew? useState('') : useState(challenge.title);
    const [category, setCategory] = isNew? useState(categories[0]) : useState(challenge.category);
    const [isPrivate, setIsPrivate] = isNew? useState(true) : useState(challenge.isPrivate);
    const [type, setType] = isNew? useState('habit') : useState(challenge.type);
    const [frequency, setFrequency] = isNew? useState('day') : useState(challenge.frequency);
    const [isTimeBased, setIsTimeBased] = isNew? useState(false) : useState(challenge.isTimeBased);
    const [duration, setDuration] = isNew? useState(new Date(0,0,0,0,0,0)) : useState(challenge.duration);
    const [amount, setAmount] = isNew? useState(0) : useState(challenge.amount);
    const [unit, setUnit] = isNew? useState('') : useState(challenge.unit);
    const [description, setDescription] = isNew? useState('') : useState(challenge.description);
    const [isOngoing, setIsOngoing] = isNew? useState(false) : useState(challenge.isOngoing);
    const [startDate, setStartDate] = isNew? useState(new Date()) : useState(challenge.startDate);
    const [endDate, setEndDate] = isNew? useState(new Date()) : useState(challenge.endDate);
    const [curCategory, setCurCategory] = useState(category);
    const [curFrequency, setCurFrequency] = useState(frequency);
    const [curDuration, setCurDuration] = useState(duration);

    const [scrollModalVisible, setScrollModalVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('');
    const [titleWidth, setTitleWidth] = useState(0);
    const [titleIcon, setTitleIcon] = useState(Icons[category.toLowerCase()]);

    const handleContentSizeChange = (event) => {
        const { width } = event.nativeEvent.contentSize;
        setTitleWidth(width);
      };

    const showScrollModal = (section) => {
        setCurrentSection(section);
        setScrollModalVisible(true);
      };

    const hideScrollModal = () => {
        setScrollModalVisible(false);
    };
    
    const renderScrollContent = () => {
        if (currentSection === 'Category'){
            return <CategoryPicker curCategory={curCategory}
                                    setCurCategory={setCurCategory}/>
        }
        else if (currentSection === 'Frequency'){
            return <FrequencyPicker curFrequency={curFrequency}
                                    setCurFrequency={setCurFrequency}/>
        }
        else if (currentSection === 'Duration'){
            return <TimePicker curDuration={curDuration}
                                setCurDuration={setCurDuration}/>
        }
    };

    const confirmSelection = () => {
        if (currentSection === 'Category') {
            setCategory(curCategory);
            const category = curCategory.toLowerCase();
            setTitleIcon(Icons[category]);
        } else if (currentSection === 'Duration') {
            setDuration(curDuration);
        } else if (currentSection === 'Frequency') {
            setFrequency(curFrequency);
        }
        hideScrollModal();
    };

  
    const handleSubmit = () => {
        hideModal();
        setTitle('');
        setIsPrivate(true);
        setType('habit');
        setCategory(categories[0]);
        setIsTimeBased(false);
        setDuration(new Date(0,0,0,0,0,0));
        setAmount(0);
        setUnit('');
        setIsOngoing(false);
        setStartDate(new Date());
        setEndDate((new Date()));
        setDescription('');
        // console.log('title: ' + title);
        // console.log('private: ' + isPrivate);
        // console.log('type: ' + type);
        // console.log('category: ' + category);
        // console.log('isTimeBased: '+ isTimeBased);
        // console.log('duration: '+ duration);
        // console.log('amount: '+ amount);
        // console.log('unit: '+ unit);
        // console.log('isOngoing: '+ isOngoing);
        // console.log('start date: '+ startDate);
        // console.log('end date: '+ endDate);
        // console.log('description: '+ description);
    };

    const accessOptions = [{label: 'Private', value: 'private'}, {label: 'Public', value: 'public'}];
    const typeOptions = [{label: 'Habit', value: 'habit'}, {label: 'Goal', value: 'goal'}];

    function accessSwitchHandler(value){
        setIsPrivate(value === 'private');
    }
    function typeSwitchHandler(value){
        setType(value);
    }

    function startDateHandler(event, selectedDate){
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
    }

    function endDateHandler(event, selectedDate){
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
    }

    const buttonTitle = isNew? 'Create Challenge' : 'Update Challenge';

    return (
        <Modal
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={hideModal}
        >
            <ScreenHeader title='Add new challenge'
                            leftIcon='close-sharp'
                            onLeftIconPress={hideModal}
                            />
            <KeyboardAwareScrollView style={styles.container}>
                <Title title={title}
                        setTitle={setTitle}
                        width={titleWidth}
                        handleContentSizeChange={handleContentSizeChange}
                        titleIcon={titleIcon}/>
                <Access isPrivate={isPrivate}
                        accessOptions={accessOptions}
                        accessSwitchHandler={accessSwitchHandler}/>
                <Type typeOptions={typeOptions}
                        typeSwitchHandler={typeSwitchHandler}/>
                <Section title='Category' 
                        showScrollModal={showScrollModal}
                        value={category}/>
                {type === 'habit' && 
                                <Section title='Frequency' 
                                        showScrollModal={showScrollModal}
                                        value={'Every ' + frequency}/>}
                <TimeBasedSwitch isTimeBased={isTimeBased}
                                setIsTimeBased={setIsTimeBased}/>
                {isTimeBased ?  <Section title='Duration' 
                                        showScrollModal={showScrollModal}
                                        value={duration}/> :
                                <View>
                                        <EnterAmount amount={amount} 
                                                    setAmount={setAmount}
                                                    unit={unit}
                                                    setUnit={setUnit}/>
                                </View>}
                <OngoingSwitch isOngoing={isOngoing} setIsOngoing={setIsOngoing}/>
                {!isOngoing && <View>
                                    <DatePicker title='Start Date'
                                                date={startDate}
                                                dateHandler={startDateHandler}/>
                                    <DatePicker title='End Date'
                                                date={endDate}
                                                dateHandler={endDateHandler}/>
                                </View>}
                <Description description={description} 
                            setDescription={setDescription}/>
                <PickerModal scrollModalVisible={scrollModalVisible}
                            hideScrollModal={hideScrollModal}
                            renderScrollContent={renderScrollContent}
                            confirmSelection={confirmSelection}/>
            </KeyboardAwareScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title={buttonTitle}
                    buttonStyle={styles.button}
                    onPress={handleSubmit}
                    />
            </View>
        </Modal>
      );
}

export default ModifyChallengeModal;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        marginTop: 100,
        padding: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    pickerContainer: {
      borderColor: 'gray',
      borderRadius: 5,
      margin: 30,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 40,
        paddingVertical: 15,
        shadowColor: "#000", // Set the shadow color
        shadowOffset: {
          width: 0,
          height: 3, // Control the vertical offset of the shadow
        },
        shadowOpacity: 0.3, // Control the opacity of the shadow
        shadowRadius: 4, // Control the blur radius of the shadow
        elevation: 5, // For Android, add elevation property to create shadow
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    titleContainer:{
        margin: 30,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 40
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        height: 70,
        width: 250
    },
    titleIcon:{
        height: 70,
        width: 70,
        marginRight: 20,
    },
    amountInput:{
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderRadius: 20,
        backgroundColor: 'white',
        height: 30,
        textAlign: 'center',
        padding: 5,

    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
      marginTop: 10,
      //marginHorizontal: 10,
      //borderWidth: 2,
      borderRadius: 20,
      borderColor: '#ccc',
      marginBottom: 250,
      padding: 20,
      paddingTop: 10,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      marginBottom: 250,
      fontSize: 18,
    },
    descriptionContainer:{
        marginTop: 30,
    },
    descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222',
        alignContent: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222',
        alignSelf: 'center',
        justifyContent: 'center'
      },
      
      sectionValue: {
        fontSize: 16,
        color: '#4d4d4d',
      },
  });