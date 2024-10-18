import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Posts from './Pages/Posts';
import Todos from './Pages/Todos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  )
}

export default App
