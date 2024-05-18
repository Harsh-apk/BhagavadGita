import React from 'react';
import AboutScreen from './components/AboutScreen';
import { NativeWindStyleSheet } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedScreen from './components/FeedScreen';
import { GitaProvider } from './utils/context/context';
import ChapterScreen from './components/ChapterScreen';
import Toast from 'react-native-toast-message';
const Tab = createMaterialBottomTabNavigator();
NativeWindStyleSheet.setOutput({   web: "native",   default: "native", });

function App(){

  return (
    
  <SafeAreaProvider>
  <GitaProvider>
   <NavigationContainer>
    <Tab.Navigator initialRouteName='Home' >
        <Tab.Screen
         name='About'
         component={AboutScreen}
         options = {{tabBarIcon: () => (
          <MaterialCommunityIcons name="information" size={26} color={500} />
        )}} />
        <Tab.Screen name='Home'
         component={FeedScreen}
         options = {{tabBarIcon: () => (
          <MaterialCommunityIcons name="home" size={26} color={500}/>
        )}}
         />
        <Tab.Screen name='Chapters'
         component={ChapterScreen}
         options = {{tabBarIcon: () => (
          <MaterialCommunityIcons name="folder" size={26} color={500} />
        )}}
         />
         
      </Tab.Navigator>
      <Toast />
   </NavigationContainer>
   </GitaProvider>
   
   </SafeAreaProvider>
  );
}

export default App;