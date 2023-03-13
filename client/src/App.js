import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './Action/Question';
import { fetchAllUsers } from './Action/users';
import Navbar from './components/Navbar/navbar';
import AllRoutes from './components/AllRoutes';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
        
      </Router>
    </div>
  );
}

export default App;
