import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../screens/Auth/Splash';
import Tour from '../screens/Auth/Tour';
import WalkThrough from '../screens/Auth/WalkThrough';
import UserType from '../screens/Auth/UserType';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import SignupEmployee from '../screens/Auth/SignupEmployee';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import EmailSent from '../screens/Auth/EmailSent';
import ChangePassword from '../screens/Auth/ChangePassword';
import DashboardStack from '../routes/DashboardStack';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Tour" component={Tour} />
      <Stack.Screen name="LoginNavigator" component={WalkThrough} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="UserType" component={UserType} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupEmployee" component={SignupEmployee} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="EmailSent" component={EmailSent} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="DashboardStack" component={DashboardStack} />
    </Stack.Navigator>
  );
};
export default LoginStack;
