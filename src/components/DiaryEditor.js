import MyHeader from "./MyHeader"
import MyButton from "./MyButton"

import { useNavigate } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "./../App.js"

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript:'완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript:'좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript:'그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript:'나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript:'끔찍함',
  },
]

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); //ISO형식의 문자열 반환(ex.2023-08-22)
}

const DiaryEditor = ({isEdit, originData}) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  //감정 이모티콘 클릭시 발생하는 이벤트
  const handleClickEmote = (emotion) => {
    setEmotion(emotion)
  }

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        console.log(originData.id)
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate('/', { replace: true }); //뒤로 가기를 통해 일기작성페이지로 다시 돌아가는 것 방지
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData]); //edit페이지에서 값을 내려줄 때만 동작하는 코드
  
  return (
    <div className="DiaryEditor">
      <MyHeader headText={isEdit? "일기 수정하기":"새 일기쓰기"} leftChild={<MyButton text={"< 뒤로 가기"} onClick={()=>navigate(-1)}/>}/>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date" />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id} {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={()=>navigate(-1)}/>
            <MyButton text={"작성완료"} type={'positive'}  onClick={handleSubmit}/>
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;