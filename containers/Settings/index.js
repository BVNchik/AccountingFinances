import React, { PureComponent } from 'react';
import {
    Keyboard, ActivityIndicator,
    FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Text, View
} from 'react-native';
import edit from '../../assets/images/edit.png'
import trash from '../../assets/images/trash.png'
import add from '../../assets/images/squareAdd.png'
import menu from '../../assets/images/menu.png'
import { ColorPicker } from 'react-native-status-color-picker';
import { addCategory, updateCategory, deleteCategory, fetchCategoriesAll } from '../../redux/actions/categories'
import { filteredCategoriesForIncomes } from '../../redux/selectors/categoriesIncomes'
import { filteredCategoriesForPayments } from '../../redux/selectors/categoriesPayments'
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux'

export class SettingsScreen extends PureComponent {

    static navigationOptions = {
        drawerLabel: 'Settings'
    }

    state = {
        categoryName: '',
        typeCategory: '',
        modifiedCategoryName: '',
        changeCategoryId: '',
        functionModalName: '',
        textModal: '',
        textCancelButtonModal: 'CANCEL',
        textOkButtonModal: '',
        colors: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"],
        selectedColor: '#F44336',
    }

    componentDidMount() {
        this.props.onFetchCategoriesAll()
    }

    selectColor = color => this.setState({ selectedColor: color.toUpperCase() });

    functionModal = () => {
        const { functionModalName, modifiedCategoryName, typeCategory, selectedColor, changeCategoryId } = this.state
        if (functionModalName === 'AddNew') {
            const data = { category: modifiedCategoryName, type: typeCategory, color: selectedColor }
            console.log('data', data)
            this.props.onAddCategory(data)

        } else {
            const data = {category: modifiedCategoryName, color: selectedColor }
            this.props.onUpdateCategory(changeCategoryId, data)
        }
        Keyboard.dismiss()
        this.refs.modal.close()
    }

    deleteCategorys = (categoryId) => {
        this.props.onDeletedCategory(categoryId)
    }

    showModal = (typeModule, typeCategory, id, categoryName, color) => {
        if (typeModule === 'AddNew') {
            if (this.state.typeCategory === 'income') {
                this.setState({ textModal: 'Add new category income' })
            }
            else {
                this.setState({ textModal: 'Add new category payment' })
            }
            this.setState({ textOkButtonModal: 'ADD' })
        } else {
            this.setState({
                changeCategoryId: id, textModal: 'Edit category payment',
                textOkButtonModal: 'EDIT', categoryName: categoryName, selectedColor: color.toUpperCase(),
            })
            let newColors = this.state.colors.filter(colors => colors != color.toUpperCase())
            this.setState({ colors: [color.toUpperCase(), ...newColors] })
        }
        this.setState({ typeCategory: typeCategory, functionModalName: typeModule })
        this.refs.modal.open()
    }


