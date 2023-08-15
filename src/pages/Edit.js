import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  //useNavigate: 페이지를 이동시킬 수 있는 함수 반환
  const navigate = useNavigate(); 

  //Query String 받아서 사용하기
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log("id: ", id);

  const mode = searchParams.get("mode")
  console.log("mode: ", mode)

  return <div>
    <h1>Edit</h1>
    <p>이곳은 일기 수정 페이지입니다.</p>
    <button onClick={() => setSearchParams({who: "coco"})}>QS 바꾸기</button>
    <button onClick={() => { navigate("/home"); }}>HOME으로 가기</button>
    <button onClick={()=>{navigate(-1)}}>뒤로 가기</button>
  </div>;
};
export default Edit;