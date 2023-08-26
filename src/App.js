import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it);
        break;
    };
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1, 
    emotion: 1, 
    content: "오늘의 일기 1번",
    date: 1692448583692
  },
  {
    id: 2, 
    emotion: 4, 
    content: "오늘의 일기 2번",
    date: 1692448583693
  },
  {
    id: 3, 
    emotion: 2, 
    content: "오늘의 일기 3번",
    date: 1692448583694
  },
  {
    id: 4, 
    emotion: 2, 
    content: "오늘의 일기 4번",
    date: 1692448583695
  },
  {
    id: 5, 
    emotion: 3, 
    content: "오늘의 일기 5번",
    date: 1692448583696
  },
  {
    id: 6, 
    emotion: 3, 
    content: "오늘의 일기 6번",
    date: 1695448583696
  },
]

function App() {
  //data: 일기데이터를 관리하는 상태변수
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(6);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content, emotion,
      }
    });
    dataId.current += 1;
  }

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT", data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
    }})
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter> {/*감싼 부분은 브라우저의 url과 매핑 가능*/}
          <div className="App">
            <Routes> {/*페이지를 경로에 따라 매핑*/}
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New/>}/>
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    
  );
}

export default App;
