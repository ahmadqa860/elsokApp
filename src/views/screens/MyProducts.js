import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';
import {apiUrl, storageUrl} from '../../config.json';
import {hasToken, getUserProducts} from '../../services/userService';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const MyProducts = ({navigation}) => {
  const [isloading, setIsLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([null]);

  useEffect(() => {
    async function userProductsData() {
      const data = await getUserProducts();
      setUserProducts(data);
    }
    userProductsData();
  }, []);

  const Card = ({product,navigation}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', product)}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image
              source={{uri: `${storageUrl}/${product.images[0].img_src}`}}
              style={{height: 120, width: 120}}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {product.product_title}
            </Text>
            <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
              {product.product_title}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${product.product_price}
            </Text>
            <View style={style.icon}>
              <Text name="whatsapp" size={20} color={COLORS.white}>
                Icon
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 7,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('EditScreen', product)}>
              <Image
                style={style.icon}
                name="edit"
                source={require('../../assets/core-icons/edit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DeleteScreen', product)}>
              <Image
                style={style.icon}
                name="delete"
                source={require('../../assets/core-icons/delete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 'auto'}}>
          منتوجاتي
        </Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            style={style.backIcon}
            source={require('../../assets/core-icons/back.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        {hasToken() && userProducts && (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={userProducts}
            renderItem={({item}) => <Card product={item} />}
          />
        )}
        {!userProducts && <Text>empty</Text>}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backIcon: {
    backgroundColor: COLORS.white,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginLeft: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 5,
  },
  card: {
    height: 260,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  icon: {
    height: 33,
    width: 33,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.grey,
  },
});

export default MyProducts;
