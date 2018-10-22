import React, { Component } from 'react';
import {
    FlatList, TextInput,
    Image, StyleSheet, Text, View
} from 'react-native';
import circle from '../../assets/images/circle.png'
import SelectTextInput from '../lib/selectTextInput'
import { Button } from 'react-native-elements';

export default class InfoAndAddCategories extends Component {
    state = {
        categories: [],
        isFlatListShow: false,
        uncovered: true,
        value: null,
        valueSelect: null,
        category: '',
    }

    componentDidMount() {
        this.setState({ categories: this.props.categories })
    }

    handleFilterInput = text => {
        this.setState({ categories: this.props.categorysType.filter(category => category.name.toUpperCase().indexOf(text.toUpperCase()) != -1) })
    }

    handleShowAllCategories = () => {
        this.setState({
            categories: this.props.categories,
            isFlatListShow: !this.state.isFlatListShow,
            uncovered: !this.state.uncovered
        })
    }
    addCategory = (category, value) => {
        this.props.onPressButtonAdd(category, value)
        this.setState({ value: null, valueSelect: null })
    }
    showFlatList = () => this.setState({ isFlatListShow: true })

    toggleFlatListVisibility = () => this.setState({ isFlatListShow: !this.state.isFlatListShow })

    changeValueSelect = (value) => this.setState({ valueSelect: value })

    render() {

        const { uncovered, isFlatListShow, value, category, categories, valueSelect } = this.state

        return (
            <View>

                <SelectTextInput
                    width='80%'
                    onFilterInput={this.handleFilterInput}
                    onShowAllCategories={this.handleShowAllCategories}
                    isFlatListShow={isFlatListShow}
                    onShowFlatList={this.showFlatList}
                    onToggleFlatListVisibility={this.toggleFlatListVisibility}
                    uncovered={uncovered}
                    incB={(a, b) => this.addCategory(a, b)}
                    valueTextInput={valueSelect}
                    onChangeTextValue={(value) => this.changeValueSelect(value)}
                    placeholder={this.props.textSelectInput}
                    categories={categories}
                    onSelect={(categoryName) => { this.setState({ category: categoryName, uncovered: !uncovered }) }}
                    onChange={(event) => { this.setState({ category: event }) }}
                />

                <TextInput
                    value={this.state.value}
                    autoCorrect={false}
                    placeholder='Value'
                    keyboardType='numeric'
                    style={styles.inputPrice}
                    onChange={(event) => this.setState({ value: event.nativeEvent.text })} />

                <Button
                    buttonStyle={styles.buttonAdd}
                    textStyle={{ fontSize: 18 }}
                    title={this.props.textButton}
                    onPress={() => this.addCategory(category, value)}
                />

                <Text style={styles.previous}> {this.props.previousText}</Text>

                <FlatList
                    data={this.props.data}
                    style={styles.flatList}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imageFlatList}
                                mode='stretch'
                                source={circle}
                            />
                            <Text numberOfLines={1} style={styles.textCategoryFlatList}>
                                {item.category}
                            </Text>
                            <Text numberOfLines={1} style={styles.textPriceFlatList}>&#8381; {item.price}</Text>
                        </View>}
                    keyExtractor={item => item.id.toString()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputPrice: {
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
        width: '80%',
        height: '8%',
        paddingLeft: 5,
        fontSize: 18,
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,
    },
    previous: {
        marginTop: 15,
        alignSelf: 'center',
        width: '80%',
        fontSize: 18,
    },
    buttonAdd: {
        alignSelf: 'center',
        width: '87%',
        marginTop: 20,
        borderWidth: 0,
        borderRadius: 3,
        backgroundColor: 'cornflowerblue',
    },
    flatList: {
        alignSelf: 'center',
        marginTop: 10,
        width: '95%',
        height: '50%',
    },
    textCategoryFlatList: {
        width: '65%',
        alignSelf: 'flex-start',
        marginTop: 5,
        fontSize: 18,
    },
    textPriceFlatList: {
        alignSelf: 'flex-end',
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
    button: {
        backgroundColor: 'transparent',
    },
});