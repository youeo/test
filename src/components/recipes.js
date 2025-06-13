import { View, Text, Pressable, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// 메인에서 오늘의 추천 레시피 보여주기

export default function Recipes() {

    const navigation = useNavigation();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getRecommendedRecipes();
    }, []);

    const getRecommendedRecipes = async () => {
        try {
        const response = await axios.get('https://themealdb.com/api/json/v1/1/search.php?s=');
        if (response?.data?.meals) {
            setMeals(response.data.meals.slice(0, 5)); // 최대 5개
        }
        } catch (err) {
        console.log('Error fetching recipes: ', err.message);
        }
    };

    const numColumns = 2;
    const imageSize = (Dimensions.get('window').width - wp(12)) / 2;

  return (
    <View className="space-y-3 -mb-3">
        <View className="flex-row justify-between items-center pt-2 pb-2 bg-ye">
            <Text style={{fontSize: hp(2)}} className="mx-4 font-semibold text-gr">오늘의 추천 레시피</Text>
            <AntDesign paddingRight={16} name="doubleright" size={hp(2)} color="#43794b" onPress={()=> navigation.navigate('SecondScreen')}/>
        </View>
      <View className="pt-3 mx-4">
        {/* 레시피 이미지 목록 */}
        <FlatList
        horizontal
        data={meals}
        keyExtractor={(item) => item.idMeal}
        scrollEnabled={true}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate('RecipeDetail', { ...item })}
            >
            <Image
                source={{ uri: item.strMealThumb }}
                style={{
                width: imageSize,
                height: hp(20),
                borderRadius: 16,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: '#f3f3f3',
                }}
                resizeMode="cover"
            />
            </TouchableOpacity>
        )}
        />
            
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation})=>{
    let isEven = index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0}}
                className="flex justify-center mb-4 space-y-1"
                onPress={()=> navigation.navigate('RecipeDetail', {...item})}
            >
                {/* <Image 
                    source={{uri: item.strMealThumb}}
                    style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                    className="bg-black/5"
                /> */}
                <CachedImage
                     uri= {item.strMealThumb}
                     style={{width: '100%', height: index%3==0? hp(20): hp(20), borderRadius: 35}}
                     className="bg-black/5"
                     sharedTransitionTag={item.strMeal}
                />
                <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}