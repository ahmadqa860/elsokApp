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
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import {registerProfile} from '../../services/userService';
import {apiUrl} from '../../config.json';

const SignInScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [citiesData, setCitiesData] = React.useState([]);
  const [data, setData] = React.useState({
    name: '',
    mobile: '',
    address: '',
    city_id: '',
    userType: '3',
    check_textInputChange: false,
    isValidUser: true,
    isValidPhone: true,
    isValidAddress: true,
    isValidcity: true,
  });

  useEffect(() => {
    async function fetchCitiesData() {
      const response = await fetch(`${apiUrl}/cities`);
      const json = await response.json();
      setCitiesData(json);
    }
    fetchCitiesData();
  }, []);

  const nameInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        name: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  const addressInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        address: val,
        check_textInputChange: true,
        isValidAddress: true,
      });
    } else {
      setData({
        ...data,
        address: val,
        check_textInputChange: false,
        isValidAddress: false,
      });
    }
  };

  const handlePhoneChange = val => {
    if (val.trim().length == 10) {
      setData({
        ...data,
        mobile: val,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        isValidPhone: false,
      });
    }
  };

  const handleCityChange = city => {
    if (city !== null) {
      setData({
        ...data,
        city_id: city._id,
        isValidcity: true,
      });
    } else {
      setData({
        ...data,
        isValidcity: false,
      });
    }
  };

  const handleProfileSubmit = async () => {
    if (
      data.name.length == 0 ||
      data.address.length == 0 ||
      data.mobile.length == 0 ||
      data.city_id.length == 0
    ) {
      Alert.alert(
        'إدخال خاطئ!',
        'لا يمكن ترك حقل فارغ!',
        [{text: 'أكمل'}],
      );
      return;
    }

    if (
      data.isValidUser &&
      data.isValidAddress &&
      data.isValidPhone&&
      data.isValidcity
    ) {
      const response = await registerProfile(data);
      if(response){
        DevSettings.reload();
      }else{
        Alert.alert(
          'إدخال خاطئ!',
          'حدث خطأ في ارسال المعلومات!',
          [{text: 'أكمل'}],
        );
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>أدخال المعلومات الشخصية</Text>
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
            الأسم الكامل
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => nameInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn"></Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.errorMsg}>خطأ في ادخال الأسم</Text>
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
            رقم الهاتف
          </Text>
          <View style={styles.action}>
            <TextInput
              keyboardType="numeric"
              placeholder="Your Phone Number"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => handlePhoneChange(val)}
            />
          </View>
          {data.isValidPhone ? null : (
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.errorMsg}>
                يجب ان يتكون رقم الهاتف من 10 ارقام
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
            البلدة
          </Text>
          <View style={styles.dropdown}>
            <SelectDropdown
              dropdownStyle={styles.dropdownBorder}
              buttonTextStyle={styles.dropdownButtonText}
              buttonStyle={styles.dropdownButton}
              data={citiesData}
              defaultButtonText="أضغط للأختيار"
              defaultValue={null}
              onSelect={selectedCity => {
                handleCityChange(selectedCity);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.arb_name;
              }}
              rowTextForSelection={item => {
                return item.arb_name;
              }}
            />
          </View>

          {data.isValidcity ? null : (
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.errorMsg}>خطأ في اختيار البلدة</Text>
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
            العنوان
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Address"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={val => addressInputChange(val)}
            />
          </View>

          {data.isValidAddress ? null : (
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.errorMsg}>خطأ في ادخال العنوان</Text>
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
              onPress={handleProfileSubmit}>
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
              onPress={() => navigation.goBack}
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
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
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
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
    marginTop: 10,
    paddingBottom: 5,
  },
  dropdownButtonText: {
    color: '#FF6347',
    borderRadius: 20,
  },
  dropdownText: {
    color: '#FF6347',
  },
  dropdownBorder: {
    borderRadius: 15,
  },
  dropdownButton: {
    backgroundColor: '#dad3be',
    width: 350,
    borderRadius: 20,
    borderColor: '#FF6347',
    borderWidth: 1,
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
