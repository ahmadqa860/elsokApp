import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  DevSettings
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import {getUserInfo,logout} from '../../services/userService';

const MyAccount = ({navigation}) => {
  const [userData, setUserData] = useState([null]);
  const {colors} = useTheme();

  useEffect(() => {
    async function fetchUserData() {
      setUserData(await getUserInfo());
    }

    fetchUserData();
  }, []);

  const userLogout = async ()=>{
    const res = await logout();
    console.log(res);
    DevSettings.reload();
  }

  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <View style={styles.header}>
        {userData && (
          <Text style={styles.text_header}>{userData.name} مرحبا بك</Text>
        )}
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            رقم الهاتف
          </Text>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            {userData && userData.mobile}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 25,
              },
            ]}>
            العنوان
          </Text>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 15,
              },
            ]}>
      {userData && userData.address}
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={()=> navigation.navigate('MyProducts')}
            style={[
              styles.signIn,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#FF6347',
                },
              ]}>
              منتجاتي
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=> navigation.navigate('AddProductScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#FF6347',
                },
              ]}>
              أضف منتج
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={userLogout}
            style={[
              styles.signIn,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#FF6347',
                },
              ]}>
              تسجيل الخروج
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    direction: 'rtl',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#636060',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
