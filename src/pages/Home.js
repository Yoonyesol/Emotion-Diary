import { useContext, useEffect, useState } from "react";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([])

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장`;
  },[])

  useEffect(() => {
    if (diaryList.length >= 1) {
      //현재 년, 월의 첫번째 날
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      //현재 년, 월의 마지막 날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0, 
        23, //31일 일기가 포함되지 않는 버그를 위해 시분초까지 명시
        59,
        59
      ).getTime();
      
      //firstDay ~ lastDay 사이의 일기들을 추려서 n월의 일기 데이터를 가져오기
      setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diaryList, curDate]); //일기 수정/삭제 시, curDate값 변경 시 useEffect가 동작해야 함
  
  useEffect(() => {
  }, [data])
  
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  }
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  }
  return <div>
    <MyHeader headText={headText}
      leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
      rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
    />
    <DiaryList diaryList={data}/>
  </div>
};
export default Home;