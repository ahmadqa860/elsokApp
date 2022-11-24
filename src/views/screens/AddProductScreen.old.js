import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  DevSettings,
  Image,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import {registerProfile} from '../../services/userService';
import {apiUrl} from '../../config.json';
import ImagePicker from 'react-native-image-crop-picker';
import COLORS from '../../consts/colors';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 40;

const AddProductScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [categoriesData, setCategoriesData] = useState([]);
  const [images, setImages] = useState([]);
  const [data, setData] = React.useState({
    categorie_id: '',
    product_title: '',
    product_description: '',
    product_price: '',
    imagesArray: [],
    check_textInputChange: false,
    isValidPrice: true,
    isValidTitle: true,
    isValidDescription: true,
    isValidCategory: true,
  });

  useEffect(() => {
    async function fetchCategriesData() {
      const response = await fetch(`${apiUrl}/categories`);
      const json = await response.json();
      setCategoriesData(json);
    }
    fetchCategriesData();
  }, []);

  const CardImage = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={{alignItems: 'center', top: 23}}>
          <Image
            source={require('../../views/test.jpg')}
            style={{height: 150, width: 150}}
          />
        </View>
        <TouchableOpacity
          underlayColor={COLORS.white}
          activeOpacity={0.9}
          onPress={deleteImage}>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
              حذف
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const deleteImage = () => {
    console.log('delete image');
  };

  const titleInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        product_title: val,
        check_textInputChange: true,
        isValidTitle: true,
      });
    } else {
      setData({
        ...data,
        product_title: val,
        check_textInputChange: false,
        isValidTitle: false,
      });
    }
  };
  const descriptionInputChange = val => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        product_description: val,
        check_textInputChange: true,
        isValidDescription: true,
      });
    } else {
      setData({
        ...data,
        product_description: val,
        check_textInputChange: false,
        isValidDescription: false,
      });
    }
  };

  const handlePriceChange = val => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        mobile: val,
        isValidPrice: true,
      });
    } else {
      setData({
        ...data,
        mobile: val,
        isValidPrice: false,
      });
    }
  };

  const handleCategoryChange = category => {
    if (category !== null) {
      setData({
        ...data,
        categorie_id: category.id,
        isValidCategory: true,
      });
    } else {
      setData({
        ...data,
        isValidCategory: false,
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
      Alert.alert('إدخال خاطئ!', 'لا يمكن ترك حقل فارغ!', [{text: 'أكمل'}]);
      return;
    }

    if (
      data.isValidUser &&
      data.isValidAddress &&
      data.isValidPhone &&
      data.isValidCategory
    ) {
      const response = await registerProfile(data);
      if (response) {
        DevSettings.reload();
      } else {
        Alert.alert('إدخال خاطئ!', 'حدث خطأ في ارسال المعلومات!', [
          {text: 'أكمل'},
        ]);
      }
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      ImagePicker.openPicker({
        multiple: true,
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.6,
      })
        .then(images => {
          console.log(images);
          //this.bs.current.snapTo(1);
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>أضف منتج جديد</Text>
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
                  marginTop: 35,
                },
              ]}>
              أختار التصنيف المناسب
            </Text>
            <View style={styles.dropdown}>
              <SelectDropdown
                dropdownStyle={styles.dropdownBorder}
                buttonTextStyle={styles.dropdownButtonText}
                buttonStyle={styles.dropdownButton}
                data={categoriesData}
                defaultButtonText="أضغط للأختيار"
                defaultValue={null}
                onSelect={selectedCategory => {
                  handleCategoryChange(selectedCategory);
                }}
                buttonTextAfterSelection={selectedCategory => {
                  return selectedCategory.categorie_title;
                }}
                rowTextForSelection={item => {
                  return item.categorie_title;
                }}
              />
            </View>

            {data.isValidCategory ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>خطأ في اختيار التصنيف</Text>
              </Animatable.View>
            )}
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 20,
                },
              ]}>
              عنوان المنتج
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Product Title"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => titleInputChange(val)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn"></Animatable.View>
              ) : null}
            </View>
            {data.isValidTitle ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>خطأ في ادخال عنوان المنتج</Text>
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
              أدخل الصور
            </Text>

            <TouchableOpacity
              style={styles.panelButton}
              onPress={choosePhotoFromLibrary}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>

            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={[
                  {src: '../../views/test.jpg'},
                  {src: '../../views/test.jpg'},
                  {src: '../../views/test.jpg'},
                  {src: '../../views/test.jpg'},
                ]}
                renderItem={({item}) => <CardImage product={item} />}
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                },
              ]}>
              سعر المنتج
            </Text>
            <View style={styles.action}>
              <TextInput
                keyboardType="numeric"
                placeholder="Product Price"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => handlePriceChange(val)}
              />
            </View>
            {data.isValidPrice ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>خطأ في ادخال سعر المنتج</Text>
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
              شرح وتفصيل عن المنتج
            </Text>
            <View>
              <TextInput
                multiline={true}
                numberOfLines={8}
                placeholder="Product description"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    marginTop: 13,
                    borderRadius: 5,
                    color: colors.text,
                    borderColor: '#636060',
                    borderWidth: 1,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={val => descriptionInputChange(val)}
              />
            </View>

            {data.isValidDescription ? null : (
              <Animatable.View animation="fadeInLeft">
                <Text style={styles.errorMsg}>
                  خطأ في ادخال الشرح عن المنتج
                </Text>
              </Animatable.View>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={[
                  styles.panelButton,
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
                  styles.panelButton,
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
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6347',
  },
  card: {
    height: 190,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
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
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  deleteButtonTag: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    marginVertical: 7,
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
    borderRadius: 10,
    borderColor: '#FF6347',
    borderWidth: 1,
    marginVertical: 7,
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
