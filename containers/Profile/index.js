import React, { PureComponent } from 'react';
import { TextInput, SafeAreaView, TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native';
import { login } from '../../redux/actions/auth'
import { connect } from 'react-redux'

class ProfileScreen extends PureComponent {
    static navigationOptions = {
        drawerLabel: 'Profile'
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecf0f1"
                />
                <Text style={{ alignSelf: "center", marginBottom: 20,}}>Авторизация</Text>
                <TextInput
                    placeholder={'Логин'}
                    style={styles.inputPrice}
                    onChange={(event) => this.setState({ login: event.nativeEvent.text })} />
                <TextInput
                    placeholder={'Пароль'}
                    style={styles.inputPrice}
                    onChange={(event) => this.setState({ password: event.nativeEvent.text })} />
                <TouchableOpacity style={styles.button} onPress={this.props.onLoginRequest()}>
                    <Text>Войти</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users
})

const mapDispatchToProps = dispatch => ({
    onLoginRequest() { return dispatch(login()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 72
    },
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
    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'blue',
        width: '80%',
        height: '8%',
    }
})