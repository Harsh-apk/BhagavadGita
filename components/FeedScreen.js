import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Button, ScrollView } from 'react-native'
import TitleBar from './TitleBar'

import {currentChapterKey,currentShlokKey} from '../utils/asyncStorage/storageKeys'
import { getData,setData,deleteData } from '../utils/asyncStorage/dataStore'
import { GitaContext } from '../utils/context/context'
import { checkConnection } from '../utils/checkNetConnection'
import { IconButton } from 'react-native-paper'
import InternetConnection from './inScreenComponents/feedScreen/internetConnection'
import { getShlokFromApi } from '../utils/fetchData/fetchData'
import MainScreen from './inScreenComponents/feedScreen/mainScreen'
const FeedScreen = () => {
  const [done,setDone] = useState(false);
  const [error,setError] = useState(null);
  const [pending,setPending] = useState(false);
  const [online,setOnline] = useState(false);


  const {
    currentChapNum,
    setCurrentChapNum,
    currentShlokNum,
    setCurrentShlokNum,
    changeChapter,
    setChangeChapter,
    changeShlok,
    setChangeShlok,
    currentShlok,
    setCurrentShlok,
    allChapters,
    setAllChapters
    
  } = useContext(GitaContext);

  useEffect(()=>{
    if(online===false){
      console.log("thissss")
      checkConnection(setOnline);
    }
    else{


      if(!done){
        getData(currentShlokKey,setCurrentShlokNum);
        getData(currentChapterKey,setCurrentChapNum);
        //async storage se data uthao, api se mangao, context me bharo, render karao
        //agar async me kuch nahi nikla to dono ko 1 1 kar do fir data lao.
        setChangeShlok(0);
        setDone(true);
       }
       
       if((currentShlok===null)){
        //changeShlok async function banao aur shlok leke ao, shlok number jyada hua to chapter increase kar do
        //checkShlokNumberIfMaximum
        if(changeShlok!==0){
          console.log(changeShlok)
          var shlokNum = parseInt(currentShlokNum)+changeShlok;
          if(shlokNum<1){
            
            var chapN = parseInt(currentChapNum)-1;
            if(chapN<1){
              chapN=1;shlokNum=1;
            }else{
              shlokNum=(allChapters.find((item)=>(item.chapter_number===chapN))).verses_count;
            }
            chapN = chapN.toString();
            setCurrentChapNum(chapN);
          };
          if(currentChapNum===18 && shlokNum>78){
            shlokNum=1;
            setCurrentChapNum("1");
          }
          shlokNum = shlokNum.toString();
          setData(currentShlokKey,shlokNum);
          setData(currentChapterKey,currentChapNum.toString())
          setCurrentShlokNum(shlokNum);
          setChangeShlok(false);
          setCurrentShlok(null);
        }
        getShlokFromApi(currentChapNum,currentShlokNum,setCurrentChapNum,setCurrentShlokNum,setCurrentShlok,setError,setPending,allChapters,setAllChapters,online,setOnline);
       }


       //change Chapter in chapters screen
      //  if(changeChapter){
      //   //setCurrentShlok = 1
      //   //setCurrentChap = changed one
      //   //setChangeShlok(true)
      //  }
      
       
       

    }

   
  });
  if(!online){
    return (
      <InternetConnection setOnline={()=>{setOnline(false)}} />
    )
  }
  return (
      <MainScreen/>
    
    // <SafeAreaView>
    //   <TitleBar/>
    //   <View>
    //     {error && <Text>{error}</Text>}
    //     {pending && <Text>Pending..</Text>}
    //     {currentShlok && <Text>{currentShlok.slok}</Text>}
    //   </View>
    // </SafeAreaView>
    
    
  )
}

export default FeedScreen
