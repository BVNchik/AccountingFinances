import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import circle from '../images/circle.png'
import { PieChart } from 'react-native-svg-charts'

export default class Charts extends Component {
    render() {
        const chartData = (category) => {
            return category.map((category, index) => {
                return {
                    key: category.name,
                    value: parseInt(category.sum),
                    svg: { fill: category.color },
                    arc: { outerRadius: (70) + '%', padAngle: this.props.label === category.name ? 0.03 : 0 },
                    onPress: () => {
                        this.props.onEditionLabel(category.name)
                        this.flatListRef.scrollToIndex({ animated: true, index: index })
                        this.props.onShowCategory(index)
                    }
                }
            })
        }
        return (
            <View style={{ margin: 0 }}>

                <PieChart
                    style={{ height: '55%' }}
                    outerRadius={'120%'}
                    innerRadius={'25%'}
                    data={
                        chartData(this.props.category)}
                />
                <FlatList
                    getItemLayout={(data, index) => { return { length: 33, offset: 33 * index, index } }}
                    data={this.props.category}
                    style={styles.flatList}
                    showsVerticalScrollIndicator={true}
                    ref={(ref) => { this.flatListRef = ref; }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.props.onChoiceItem(item.name, index)} style={{ borderWidth: index === this.props.selectedItem ? 2 : 0 }} >
                            <View style={{ flexDirection: 'row', backgroundColor: item.color, }}>
                                <Image style={index === this.props.selectedItem ? styles.selectedImageFlatList : styles.imageFlatList}
                                    mode='stretch'
                                    source={circle}
                                />
                                <Text numberOfLines={1} style={index === this.props.selectedItem ? styles.selectedTextCategoryFlatList : styles.textCategoryFlatList}>
                                    {item.name}
                                </Text>
                                <Text numberOfLines={1} style={index === this.props.selectedItem ? styles.selectedTextPriceFlatList : styles.textPriceFlatList}>&#8381; {item.sum}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatList: {
        alignSelf: 'center',
        marginTop: 10,
        width: '95%',
        height: 150,
    },
    textCategoryFlatList: {
        width: '65%',
        alignSelf: 'flex-start',
        marginTop: 5,
        fontSize: 18,
    },
    textPriceFlatList: {
        alignSelf: 'flex-end',
        marginTop: 5,
        width: '25%',
        marginBottom: 5,
        fontSize: 18,
    },
    imageFlatList: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 25,
        width: 25,
    },
    selectedTextCategoryFlatList: {
        width: '65%',
        alignSelf: 'flex-start',
        marginTop: 5,
        fontSize: 22,
    },
    selectedTextPriceFlatList: {
        alignSelf: 'flex-end',
        marginTop: 5,
        width: '25%',
        marginBottom: 12,
        fontSize: 22,
    },
    selectedImageFlatList: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 35,
        width: 35,
    },
    pieChart: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
});