import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SecondScreen from '../screens/SecondScreen';
import Profile from '../components/profile';
import Select_cate from '../components/select_cate';
import Select_ingre from '../components/select_ingre';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Select_cate" component={Select_cate} />
        <Stack.Screen name="Select_ingre" component={Select_ingre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;