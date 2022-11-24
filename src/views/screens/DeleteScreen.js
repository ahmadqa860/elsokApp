import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image ,Dimensions, TouchableOpacity} from 'react-native';
import COLORS from '../../consts/colors';
import {deleteItem} from '../../services/userService';

const DetailsScreen = ({navigation, route}) => {
  
  const [active, setactive] = useState(1);
  const item = route.params;
  
  /*
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
*/
  const PostDeleteItem = async ()=>{
   const res = await deleteItem(item.id);
   console.log(res);
  }



  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginRight:'auto'}}>حذف المنتج</Text>
       <TouchableOpacity onPress={navigation.goBack} >
          <Image  style={style.backIcon} source={require('../../assets/core-icons/back.png')} />
        </TouchableOpacity>
      </View>
      
        <View style={style.details}>
          <View
            style={style.ViewContentText}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
              هل أنت متأكد من حذف المنتج؟
            </Text>
            <View style={style.iconContainer}>
            <Image
                style={style.icon}
                name="remove"
                source={require('../../assets/core-icons/remove-from-cart.png')}
              />
            </View>
          </View>
          <View style={style.button}>
          <TouchableOpacity
            onPress={PostDeleteItem}
            style={[
              style.opacityButton,
              {
                borderColor: '#e80505',
                borderWidth: 1,
                marginTop: 15,
                backgroundColor: '#960505',
              },
            ]}>
            <Text
              style={[
                style.textSign,
                {
                  color: COLORS.white,
                },
              ]}>
              نعم
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigation.navigate('MyProducts')}
            style={[
              style.opacityButton,
              {
                borderColor: '#FF6347',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                style.textSign,
                {
                  color: COLORS.white,
                },
              ]}>
              لا
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      
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
    borderRadius:40,
    direction: 'rtl',
  },
  icon: {
    height: 33,
    width: 33,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.grey,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  deleteButton: {
    alignItems: 'center',
    marginTop: 50,
  },
  opacityButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 25,
    fontWeight: 'bold',
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


});

export default DetailsScreen;
