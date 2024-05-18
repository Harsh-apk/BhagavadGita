import { shlokBase,allChaptersUri } from "../../resources/apiUrls";
import { setData } from "../asyncStorage/dataStore";
import { currentChapterKey,currentShlokKey } from "../asyncStorage/storageKeys";
import { checkConnection } from "../checkNetConnection";
export const getShlokFromApi = async(currentChapNum,currentShlokNum,setCurrentChapNum,setCurrentShlokNum,setCurrentShlok,setError,setPending,allChapters,setAllChapters,online,setOnline)=>{
    //console.log("yes");
    checkConnection(setOnline);
    if(online){
        setError(null);
    setPending(true);
    if(allChapters.length===0){
        try{
            const res = await fetch(allChaptersUri);
            if(!res.ok){
                throw new Error("Something went wrong");
            }
            const chapters = await res.json();
            setAllChapters(chapters);
        }catch(e){
            setError(e.message);
            return;
    }
}
    var ShlokNum = parseInt(currentShlokNum);
    var obj = allChapters.find((element)=>(element.chapter_number)===parseInt(currentChapNum));
    var verseCount = obj!==undefined?obj["verses_count"]:20;
    if(ShlokNum>verseCount){
        setCurrentShlokNum("1");
        verseCount = (parseInt(currentChapNum)+1);
        verseCount = verseCount.toString();
        setCurrentChapNum(verseCount);
        
    }
    setData(currentShlokKey,(currentShlokNum).toString());
    setData(currentChapterKey,(currentChapNum).toString());
    const uri = shlokBase+ currentChapNum +"/"+currentShlokNum+"/";
    try{
        const res = await fetch(uri);
        if(!res.ok){
            throw new Error("Something went wrong");
        }
        const data = await res.json();
        setCurrentShlok(data);
    }catch(e){
        setError(e.message);
    }finally{
        setPending(false);
    }
    }
    
}