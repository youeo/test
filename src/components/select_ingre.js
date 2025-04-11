import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories2 from './categories2';

export default function Select_ingre() {

    const navigation = useNavigation();
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(()=>{
        getCategories();
        getRecipes();
      },[])

    const handleChangeCategory = category=>{
      getRecipes(category);
      setActiveCategory(category);
      setMeals([]);
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
    
    return (
        <Animated.View entering={FadeInDown.delay(100).duration(600).springify().damping(12)} className="flex-1 space-y-4 flex-col">
            <StatusBar hidden={true} />

            {/* 뒤로가기 */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full flex-row justify-between items-center pt-14">
                <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-gr">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
            </Animated.View>
            
            <View style={{flex: 0.08}} className="mx-4 space-y-2 justify-start items-center">
                <Text style={{fontSize: hp(3)}} className="font-bold text-neutral-600">재료 선택</Text>
            </View>

          {/* search bar */}
          <View style={{flex: 0.08}}>
            <View className="mx-4 flex-row item-center rounded-full bg-black/5 p-[6px]">
              <TextInput
                placeholder='재료 검색...'
                placeholderTextColor={'gray'}
                style={{fontSize: hp(1.5)}}
                className="flex-1 text-base mb-0 pl-3 tracking-wider"
              />
              <View className="bg-white rounded-full p-3 pt-1.5">
                <AntDesign name="search1" size={hp(2.5)} color="#ffab00"/>
              </View>
            </View>
          </View>

          {/* 카테고리 */}
          <View className="pt-4">
            { categories.length>0 && <Categories2 categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
            <Text style={{fontSize: hp(2)}} className="pt-6 mx-4 font-semibold text-neutral-600">{activeCategory}</Text>
          </View>
          
          <View style={{flex: 0.15}} className="flex mx-4 items-start space-y-1">
            <Text style={{fontSize: hp(1.6)}} className="text-neutral-600 rounded-full p-[6px] bg-black/10">안창살</Text>
          </View>
        </Animated.View>
    )
}