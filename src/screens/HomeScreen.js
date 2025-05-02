import { View, Text, ScrollView, Image, TextInput, StatusBar, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import Recipes from '../components/recipes';
import Todaysfood from '../components/Todaysfood';

// 메인화면

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const navigation = useNavigation();

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="#eab308" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-10"
      >
        <Animated.View entering={FadeInDown.delay(100).duration(600).springify().damping(12)}>
          {/* 로고 */}
          <View style={{height: 50}} className="flex-row justify-between items-center mb-2 top-2 bottom-2 bg-ye">
            <Image source={require('../../assets/images/recipppe.png')} style={{marginLeft: 16, height: hp(3.2), width: hp(8.3)}} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../../assets/images/avatar.png')} style={{marginRight: 16, height: hp(4.2), width: hp(4.3)}} />
            </TouchableOpacity>
          </View>

          {/* 레시피 검색 버튼 */}
          <View className="mt-8 flex-row mx-4 space-x-4 justify-center items-center">
            <Pressable
                className="flex justify-center mb-4 space-y-1"
                onPress={()=> navigation.navigate('Select_cate')}
            >
              <View style={{height: 180,  width: 180}} className="bg-gr rounded-3xl flex-col justify-center items-center">
                <Text style={{fontSize: hp(2.8)}} className="font-semibold text-ye pb-3">레시피 검색</Text>
                <AntDesign name="search1" size={hp(5.5)} color="#ffab00" />
              </View >
            </Pressable>
            <Pressable
                className="flex justify-center mb-4 space-y-1"
                onPress={()=> navigation.navigate('Seemore')}
            >
              <View style={{height: 180,  width: 180}} className="bg-gr rounded-3xl flex-col justify-center items-center">
                <Text style={{fontSize: hp(2.8)}} className="font-semibold text-ye pb-3">나의 레시피</Text>
                <AntDesign name="like2" size={hp(5.5)} color="#ffab00" />
              </View >
            </Pressable>
          </View>

          {/* search bar */}
          {/* <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder='Search any recipe'
              placeholderTextColor={'gray'}
              style={{fontSize: hp(1.7)}}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </View> */}

        </Animated.View>

        {/* 오늘의 추천 레시피 */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>

        {/* 오늘의 식재료 상식 */}
        <View className="-mt-10">
          <Todaysfood/>
        </View>

      </ScrollView>
    </View>
  )
}