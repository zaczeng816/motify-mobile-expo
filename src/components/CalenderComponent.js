import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import { Calendar, Agenda, CalendarList } from "react-native-calendars";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Day from "./Day";

const { width, height } = Dimensions.get("window");

function CalendarComponent({
    handleDayPress,
    selectedDate,
    setMonth,
    setYear,
}) {
    const flatListRef = useRef(null);
    const startDate = "2023-01-01";
    const endDate = "2024-01-01";
    const dayWidth = width / 7;
    selectedDate = selectedDate.slice(0, 10);

    function generateDateRange(start, end) {
        const startDay = new Date(start);
        const endDay = new Date(end);
        const dateRange = [];

        while (startDay <= endDay) {
            dateRange.push(startDay.toISOString().split("T")[0]);
            startDay.setDate(startDay.getDate() + 1);
        }

        return dateRange;
    }

    const dateRange = generateDateRange(startDate, endDate);

    const renderItem = ({ item }) => (
        <Day
            date={item}
            selected={item === selectedDate}
            onPress={() => handleDayPress(item)}
            dayWidth={dayWidth}
        />
    );

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const currentItem = viewableItems[0].item;
            const currentDate = new Date(currentItem);
            setMonth(getMonthName(currentDate));
            setYear(currentDate.getFullYear());
            //console.log(currentItem.getFullYear());
        }
    }).current;

    const getItemLayout = (data, index) => {
        return {
            length: dayWidth,
            offset: dayWidth * index,
            index,
        };
    };

    function getMonthName(date) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return monthNames[date.getMonth()];
    }

    const initialIndex = dateRange.findIndex((date) => date === selectedDate);
    const initialDate = new Date(selectedDate);
    const initialDay = initialDate.getDay();
    const initialScrollIndex = initialIndex - initialDay;

    useEffect(() => {
        flatListRef.current.scrollToIndex({ index: initialScrollIndex });
    }, []);

    return (
        <View>
            <View style={styles.monthContainer}></View>
            <FlatList
                ref={flatListRef}
                horizontal
                data={dateRange}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item}-${index}`}
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialScrollIndex}
                onViewableItemsChanged={onViewableItemsChanged}
                getItemLayout={getItemLayout}
            />
        </View>
    );
}

export default CalendarComponent;

const styles = StyleSheet.create({
    monthContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    monthText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
