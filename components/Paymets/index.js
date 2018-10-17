import React, { Component } from 'react';
import {
    ActivityIndicator, Keyboard,
    TouchableOpacity,
    Image, StyleSheet, Text, View
} from 'react-native';
import { connect } from 'react-redux'
import { fetchPayments, addPayments } from '../../redux/actions/payments'
import { fetchCategories } from '../../redux/actions/categories'
import { filteredCategoriesForPayments } from '../../redux/selectors/categoriesPayments'
import menu from '../images/menu.png'
import InfoAndAddCategories from '../lib/showInfoAndAddCategories'

export class PaymentsScreen extends Component {

    componentDidMount() {
        this.props.onCategoriesRequest()
        this.props.onPaymentsRequest()
    }

    static navigationOptions = {
        drawerLabel: 'Payments'
    }

    handleIncomesScreen = () => {
        this.props.navigation.navigate('PaymentsScreen')
    }

    constructor(props) {
        super(props);
        this.state = {
            deleteText: false,
        };
    }

    addPayment(categoryPayments, value) {
        if (categoryPayments != '' && value != null) {
            this.props.onAddPayments(categoryPayments, value)
            this.setState({ deleteText: true })
            Keyboard.dismiss()
        }
    }

    render() {
        return (
            <View >
                {this.props.isSpinerShow
                    ? (<View height={'100%'} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    ) :
                    (<View>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.toggleDrawer()}>
                                <Image source={menu} style={styles.iconMenu} />
                            </TouchableOpacity>
                            <Text style={styles.textCaption}>Payments</Text>
                        </View>
                        <InfoAndAddCategories
                            categories={this.props.categories}
                            textSelectInput='Categories Payments...'
                            textButton="Add payments"
                            previousText='Previous payments:'
                            deleteText={this.state.deleteText}
                            data={this.props.categoriesPayments}
                            categorysType={this.props.categories}
                            onPressButtonAdd={(categoryPayments, value) => this.addPayment(categoryPayments, value)}
                        />
                    </View>)
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    categories: filteredCategoriesForPayments(state.categories),
    isSpinerShow: state.payments.isSpinerShowPaymentsScreen,
    categoriesPayments: state.payments.payments,
})

const mapDispatchToProps = dispatch => ({
    onCategoriesRequest() { return dispatch(fetchCategories()) },
    onPaymentsRequest() { return dispatch(fetchPayments()) },
    onAddPayments(categoryPayments, value) { return dispatch(addPayments(categoryPayments, value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen)

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingTop: 20,
        flexDirection: 'row',
        backgroundColor: 'cornflowerblue',
    },
    button: {
        backgroundColor: 'transparent',
    },
    textCaption: {
        width: '100%',
        alignSelf: 'center',
        fontSize: 18,
    },
    iconMenu: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        height: 25,
        width: 25
    },
});

