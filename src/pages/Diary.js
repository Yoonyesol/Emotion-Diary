import { useParams } from "react-router";

const Diary = () => {
  //Path Variable
  const { id } = useParams(); //useParams:전달받은 path variable들을 객체로 모아 전달해 준다.
  console.log("id: ", id);
  
  return <div>
    <h1>Diary</h1>
    <p>이곳은 일기 상세 페이지입니다.</p>
  </div>
};
export default Diary;