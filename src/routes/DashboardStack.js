import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Color from '../theme/color';
import Home from '../screens/Tabs/Home/Home';
import Attendance from '../screens/Tabs/Home/Attendance';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Employees from '../screens/Tabs/Employees/Employees';

import Chat from '../screens/Tabs/Chat/Chat';
import AddChat from '../screens/Tabs/Chat/AddChat';
import Conversation from '../screens/Tabs/Chat/Conversation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Dashboard = ({props}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Color.primary,
        style: {
          backgroundColor: '#E5E9EE',
          height: wp(12),
        },
        showLabel:false
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="home" size={wp(5)} color={color} />
          ),
        }}
      />
      {props.user.type === 'Manager' ? (
        <Tab.Screen
          name="Employees"
          component={Employees}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="ios-people" size={wp(5)} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Attendance"
          component={Attendance}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="timetable"
                size={wp(5)}
                color={color}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="message-square" size={wp(5)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="settings" size={wp(5)} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function DashboardStack(props) {
  return (
    <Stack.Navigator headerMode="none">
       <Stack.Screen name="Dashboard" 
      children={()=><Dashboard props={{...props}}/>} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="AddChat" component={AddChat} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(DashboardStack);

