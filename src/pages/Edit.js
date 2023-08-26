import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  //useNavigate: 페이지를 이동시킬 수 있는 함수 반환
  const navigate = useNavigate(); 
  const { id } = useParams(); //전달받은 id 꺼내주기

  const diaryList = useContext(DiaryStateContext);

  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  },[])

  useEffect(() => { //컴포넌트 mount시 일기 가져오기
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      if (targetDiary) {
        setOriginData(targetDiary)
      } else {//수정할 id의 일기가 undefined일때
        navigate('/', { replace: true });   
      }
    }
  },[id, diaryList])

  return <div>
    {originData && <DiaryEditor isEdit={true} originData={originData} />}
  </div>;
};
export default Edit;