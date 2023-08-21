import { useState } from "react";
import MyButton from "./MyButton"
import { useNavigate } from "react-router";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
]

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
]

const ControlMenu = ({ value, onChange, optionList }) => {
  //value:select가 선택하고 있는 값, onChange: select가 선택하는 값 변화 시 실행될 함수, optionList: select할 옵션의 리스트
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>{it.name}</option>
      ))}
    </select>
  );
}

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState("all");

  //정렬된 일기 데이터 반환하는 함수
  const getProcessedDiaryList = () => { 
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      }else{
        return parseInt(item.emotion) > 3;
      }
    }

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); //내림차순 정렬
      } else {
        return parseInt(a.date) - parseInt(b.date); //오름차순 정렬
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList)); //일기리스트 복사(JSON형식으로 바꾼 뒤 다시 배열 형식으로 바꾸기)
    
    const filteredList = filter === "all" ? copyList : copyList.filter((it)=>filterCallBack(it));
    
    const sortedList = filteredList.sort(compare);  //일기 정렬
    return sortedList;
  }

  return <div className="DiaryList">
    <div className="menu_wrapper">
      <div className="left_col">
        <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
        <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList}/>
      </div>
      <div className="right_col">
        <MyButton type={'positive'} text={"새 일기 쓰기"} onClick={()=>navigate("/new")}/>
      </div>
    </div>
    {getProcessedDiaryList().map((it) => (
      <DiaryItem key={it.id} {...it} />
    ))}
  </div>
};

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;