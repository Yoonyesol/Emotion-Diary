import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {
  return (
    <BrowserRouter> {/*감싼 부분은 브라우저의 url과 매핑 가능*/}
      <div className="App">
        <h2>App.js</h2>
        <Routes> {/*페이지를 경로에 따라 매핑*/}
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New/>}/>
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
