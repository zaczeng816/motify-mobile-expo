import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import debounce from 'lodash/debounce';
import DisplayChallenges from './DisplayChallenges';
import NoResult from './NoResult';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SearchComponent({challenges}){
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
      setSuggestions(filterData(challenges, searchQuery))}, 
      [challenges, searchQuery]);

  // const handleSearch = debounce((query) => {setSearchQuery(query)}, 0);
  function handleSearch(query){
      setSearchQuery(query);
  }

  function filterData(challenges, query){
    if (!query) {
      return challenges;
    }
    return challenges.filter((challenge) => {
      const itemData = challenge.title.toUpperCase();
      const textData = query.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
  };

  function clearHandler(){
    setSearchQuery('');
  }

  function cancelHandler(){
    Keyboard.dismiss();
    setIsSearching(false);
    setSearchQuery('');
  }

  function handleFocus(){
    setIsSearching(true);
  }

  function handleBlur(){
    setIsSearching(false);
  }


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.searchIconContainer}>
            <Ionicons name='search' size={25} 
                                    style={styles.searchIcon}
                                    color='grey'/>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            value={searchQuery}
            placeholder="Search"
            autoCorrect={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {searchQuery !== '' && 
            <View style={styles.clearIconContainer}>
              <TouchableOpacity onPress={clearHandler}>
                <Ionicons name='close-circle' 
                          size={25}
                          color='grey'/>
                </TouchableOpacity>
              </View>
          }
        </View>
        {isSearching && 
          <TouchableOpacity onPress={cancelHandler}>
            <View style={styles.cancelButton}>
                <Text>Cancel</Text>
            </View>
          </TouchableOpacity>
        }

      </View>
      <DisplayChallenges challenges={suggestions} includeProgress={false}/>
      {suggestions.length === 0  && <NoResult />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row'
  },
  inputContainer: {
    flex: 4,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(0, 0%, 90%)',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  clearIconContainer:{
    flex: 1
  },
  input: {
    flex: 5,
    height: 50,
    borderColor: 'white',
    fontSize: 18,
    fontFamily: 'Arial',
    color: "#333"
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  }
});

export default SearchComponent;
