import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Modal, Switch, TouchableOpacity, Animated} from 'react-native';
import { Input, Text, Button, Divider,  } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import ScreenHeader from '../components/ScreenHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import SwitchSelector from 'react-native-switch-selector';
import PickerModal from '../components/PickerModal';

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

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Text style={styles.sectionValue}>{value}</Text>
            </View> 
        </TouchableOpacity>
    )
};

const Title = ({title, setTitle, width, handleContentSizeChange}) => {
    return (
        <View style={styles.titleContainer}>
            <Input
                value={title}
                onChangeText={setTitle}
                onContentSizeChange={handleContentSizeChange}
                placeholder="Challenge title"
                style={[styles.titleFont, {width: width}]}
            />
        </View>
    )
}

const Access = ({accessOptions, accessSwitchHandler}) => {
    return (
        <View style={styles.row}>
            <SwitchComponent options={accessOptions} 
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
    return (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={curDuration}
            onValueChange={(itemValue) => setCurDuration(itemValue)}
            >
            {Array.from({ length: 61 }, (_, i) => i).map((value, index) => (
              <Picker.Item key={index} label={`${value} min`} value={value} />
            ))}
          </Picker>
        </View>
    )
}

const EnterAmount = ({amount, setAmount, unit, setUnit}) => {
    return (
        <View>
            <Input
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
            />
            <Input
                label="Unit"
                value={unit}
                onChangeText={setUnit}
                placeholder="Enter unit"
            />
        </View>
      )
}

const StartEndDate = ({startDate, startDateHandler, endDate, endDateHandler}) => {
    return (
        <View>
            <Text>Start Date</Text>
            <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={startDateHandler}
            />
            <Text>End Date</Text>
            <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={endDateHandler}
            />
        </View>
    )
}

const Description = ({description, setDescription}) => {
    return (
        <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter challenge description"
            multiline
            inputStyle={styles.descriptionInput}
      />
    )
}


function NewChallengeModal({isModalVisible, hideModal}){

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [isPrivate, setIsPrivate] = useState(true);
    const [type, setType] = useState('habit');
    const [frequency, setFrequency] = useState('day');
    const [isTimeBased, setIsTimeBased] = useState(false);
    const [duration, setDuration] = useState(0);
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [description, setDescription] = useState('');
    const [isOngoing, setIsOngoing] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [curCategory, setCurCategory] = useState(categories[0]);
    const [curFrequency, setCurFrequency] = useState();
    const [curDuration, setCurDuration] = useState();

    const [overlayOpacity] = useState(new Animated.Value(0));
    const [scrollModalVisible, setScrollModalVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('');

    const [titleWidth, setTitleWidth] = useState(0);

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
        setDuration(0);
        setAmount();
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
          <ScrollView style={styles.container}>
                <Title title={title} 
                        setTitle={setTitle}
                        width={titleWidth}
                        handleContentSizeChange={handleContentSizeChange}/>
                <Access accessOptions={accessOptions}
                        accessSwitchHandler={accessSwitchHandler}/>
                <Type typeOptions={typeOptions}
                        typeSwitchHandler={typeSwitchHandler}/>
                <Section title='Category' 
                        showScrollModal={showScrollModal}
                        value={category}/>
                {type === 'habit' && 
                                <Section title='Frequency' 
                                        showScrollModal={showScrollModal}
                                        value={frequency}/>}
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
                {!isOngoing && <StartEndDate startDate={startDate}
                                            startDateHandler={startDateHandler}
                                            endDate={endDate}
                                            endDateHandler={endDateHandler}/>}
                <Description description={description} 
                            setDescription={setDescription}/>
                <PickerModal scrollModalVisible={scrollModalVisible}
                            hideScrollModal={hideScrollModal}
                            renderScrollContent={renderScrollContent}
                            confirmSelection={confirmSelection}/>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title="Create Challenge"
                    buttonStyle={styles.button}
                    onPress={handleSubmit}
                    />
            </View>
        </Modal>
      );
}

export default NewChallengeModal;

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

    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleFont: {
        textAlign: 'center',
        fontWeight: 'bold',
        //color: '#9b9b9b',
        fontSize: 25
    },
    titleContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        margin: 30
    },
    descriptionInput: {
      height: 100,
      textAlignVertical: 'top',
      marginTop: 10,
      borderWidth: 2,
      borderRadius: 20,
      borderColor: 'gray',
      marginBottom: 250,
      //borderBottomWidth: 0
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
        color: 'black',
      },
      sectionValue: {
        fontSize: 16,
        color: 'black',
      },
  });