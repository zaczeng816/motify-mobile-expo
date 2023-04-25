import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, ScrollView, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import DisplayChallenges from './DisplayChallenges';
import NoResult from './NoResult';
import Ionicons from 'react-native-vector-icons/Ionicons';

const categories = ['All', 'eating', 'exercise', 'finance', 'meditation','professional',
                    'reading', 'sleeping', 'social', 'study', 'writing'];

const FilterList = ({selectedCategory, setSelectedCategory}) => {
  function getCategoryText(category){
    return category.substring(0, 1).toUpperCase() + category.substring(1);
  }

  return (
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {categories.map((category) => (
              <TouchableOpacity
              key={category}
              style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}>
                  <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
                        {getCategoryText(category)}</Text>
              </TouchableOpacity>
          ))}
      </ScrollView>
  )
}

function SearchComponent({challenges}){
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResult, setSearchResult] = useState([])


  useEffect(() => {
      setSuggestions(filterData(challenges, searchQuery))}, 
      [challenges, searchQuery]);

  useEffect(() => {
    const results =
      selectedCategory === 'All' ? suggestions
        : suggestions.filter((challenge) => challenge.category === selectedCategory);
    setSearchResult(results);
  }, [selectedCategory, suggestions]);

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
      <View style={styles.filterListContainer}>
        <FilterList selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}/>
      </View>
      <View style={styles.displayChallengeContainer}> 
        <DisplayChallenges challenges={searchResult}/>
        {searchResult.length === 0  && <NoResult />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 4,
    marginVertical: 5,
    marginTop: 10,
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
  },
  categoryContainer: {
    paddingHorizontal: 10,
    maxHeight: 50,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    //backgroundColor: 'white',
    borderColor: 'orange',
    //borderWidth: 1,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    color: 'grey',
    //fontWeight: 'bold',
  },
  selectedCategoryText:{
    color: 'white',
  },
  selectedCategory: {
    backgroundColor: 'orange',
  },
  displayChallengeContainer: {
    flex: 1, 
  },
  filterListContainer: {
    marginVertical: 10,
  }
});

export default SearchComponent;
