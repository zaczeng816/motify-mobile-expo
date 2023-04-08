import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChallengesForDay = ({ date }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Fetch challenges for the selected date from your backend API
    const fetchChallenges = async () => {
      const response = await fetch(`https://example.com/challenges?date=${date}`);
      const data = await response.json();
      setChallenges(data);
    };

    fetchChallenges();
  }, [date]);

  return (
    <View>
      <Text>Challenges for {date}</Text>
      {challenges.map((challenge) => (
        <Text key={challenge.id}>{challenge.name}</Text>
      ))}
    </View>
  );
};