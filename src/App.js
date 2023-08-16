import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  return (
    <BrowserRouter> {/*감싼 부분은 브라우저의 url과 매핑 가능*/}
      <div className="App">
        <MyHeader headText={"App"}
          leftChild={<MyButton text={'왼쪽 버튼'} onClick={() => alert("왼쪽 클릭")} />}
          rightChild={<MyButton text={'오른쪽 버튼'} onClick={() => alert("오른쪽 클릭")} />}
        />
        <h2>App.js</h2>
        <MyButton text={'버튼'} onClick={() => alert("버튼 클릭")} type={"positive"} />
        <MyButton text={'버튼'} onClick={()=>alert("버튼 클릭")} type={"negative"} />
        <MyButton text={'버튼'} onClick={()=>alert("버튼 클릭")}/>
        <Routes> {/*페이지를 경로에 따라 매핑*/}
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New/>}/>
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
