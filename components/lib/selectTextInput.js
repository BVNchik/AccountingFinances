import React, { Component } from 'react';
import { FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import circle from '../../assets/images/circle.png'
import down from '../../assets/images/down.png'
import up from '../../assets/images/up.png'

export default class SelectTextInput extends Component {

    filterInput = (text) => {
        this.props.onFilterInput(text)
    }

    showAllCategories = () => {
        this.props.onShowAllCategories()
    }

    showCategories = (event) => {
        this.filterInput(event)
        this.props.onChangeTextValue(event)
        this.props.onChange(event)
        if (!this.props.isFlatListShow)
            this.props.onShowFlatList()
    }

    choiceCategory = (categoryName) => {
        this.props.onSelect(categoryName)
        this.props.onChangeTextValue(categoryName)
        this.props.onToggleFlatListVisibility()
        this.filterInput(categoryName)

    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.choiceCategory(item.name)}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.imageFlatList}
                    mode='stretch'
                    source={circle} />
                <Text numberOfLines={1} style={styles.textCategoryFlatList}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { valueTextInput, placeholder, uncovered, categories } = this.props
        return (
            <View style={styles.views}>
                <View style={{ flexDirection: 'row', }}>
                    <TextInput
                        value={valueTextInput}
                        style={styles.textInput}
                        autoCorrect={true}
                        placeholder={placeholder}
                        onChangeText={(event) => this.showCategories(event)} />
                    <TouchableOpacity style={styles.button} onPress={() => this.showAllCategories()}>
                        <Image source={uncovered ? down : up} style={styles.imageButton} />
                    </TouchableOpacity>
                </View>
                {
                    this.props.isFlatListShow ?
                        (<FlatList
                            keyboardShouldPersistTaps='always'
                            data={categories}
                            style={styles.flatList}
                            showsVerticalScrollIndicator={true}
                            getItemLayout={(data, index) => { return { length: 33, index, offset: 33 * index } }}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    flatList: {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        width: '100%',
        maxHeight: 150,
    },
    textCategoryFlatList: {
        width: '65%',
        alignSelf: 'flex-start',
        marginTop: 5,
        fontSize: 18,
    },
    views: {
        marginTop: 15,
        width: '80%',
        minHeight: '8%',
        alignSelf: 'center',
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,

    },
    imageFlatList: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 25,
        width: 25,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    imageButton: {
        margin: 5,
        height: 25,
        width: 25
    },
    textInput:
    {
        marginTop: 10,
        textAlign: 'center',
        height: 40,
        fontSize: 18,
        width: '83%'
    }
});

