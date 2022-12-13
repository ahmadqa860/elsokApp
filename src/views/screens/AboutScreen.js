import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../../consts/colors';


const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={require('../../assets/bg-img/aboutPageHeader.png')} />
        </View>
        <View>
          <Text>ماذا يوجد على السوق المفتوح؟</Text>
        </View>
        <View>
          <Text>
            تيح لك عزيزي المستخدم على هذه المنصة العديد من خدمات الإعلان
            والتسويق الإلكتروني لمحتوى متخصص بالخدمات ومختلف المجالات التي
            تتعلّق بالبحث عن وظائف وبيع وشراء السلع والمنتجات كافة بالتواصل
            المباشر مع الفئات المستهدفة عن طريق رسائل الدردشة والاتصال الهاتفي
            والتعليقات.
          </Text>
          <Text>
            أنت اليوم كـ فرد أو شركة تستطيع أن تحقّق مبيعاتك بأسرع وقت عن طريق
            استخدام موقع أو تطبيق السوق المفتوح إنشاء حساب موثق خاص بك (كعلامة
            تجارية) الإستعانة بفريق مبيعات السوق المفتوح شراء الحزم والخدمات
            الإعلانية المُوصى بها عرض منتجك/خدمتك بشكل ملفت وتفاصيل صحيحة
          </Text>
        </View>
        <View>
          <Image source={require('../../assets/bg-img/os.jpg')} />
        </View>
        <View>
          <Text>رؤيتنا</Text>
        </View>
        <View>
          <Text>
            تتجلّى رؤيتنا في السوق المفتوح بتمكين الأفراد والشركات من تحقيق
            الربح من خلال خلق فرص اقتصادية جيدة بمردودها، وتحقيق الرغبات وتلبية
            الاحتياجات وتطوير المجتمعات.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareIcon: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginTop: 40,
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
    borderRadius: 5,
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
    marginTop: 5,
    paddingBottom: 70,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
    direction: 'rtl',
  },
  Text: {
    direction: 'rtl',
  },
  View: {
    direction: 'rtl',
  },
  ViewContentText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  contentText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pagingText: {color: '#888', margin: 2, fontSize: 65},
  pagingActiveText: {color: '#FFF', margin: 2, fontSize: 65},
});

export default AboutScreen;
