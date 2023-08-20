import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
]

const ControlMenu = ({ value, onChange, optionList }) => {
  //value:select가 선택하고 있는 값, onChange: select가 선택하는 값 변화 시 실행될 함수, optionList: select할 옵션의 리스트
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>{it.name}</option>
      ))}
    </select>
  );
}

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('latest');

  //정렬된 일기 데이터 반환하는 함수
  const getProcessedDiaryList = () => { 
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); //내림차순 정렬
      } else {
        return parseInt(a.date) - parseInt(b.date); //오름차순 정렬
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList)); //일기리스트 복사(JSON형식으로 바꾼 뒤 다시 배열 형식으로 바꾸기)
    const sortedList = copyList.sort(compare);  //일기 정렬
    return sortedList;
  }
  
  return <div>
    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
    {getProcessedDiaryList().map((it) => (
      <div key={it.id}>{it.content}</div>
    ))}
  </div>
};

DiaryList.defaultProps = {
  diaryList: [],
}

export default DiaryList;