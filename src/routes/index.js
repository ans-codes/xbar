import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardStack from './DashboardStack';
import LoginStack from './LoginStack';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import colors from '../theme/color';

const Stack = createStackNavigator();
const Routes = (props) => {
  const {loggedIn} = props.user;
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {loggedIn ? (
            <Stack.Screen name="DashboardStack" component={DashboardStack} />
          ) : (
            <Stack.Screen name="LoginStack" component={LoginStack} />
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(Routes);
