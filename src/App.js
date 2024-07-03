import './App.css';
import NotFound from './components/NotFound';
import Task from './components/Task';
import { useEffect, useState } from 'react';
import { BrowserRouter , Routes , Route , Link } from 'react-router-dom'; // import to make router
import Footer from './components/Footer'


// BrowserRouter container tag to router in browser
// Routes container tag to router 

// Route => <Route path='' element={<SearchPranms />} /> 
// path='' = path='/' default 
// path='*' = path='**' error path 
// path='/Details/' || path='/Details?:id' spacific element 

// Link is alternative to <a></a> without refresh 
// Link contain only text 

function App() { 
  return (
    <div>
       {/* <NotFound /> */}
       <Task />
       <Footer/>
    </div>
  );
}

export default App; 
