import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/my_ej/HomeScreen';
import WelcomeScreen from '../screens/my_ej/WelcomeScreen';
import RecipeDetailScreen from '../screens/my_ej/RecipeDetailScreen';
import TodaysRecipesScreen from '../screens/my_ej/TodaysRecipesScreen';
import ProfileScreen from '../screens/my_ej/ProfileScreen';
import Select_cateScreen from '../screens/my_ej/Select_cateScreen';
import Select_ingreScreen from '../screens/my_ej/Select_ingreScreen';
import Select_mainScreen from '../screens/my_ej/Select_mainScreen';
import LoadingScreen from '../screens/my_ej/LoadingScreen';
import RecommendScreen from '../screens/my_ej/RecommendScreen';
import Recipes from '../screens/my_ej/recipes';

//---------------------------------------------

// WelcomeScreen : 앱 시작 시 로딩 화면 (Welcome)
// HomeScreen : 앱 시작 시 메인 화면 (Home)
// LodingScreen : AI에서 레시피 받아오는 로딩 화면 (Loding)
// RecipeDetailScreen : 레시피 상세 화면 (RecipeDetail)
// ProfileScreen : 프로필 화면 (Profile)
// Select_cateScreen : 식사, 디저트 카테고리 선택 화면 (Select_cate)
// Select_ingreScreen : 재료 선택 화면 (Select_ingre)
// Select_mainScreen : 메인 재료 선택 화면 (Select_main)
// RecommendScreen : AI가 추천한 레시피 출력 화면 (Recommend)
// TodaysRecipesScreen : 오늘의 추천 레시피 출력 화면 (TodaysRecipes)


// loding : WelcomeScreen 도와주는 컴포넌트
// recipes : 이건 임시로 화면에 예쁘게 보여주려고 만들어둔거라 틀만 남기고 나중에 없애거나 대체 가능
// (오늘의 추천 레시피 부분이랑 홈 화면 출력이 달라서 만들어둠)
// Todaysfood : 오늘의 식재료 컴포넌트 (홈 화면에서만 띄울꺼라 컴포넌트로 제작)

//---------------------------------------------


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="TodaysRecipes" component={TodaysRecipesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Select_cate" component={Select_cateScreen} />
        <Stack.Screen name="Select_ingre" component={Select_ingreScreen} />
        <Stack.Screen name="Select_main" component={Select_mainScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Recommend" component={RecommendScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;