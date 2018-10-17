import React, { PureComponent } from 'react';
import {
    ActivityIndicator,
    Keyboard, TouchableOpacity,
    Image, StyleSheet, Text, View
} from 'react-native';
import { connect } from 'react-redux'
import { fetchIncomes, addIncomes } from '../../redux/actions/incomes'
import { filteredCategoriesForIncomes } from '../../redux/selectors/categoriesIncomes'
import menu from '../../assets/images/menu.png'
import InfoAndAddCategories from '../../components/lib/showInfoAndAddCategories'
import { fetchCategoriesAll } from '../../redux/actions/categories'

export class IncomesScreen extends PureComponent {

    componentDidMount() {
        this.props.onCategoriesRequest()
        this.props.onIncomesRequest()
    }

    state = {
        deleteText: false,
    }

    static navigationOptions = {
        drawerLabel: 'Incomes'
    }

    addIncome = (categoryIncomes, value) => {
        if (categoryIncomes != '' && value != null) {
            const data = { categoriesIncomes, value }
            this.props.onAddIncomes(data)
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
                            <TouchableOpacity style={styles.button} onPress={this.props.navigation.toggleDrawer()}>
                                <Image source={menu} style={styles.iconMenu} />
                            </TouchableOpacity>
                            <Text style={styles.textCaption}>Incomes</Text>
                        </View>
                        <InfoAndAddCategories
                            categories={this.props.categories}
                            textSelectInput='Categories Incomes...'
                            textButton="Add incomes"
                            previousText='Previous incomes:'
                            deleteText={this.state.deleteText}
                            data={this.props.categoriesIncomes}
                            categorysType={this.props.categories}
                            onPressButtonAdd={(categoryIncomes, value) => this.addIncome(categoryIncomes, value)}
                        />
                    </View>)
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    categories: filteredCategoriesForIncomes(state.categories),
    isSpinerShow: state.incomes.isSpinerShowIncomesScreen,
    categoriesIncomes: state.incomes.incomes.incomes,
})

const mapDispatchToProps = dispatch => ({
    onCategoriesRequest() { return dispatch(fetchCategoriesAll()) },
    onIncomesRequest() { return dispatch(fetchIncomes()) },
    onAddIncomes(data) { return dispatch(addIncomes(data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(IncomesScreen)

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingTop: 25,
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

