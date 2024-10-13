import './App.css';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import React, { Suspense } from 'react';

const Task = React.lazy(()=>{
  return import('./components/Task');
}) 
function App() { 
  return (
  <div>
    <Suspense fallback={<Loading/>}>
     <Task/>
    </Suspense>
    </div>

   
  
  );
}

export default App; 
