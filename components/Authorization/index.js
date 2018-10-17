import React, { Component } from 'react';
import {  Button,  Text, View } from 'react-native';

export class AuhorizationScreen extends Component {
    render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Dismiss"
            />
          </View>
        );
      }
}