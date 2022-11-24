import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar, I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import DeleteScreen from './src/views/screens/DeleteScreen';
import EditScreen from './src/views/screens/EditScreen';
import MyProducts from './src/views/screens/MyProducts';
import AddProductScreen from './src/views/screens/AddProductScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import SignupScreen from './src/views/screens/SignupScreen';
import ProfileScreen from './src/views/screens/ProfileScreen';
import MyAccount from './src/views/screens/MyAccount';

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    isReady: false,
    user: true,
    valid: '',
  };

  componentDidMount() {
    I18nManager.forceRTL(true);
  }
  
  render() {

    return (
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="BoardScreen" component={OnBoardScreen}  />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="MyProducts" component={MyProducts} />
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
