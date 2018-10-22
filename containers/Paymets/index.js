import React, { PureComponent } from 'react';
import {
    ActivityIndicator, Keyboard,
    TouchableOpacity,
    Image, StyleSheet, Text, View
} from 'react-native';
import { connect } from 'react-redux'
import { fetchPayment, addPayment } from '../../redux/actions/payments'
import { fetchCategoriesAll } from '../../redux/actions/categories'
import { filteredCategoriesForPayments } from '../../redux/selectors/categoriesPayments'
import menu from '../../assets/images/menu.png'
import InfoAndAddCategories from '../../components/lib/showInfoAndAddCategories'

export class PaymentsScreen extends PureComponent {

    componentDidMount() {
        this.props.onCategoriesRequest()
        this.props.onPaymentRequest()
    }

    static navigationOptions = {
        drawerLabel: 'Payments'
    }

    state = {
            deleteText: false,
    }

    addPayment = (category, price) => {
        if (category !== '' && price !== null) {
            const data = {category, price}
            this.props.onAddPayment(data)
            this.setState({ deleteText: true })
            Keyboard.dismiss()
        }
    }

    render() {
        const { isSpinerShow, categories, categoriesPayments } = this.props
        return (
            <View >
                {isSpinerShow
                    ? (<View height={'100%'} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    ) :
                    (<View>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.button} onPress={this.props.navigation.toggleDrawer}>
                                <Image source={menu} style={styles.iconMenu} />
                            </TouchableOpacity>
                            <Text style={styles.textCaption}>Payments</Text>
                        </View>
                        <InfoAndAddCategories
                            categories={categories}
                            textSelectInput='Categories Payments...'
                            textButton="Add payments"
                            previousText='Previous payments:'
                            deleteText={this.state.deleteText}
                            data={categoriesPayments}
                            categorysType={categories}
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
    onCategoriesRequest() { return dispatch(fetchCategoriesAll()) },
    onPaymentRequest() { return dispatch(fetchPayment()) },
    onAddPayment(data) { return dispatch(addPayment(data)) }
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

