import React, {useState, useEffect} from 'react';
import {
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
import categories from '../../consts/categories';

import {apiUrl, storageUrl} from '../../config.json';
import {getUserInfo} from '../../services/userService';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({navigation}) => {
  const [selectedCategoryUrl, setSelectedCategoryUrl] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [userData, setUserData] = useState([null]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategriesData() {
      const response = await fetch(`${apiUrl}/categories`);
      const json = await response.json();
      setCategoriesData(json);
    }

    async function fetchUserData() {
      setUserData(await getUserInfo());
    }
    fetchCategriesData();
    categorySelected('electronics');
    fetchUserData();
  }, []);

  async function categorySelected(url) {
    const response = await fetch(`${apiUrl}/shop/${url}`);
    const json = await response.json();
    setSelectedCategoryUrl(json);
  }

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categoriesData.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => categorySelected(category.categorie_url)}>
            <View
              style={{
                backgroundColor:
                  setSelectedCategoryUrl == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={categories[index].image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginRight: 20,
                  textAlign: 'right',
                  color:
                    setSelectedCategoryUrl == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.categorie_title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const Card = ({product}) => {
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
            <View style={style.addToCartBtn}>
              <Text name="add" size={20} color={COLORS.white}>
                Icon
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>مرحبا,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              {!userData && <Text>زائر</Text>}
              {userData && <Text>{userData.name}</Text>}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            What do you want today
          </Text>
        </View>
        <Image
          source={require('../../assets/person.png')}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View>
        <ListCategories />
      </View>
      {selectedCategoryUrl && (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={selectedCategoryUrl}
          renderItem={({item}) => <Card product={item} />}
        />
      )}
      {!selectedCategoryUrl && <Text>empty</Text>}
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
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
