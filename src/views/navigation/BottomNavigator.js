import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import COLORS from '../../consts/colors';
import {View, Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SignIn from '../screens/SigninScreen';
import MyAccount from '../screens/MyAccount';
import bottomNavIcons from '../../consts/bottomNavIcons';

import {getUserInfo} from '../../services/userService';



const Tab = createBottomTabNavigator();

const BottomNavigator = () => {


  const [userData, setUserData] = useState([null]);
  useEffect(() => {

    async function fetchUserData() {
      setUserData(await getUserInfo());
    }
    fetchUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        activeTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
      }}>

        
      <Tab.Screen
        name="معلومات"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.tabIcon}>
              <Image
                source={bottomNavIcons[6].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
      
      { !userData && (
      <Tab.Screen
        name="تسجيل الدخول"
        component={SignIn}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.tabIcon}>
              <Image
                source={bottomNavIcons[5].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
      )}
      { userData && (
      <Tab.Screen
        name="الحساب الخاص"
        component={MyAccount}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.tabIcon}>
              <Image
                source={bottomNavIcons[4].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
      )}
      <Tab.Screen
        name="الرئيسية"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.homeIcon}>
              <Image
                source={bottomNavIcons[2].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="أحببت"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.tabIcon}>
              <Image
                source={bottomNavIcons[1].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="الخريطة"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View style={style.tabIcon}>
              <Image
                source={bottomNavIcons[3].image}
                style={style.tabIconImage}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  homeIcon: {
    height: 63,
    width: 63,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 30,
    top: -25,
    elevation: 5,
  },
  tabIcon: {
    height: 53,
    width: 53,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
    borderWidth: 3,
    borderRadius: 30,
    top: -15,
    elevation: 5,
  },
  tabIconImage: {
    height: 38,
    width: 38,
    resizeMode: 'center',
  },
});

export default BottomNavigator;
