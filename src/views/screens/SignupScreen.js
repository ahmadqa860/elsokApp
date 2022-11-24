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
  DevSettings,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import {registerUser} from '../../services/userService';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    password_confirmation: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidPassword_confirm: true,
  });

  const {colors} = useTheme();

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordConfirmChange = val => {
    if (val === data.password) {
      setData({
        ...data,
        password_confirmation: val,
        isValidPassword_confirm: true,
      });
    } else {
      setData({
        ...data,
        password_confirmation: val,
        isValidPassword_confirm: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const newUserHandle = async (data) => {
    const registerSuccess = await registerUser(data);
    
    if (registerSuccess) {
      navigation.navigate('ProfileScreen');
    } else {
      Alert.alert('خطأ في ادخال المعلومات!!!');
    }
    
  };

  const registerHandle = () => {
    if (data.email.length == 0 || data.password.length == 0 || data.password_confirmation == 0) {
      Alert.alert(
        'إدخال خاطئ!',
        'لا يمكن ترك حقل البريد الإلكتروني أو كلمة المرور فارغين.',
        [{text: 'أكمل'}],
      );
      return;
    }

    if (
      data.isValidUser &&
      data.isValidPassword &&
      data.isValidPassword_confirm
    ) {
      newUserHandle(data);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>تسجيل مستخدم جديد</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          البريد الألكتروني
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn"></Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.errorMsg}>
              يجب أن يتكون البريد الإلكتروني من 4 أحرف عالأقل.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          كلمة المرور
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}></TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.errorMsg}>
              يجب أن تتكون كلمة المرور من 8 أحرف عالأقل.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          أعد كلمة المرور
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Password Confirmation"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordConfirmChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}></TouchableOpacity>
        </View>
        {data.isValidPassword_confirm ? null : (
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.errorMsg}>خطأ في اعادة كلمة المرور</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={registerHandle}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#FF6347',
                },
              ]}>
              أكمل
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen')}
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
              رجوع
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
