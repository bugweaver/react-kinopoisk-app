import './css/App.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </main>
    </div>

  )
}


export default App
