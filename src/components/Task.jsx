import { useEffect, useState, useRef } from "react";
import { Button , Stack , Alert } from 'react-bootstrap';
import './task.css';
import PopUp from "./PopUp";
const Task = () => {

  
    const [apearance , sepApearance]=useState(true)
    const close =()=>{
        sepApearance(!apearance)
    }

  const [task, setTask] = useState([]);
  const [apear, setApear] = useState(false);
  const inValue = useRef();
  // localStorage.setItem('taski', JSON.stringify(task));
//   let storageGet = localStorage.getItem('task');
  const addTask = () => {
    const text = inValue.current.value;
    if(text!=''){
      setTask([...task, text]);
     inValue.current.value = '';
    //  console.log('dddd' , localStorage.getItem('taski'))
    }
    else{
      setApear(true)
    }
  };
  const deleteTasks = () => {
      setTask([]);
       inValue.current.value = '';
    };
    const deleteOneTask = (id) => {
      // let newTask = task.splice(id ,1);
      let newTask = [...task];
      newTask.splice(id ,1)
      setTask(newTask);
       inValue.current.value = '';
    };
    const handleErrorFill = () => {
      setApear(false)
    };
    useEffect(() => {
      const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          console.log("Enter key was pressed. Run your function.");
          event.preventDefault();
          // callMyFunction();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, []);
  return (
    <div>
      {/* <PopUp /> */}
      <div className="main-task">
        <h2> To Do List </h2>
        <span>You Have {task.length} Tasks </span>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Item....."
            ref={inValue}
            aria-label="Username"
            aria-describedby="basic-addon1"
            onClick={()=>{handleErrorFill()}}
          />
        </div>
        {apear && (
          <Alert className="alert" variant="warning">
            Please Fill Text
          </Alert>
        )}

        <div className="btn-task">
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
          {task.length ? (
            <button className="btn btn-danger" onClick={deleteTasks}>
              Delete All
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="to-do-container">
            <ul>
              {task.map((text, index) => {
                return (
                  <div className="item">
                    <li>
                      {text}{" "}
                      <span onClick={() => deleteOneTask(index)}>❌</span>
                    </li>
                  </div>
                );
              })}
            </ul>
            {!task.length && (
              <Alert className="alert" variant="info">
                No Tasks Added{" "}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