    render() {
        const { textModal,
            textCancelButtonModal,
            textOkButtonModal, categoryName, isShowModal } = this.state

        return (

            <View>
                {this.props.isSpinerShow
                    ? (<View height={'100%'} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    ) : (
                        <View>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.buttonBar} onPress={this.props.navigation.toggleDrawer}>
                                    <Image source={menu} style={styles.iconMenu} />
                                </TouchableOpacity>
                                <Text style={styles.textCaption}>Settings</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Text style={styles.textCategories}>Payments category</Text>
                                <Text style={{ fontSize: 18 }}> Add new </Text>
                                <TouchableOpacity style={styles.button} onPress={() => this.showModal('AddNew', 'payment')}>
                                    <Image source={add} style={styles.imageSize25} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={this.props.categoryPayments.sort((a, b) => a.id - b.id)}
                                style={styles.flatList}
                                showsVerticalScrollIndicator={true}
                                renderItem={({ item }) =>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ fontSize: 18, marginLeft: 15, }}>-</Text>
                                        <Text style={styles.textCategory}>
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity style={[styles.categoryTouch, { backgroundColor: item.color }]}>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.showModal('Edit', 'payment', item.id, item.name, item.color)}>
                                            <Image source={edit} style={styles.imageSize25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteCategorys(item.id)}>
                                            <Image source={trash} style={styles.imageDeleted} />
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id.toString()}
                            />

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Text style={styles.textCategories}>Incomes category </Text>
                                <Text style={{ fontSize: 18 }}> Add new </Text>
                                <TouchableOpacity style={styles.button} onPress={() => this.showModal('AddNew', 'income')}  >
                                    <Image source={add} style={styles.imageSize25} />
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={this.props.categoryIncomes.sort((a, b) => a.id - b.id)}
                                style={styles.flatList}
                                showsVerticalScrollIndicator={true}
                                renderItem={({ item }) =>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <Text style={{ fontSize: 18, marginLeft: 15, }}>-</Text>
                                        <Text style={styles.textCategory}>
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity style={[styles.categoryTouch, { backgroundColor: item.color }]}>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.showModal('Edit', 'income', item.id, item.name, item.color)}>
                                            <Image source={edit} style={styles.imageSize25} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.deleteCategorys(item.id)}>
                                            <Image source={trash} style={{ marginLeft: 13, height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.id.toString()}
                            />
                            <Modal
                                ref={'modal'}
                                style={styles.modal}
                                position={'center'}
                                backdrop={true}>
                                <View  >
                                    <Text style={{ fontSize: 18, marginTop: 30, marginBottom: 10 }}>{textModal}</Text>
                                </View>
                                <TextInput style={styles.categoryNameInput}
                                    placeholder={categoryName}
                                    onChange={(event) => this.setState({ modifiedCategoryName: event.nativeEvent.text })} />
                                <View height={90}>
                                    <ColorPicker
                                        colors={this.state.colors}
                                        selectedColor={this.state.selectedColor}
                                        onSelect={this.selectColor}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.buttonCancelModal} onPress={() => this.closeModal()}>
                                        <Text> {textCancelButtonModal}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonOkModal} onPress={() => this.functionModal()}>
                                        <Text> {textOkButtonModal} </Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>

                        </View >
                    )
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isSpinerShow: state.categories.isSpinerShow,
    categoryPayments: filteredCategoriesForPayments(state.categories),
    categoryIncomes: filteredCategoriesForIncomes(state.categories),
})

const mapDispatchToProps = dispatch => ({
    onFetchCategoriesAll() { return dispatch(fetchCategoriesAll()) },
    onAddCategory(data) {
        return dispatch(addCategory(data))
    },
    onUpdateCategory(categoryId, data) {
        return dispatch(updateCategory(categoryId, data))
    },
    onDeletedCategory(categoryId) {
        return dispatch(deleteCategory(categoryId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingTop: 25,
        flexDirection: 'row',
        backgroundColor: 'cornflowerblue',
    },
    categoryNameInput: {
        fontSize: 18,
        height: 50,
        width: '90%',
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    imageSize25: {
        height: 25,
        width: 25
    },
    iconMenu: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        height: 25,
        width: 25
    },
    imageDeleted: {
        marginLeft: 13,
        height: 25,
        width: 25
    },
    modal: {
        height: 300,
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
    },
    categoryTouch: {
        height: 23,
        width: 23,
        marginRight: 15,
        marginTop: 3,
    },
    button: {
        marginLeft: 10,
        backgroundColor: 'transparent',
    },
    buttonBar: {
        backgroundColor: 'transparent',
    },
    textCategories: {
        marginLeft: 15,
        width: '58%',
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    textCategory: {
        width: '60%',
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    textCaption: {
        width: '100%',
        alignSelf: 'center',
        fontSize: 18,
    },
    flatList: {
        height: '35%',
        marginTop: 10,
    },
    buttonCancelModal: {
        backgroundColor: 'transparent',
        height: '50%',
        width: '40%',
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: 'black',
        alignItems: 'center',
        marginRight: 25,
        marginTop: 15,
        marginBottom: 0,
    },
    buttonOkModal: {
        backgroundColor: 'transparent',
        height: '50%',
        width: '40%',
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: 'black',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 15,
    }
});