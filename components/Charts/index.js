import React, { PureComponent } from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { fetchCategoriesSum } from '../../redux/actions/categories'
import Charts from '../lib/charts'
import menu from '../images/menu.png'
import Modal from 'react-native-modalbox';
import MonthSelectorCalendar from 'react-native-month-selector'
import { filteredCategoriesForChartsIncomes, filteredCategoriesForChartsPayments } from '../../redux/selectors/categoriesSum';

export class ChartsScreen extends PureComponent {

    static navigationOptions = {
        drawerLabel: 'Charts'
    }

    handleChartsScreen = () => {
        this.props.navigation.navigate('ChartsScreen')
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            isPaymentChartsShow: true,
            isIncomeChartsShow: false,
            label: '',
            year: (new Date()).getFullYear(),
            _month: (new Date()).getMonth(),
            categoryPayments: [],
            categoryIncomes: [],
            monthAndYear: '',
        };
    }

    componentDidMount() {
        this.props.onFetchCategories(this.state._month, this.state.year)
        this.setState({ monthAndYear: `${this.state._month + 1}/${this.state.year}` })
    }

    shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
        return a;
    }

    addMonthAndYear(dates) {
        let month = dates.format('M')
        let year = dates.format('YYYY')
        this.setState({ _month: month, years: year, month: dates, monthAndYear: `${month}/${year}` })
        this.props.fetchCategories(month - 1, year)
    }

    showModal() {
        this.refs.modal.open()
    }

    showPayments() {
        this.setState({ isIncomeChartsShow: false, isPaymentChartsShow: true, selectedItem: null })
    }

    showIncomes() {
        this.setState({ isIncomeChartsShow: true, isPaymentChartsShow: false, selectedItem: null })
    }

    choiceItem(name, index) {
        this.setState({ label: name })
        this.showCategoryInFlatList(index)
    }

    showCategoryInFlatList(index) {
        this.setState({ selectedItem: index })
    }

    render() {
        const { isIncomeChartsShow, isPaymentChartsShow, label, selectedItem, monthAndYear } = this.state;

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
                        <View height={'100%'}>
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.buttonBar} onPress={() => this.props.navigation.toggleDrawer()}>
                                    <Image source={menu} style={styles.iconMenu} />
                                </TouchableOpacity>
                                <Text style={styles.textCaption}>Charts</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[styles.touchShowCategory,
                                    { backgroundColor: isPaymentChartsShow ? 'white' : 'grey', }]}
                                    onPress={() => this.showPayments()}>
                                    <Text>Payment</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.touchShowCategory,
                                    { backgroundColor: isIncomeChartsShow ? 'white' : 'grey', }]}
                                    onPress={() => this.showIncomes()}>
                                    <Text>Income</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={styles.textReportMonth}>Report month: </Text>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => this.showModal()}>
                                    <Text>{monthAndYear}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Payments */}
                            {
                                isPaymentChartsShow ?
                                    (
                                        <Charts
                                            category={this.props.categoryPayments}
                                            selectedItem={selectedItem}
                                            label={label}
                                            onEditionLabel={(label) => this.setState({ label: label })}
                                            choiceItem={(name, index) => this.choiceItem(name, index)}
                                            showCategoryInFlatList={(index) => this.showCategoryInFlatList(index)}
                                        />

                                    ) : null
                            }
                            {/* Incomes */}
                            {
                                isIncomeChartsShow ?
                                    (<Charts
                                        category={this.props.categoryIncomes}
                                        selectedItem={selectedItem}
                                        label={label}
                                        onEditionLabel={(label) => this.setState({ label: label })}
                                        choiceItem={(name, index) => this.choiceItem(name, index)}
                                        showCategoryInFlatList={(index) => this.showCategoryInFlatList(index)}
                                    />
                                    ) : null
                            }
                            <Modal
                                style={styles.modal}
                                ref={'modal'}
                                position={'center'}
                                backdrop={true}>
                                <View style={{ width: '90%' }}>
                                    <MonthSelectorCalendar
                                        selectedDate={this.state.month}
                                        monthTapped={(date) => this.addMonthAndYear(date)}
                                    />
                                </View>
                            </Modal>

                        </View >
                    )
                }
            </View >
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories,
    isSpinerShow: state.categories.isSpinerShowChartsScreen,
    categoriesSum: state.categories.categoriesSum,
    categoryPayments: filteredCategoriesForChartsPayments(state),
    categoryIncomes: filteredCategoriesForChartsIncomes(state)
})

const mapDispatchToProps = dispatch => ({
    onFetchCategories(month, year) { return dispatch(fetchCategoriesSum(month, year)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen)

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingTop: 25,
        flexDirection: 'row',
        backgroundColor: 'cornflowerblue',
    },
    textCaption: {
        width: '100%',
        alignSelf: 'center',
        fontSize: 18,
    },
    textReportMonth: {
        width: '65%',
        alignSelf: 'flex-start',
        fontSize: 14,
        marginLeft: 20,
    },
    touchShowCategoryIncome: {
        width: '50%',
        height: 30,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3
    },
    iconMenu: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        height: 25,
        width: 25
    },
    flatList: {
        alignSelf: 'center',
        marginTop: 10,
        width: '95%',
        height: 150,
    },
    button: {
        backgroundColor: 'transparent',
    },
    modal: {
        height: 320,
        width: '85%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
    },
});