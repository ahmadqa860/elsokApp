import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image ,Dimensions, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SecondaryButton} from '../components/Button';
import {apiUrl,storageUrl} from '../../config.json';
import { color } from 'react-native-reanimated';

const DetailsScreen = ({navigation, route}) => {
  
  const [active, setactive] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const item = route.params;
  console.log(item.images);

  const {width} = Dimensions.get("window");
  const height = width*100/60;

  useEffect(() => {
    async function fetchUserInfo(){
      if(item){
        const response = await fetch(`${apiUrl}/shop/productContact/${item.id}`);
        const json = await response.json();
        setUserInfo(json);
      }
    }

    fetchUserInfo();
  }, []);

  change = ({nativeEvent})=>{
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if(slide !== active){
      setactive(slide);
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginRight:'auto'}}>محتوى المنتج</Text>
       <TouchableOpacity onPress={navigation.goBack} >
          <Image  style={style.backIcon} source={require('../../assets/core-icons/back.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 320,
            width,
            
          }}>
          <ScrollView 
          pagingEnabled 
          horizontal
          onScroll={change}
          showsHorizontalScrollIndicator={false}
          style={{width, height}}
          >
            {item.images.map((image, index) => {
              return (
                <Image
                  key={index}
                  source={{uri: `${storageUrl}/${image.img_src}`}}
                  style={{height: 300, width:432, borderRadius: 20,margin:'auto'}}
                />
              );
            })}
          </ScrollView>
          <View style={style.pagination}>
            {
              item.images.map((i, k) => {
                  return(<Text key={k} style={k==active ? style.pagingActiveText : style.pagingText}>&#x2022;</Text>)
                }
              )
            }
          </View>
        </View>
        <View style={style.details}>
          <View
            style={style.ViewContentText}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
              {item && item.product_title}
            </Text>
            <View style={style.iconContainer}>
              <Text name="favorite-border" color={COLORS.primary} size={25}>
                Icon
              </Text>
            </View>
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              السعر: {item && item.product_price}
            </Text>
            
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              الأسم: {userInfo && userInfo.name}
            </Text>
            
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              رقم الهاتف: {userInfo && '0' + userInfo.mobile}
            </Text>
            
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              البلد: {userInfo && userInfo.city}
            </Text>
            
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              العنوان: {userInfo && userInfo.address}
            </Text>
            
          </View>
          <View 
          style={style.ViewContentText}>
            <Text
              style={style.contentText}>
              شرح وتفصيل:
            </Text>
            
          </View>
          <Text style={style.detailsText}>
            {item.product_description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    marginTop:40,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    direction: 'rtl',
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  backIcon: {
    backgroundColor: COLORS.white,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    paddingBottom:30,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
    direction: 'rtl',
  },
  Text:{
    direction:'rtl'
  },
  View:{
    direction:'rtl'
  },
  ViewContentText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  contentText:{
    fontSize: 25, 
    fontWeight: 'bold', 
    color: COLORS.white
  },
  pagination:{flexDirection:'row', position:'absolute', bottom:0, alignSelf:'center'},
  pagingText: {color:'#888',margin:2,fontSize:65},
  pagingActiveText: {color:'#FFF',margin:2,fontSize:65},
});

export default DetailsScreen;
