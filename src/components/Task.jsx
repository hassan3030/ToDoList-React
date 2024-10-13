import React , { useState , useEffect , useRef  } from 'react'
import image from './images.png'
import "./task.css"
import { DarkThemeToggle, Flowbite , Table , Button, Navbar ,Modal, Footer  } from "flowbite-react"
import Confetti from 'react-confetti'
import pop from './music/pop.wav'
import wrong from './music/wrong.wav'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const Task = () => {

  const [tasks , setTasks] = useState([] || null);
  const [tasksDone , setTasksDone] = useState(false);
  const [inputVal , setInputVal] = useState('');
  const [inputIndex , setInputIndex] = useState(true);
  const [inputUpdateVal , setInputUpdateVal] = useState();
  const [audio , setAudio] = useState();
  const [sielent , setSielent] = useState(true);
  const [openModal, setOpenModal] = useState(false );
  const [updateTask, setUpdateTask] = useState(false );
  const [fillArray, setFillArray] = useState([]);

  const inputRef = useRef(null);
  const notifyAdding = () => toast.info("Task Is Added 👌");
  const notifyDeleting = () => toast.warn("Task Is Deleted ❌");
  const notifyDeletingAll = () => toast.warn("All Tasks Are Deleted ❌");
  const notifyErrorValid = () => toast.error("Please Fill Detailes of Task");
  const notifyFinish = () => toast("Task Is Finished 👌");
  const notifyRelosded = () => toast.info("Task Is Reloded 👌");
  const notifyUpdate = () => toast("Task Is Updated 👌");
  
  useEffect( () => {
    const storedTasks = localStorage.getItem('storageTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    // --------------------------------------
      // setFillArray(storedTasks)
      // const newFillArray = fillArray;
     

      const newFillArray = fillArray;
      tasks.map((i)=>{
        newFillArray[i] = true
        setFillArray(newFillArray)
      })
      
    // --------------------------------------

    }else {
      setTasks([]);
    }
    setAudio(new Audio(pop));
   
  }, []);

  const addTask = ()=>{
   if(inputVal===''){notifyErrorValid()}
   if(inputVal!==''){
    const oldTasks = tasks || []
    const newTasks = [...oldTasks , {id : tasks?.length+1 , title:inputVal , done:true}]
    localStorage.setItem('storageTasks', JSON.stringify(newTasks));
    setTasks(JSON.parse(localStorage.getItem('storageTasks')))
    setInputVal('')
    notifyAdding()
    setTasksDone(false)
    
    const newFillArray = fillArray;
    setFillArray( [...newFillArray , true] )

    if(sielent==true) {
      setAudio(new Audio(pop)) 
       audio.play()
      }
   }

  }

  const handleAddTask = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
    }
    const handleUpdateTask = (e) => {
      if (e.key === 'Enter') {
        updateTask()
      }
      }


const editTask = (i)=>{

  const newFillArray = fillArray
  newFillArray[i]=false
  setFillArray(newFillArray)

  console.log(fillArray)
  const inp = document.querySelector(`#inp${i}`);
   inp.style.display = 'block';
   inp.focus()

   const title = document.querySelector(`#tit${i}`);
   title.style.display = 'none';

  //  document.querySelector(`#botOK${i}`).style.visibility = 'visible';
  // //  buttonOk.style.visibility = 'visible';

  //  document.querySelector(`#botEdit${i}`).style.visibility = 'hidden';
  // //  buttonEdit.style.visibility = 'hidden';

  }
      const updateTaskInput = (i)=> {
  console.log(fillArray)

        const inp = document.querySelector(`#inp${i}`);
        inp.style.display = 'none';

        const title = document.querySelector(`#tit${i}`);
        title.style.display = 'block';
    
        const newFillArray = fillArray
        newFillArray[i]=true
        setFillArray(newFillArray)
        //  document.querySelector(`#botOK${i}`).style.visibility = 'hidden';
        // // buttonOk.style.visibility = 'hidden';
     
        // document.querySelector(`#botEdit${i}`).style.visibility = 'visible';
        // // buttonEdit.style.visibility = 'visible';

      if(inputUpdateVal===''){notifyErrorValid()}
      if(inputUpdateVal!==''){
    const oldTasks = tasks || []
    oldTasks[i].title = inputUpdateVal
    const newTasks = [...oldTasks ]
    localStorage.setItem('storageTasks', JSON.stringify(newTasks));
    setTasks(JSON.parse(localStorage.getItem('storageTasks')))
    setInputVal('')
    notifyUpdate()
    if(sielent==true) {
      setAudio(new Audio(pop)) 
       audio.play()
      }
   }
        }

  const deleteTask = (i)=>{
    if(tasks.length==0){
       localStorage.setItem('storageTasks', JSON.stringify([]));
      setTasks([])
      setTasksDone(false)
      setFillArray([])
       notifyDeletingAll()
       if(sielent==true) { 
        setAudio(new Audio(wrong))
        audio.play()
      }
      
  }
    else{
     const oldTasks = tasks 
     const newTasks = oldTasks.splice(i,1)
     setTasks(newTasks)
     localStorage.setItem('storageTasks', JSON.stringify(tasks));
     setTasks(JSON.parse(localStorage.getItem('storageTasks')))
     setFillArray(Array(newTasks.length).fill(true))
     // array task fillter
    const allEqualDone = tasks => tasks.every((ob , i ) => ob.done === false);
    setTasksDone(allEqualDone(tasks))

     notifyDeleting()
   }
  }
  const deleteAllTask = ()=>{
    setTasks([])
    localStorage.setItem('storageTasks', JSON.stringify([]));
    setFillArray([])
    notifyDeletingAll()
    if(sielent==true) {
      setAudio(new Audio(wrong))
      audio.play()
     }
     setTasksDone(false)
  }
  const completTask = (i)=>{
    setInputIndex(i)
    const newTasks = tasks 
    const newDone =  newTasks[i].done
    newTasks[i].done = !newDone
    setTasks(newTasks)
    localStorage.setItem('storageTasks', JSON.stringify(tasks));
    setTasks(JSON.parse(localStorage.getItem('storageTasks')))
    if(newTasks[i].done==false)  notifyFinish();
    else notifyRelosded();
    

    // array task fillter
    const allEqualDone = tasks => tasks.every((ob , i ) => ob.done === false);
    setTasksDone( allEqualDone(tasks))

  }
  const inputTask = (
    <input
    
  name ='taskTitle'
  value={inputVal}
  onChange={(e)=>{ setInputVal(e.target.value)}}
  onKeyPress={handleAddTask}
  type="text"
  className="input-task block lg:-mt-5 md:-mt-5 min-h-[auto] w-full rounded border-1 border-blue-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
  id="exampleFormControlInputText"
  placeholder=" Titile Task" />
  ) 
  return (
    <>
     <ToastContainer
     position="top-left"
     theme="dark"
     />
     { tasksDone && <Confetti className='w-screen h-screen' /> }
     
   
    <div className=''>
       
       {/* nav start */}
       <Navbar fluid rounded className=" dark:bg-[#121212]" >
       <Navbar.Brand href="#">
         <img src={image} className="logo mr-3 h-8 sm:h-9 w-24 rounded-full " alt="Not found" />
       </Navbar.Brand>
       <div className="flex md:order-2 gap-1 sm:justify-start ">

     {tasks?.length ?  (<Button color="failure" onClick={() => setOpenModal(true)} >Delete All</Button>):'' }
                 <Button onClick={addTask}>ٍAdd</Button>
       {sielent? ( <MdMusicNote className="text-3xl my-1 align-text-bottom rounded p-1 opacity-50 hover:bg-[#E5E7EB] dark:text-white" onClick={()=>{setSielent(false)}} />) :(<MdMusicOff className="text-3xl my-1 align-text-bottom rounded p-1 opacity-50 hover:bg-[#E5E7EB] dark:text-white" onClick={()=>{setSielent(true)}} /> )  }
         <Flowbite>
       <DarkThemeToggle />
     </Flowbite>
       </div>
     <div className='input-task'>
        {inputTask}
     </div>
      
     </Navbar>
 
     {/* task table */}
 
     <div className="table-task overflow-x-auto h-[500px] overflow-y-scroll">
       <Table hoverable>
         <Table.Head className=''>
           <Table.HeadCell >#</Table.HeadCell>
           <Table.HeadCell  className=''>Task title</Table.HeadCell>
           <Table.HeadCell>Delete</Table.HeadCell>
           <Table.HeadCell>
             <span className="sr-only">Edit</span>
           </Table.HeadCell>
         </Table.Head>
 
         <Table.Body className="divide-y">
         
          {
            //  
          //  [1,2,4,3,5,6,7,89,9,10,11,31,44]
          tasks &&  tasks.map((item , index)=>{
             return (
               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 max-h-8" key={index}>

               <Table.Cell className="Cell text-gray-900 dark:text-white  " title='Done'>
               <span className=' Cell inline-block cursor-pointer box-border text-2xl hover:translate-x-2'   onClick={()=>{completTask(index)}} > 👉</span>
               </Table.Cell>
               <Table.Cell className={` Cell line-clamp-1 max-w-52 truncate overflow-clip align-middle text-black mt-[17px] dark:text-white ${!item?.done && 'line-through'}`} title=''
               > 
                  <input
                  id={'inp'+index}
                  ref={inputRef} 
                  name = 'inputUpdat'
                  value={inputUpdateVal}
                  onChange={(e)=>{ setInputUpdateVal(e.target.value)}}
                  onKeyPress={()=>{handleUpdateTask()}}
                  type="text"
                  className=" hidden lg:-mt-5 md:-mt-5 min-h-[auto] w-full rounded border-1 border-blue-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder='enter task title'
                 />
                 <p id={'tit'+index}>
                  {item?.title}
                 </p>
              

               </Table.Cell>
               <Table.Cell> <span className='Cell cursor-pointer box-content hover:text-2xl ' title='Delete' onClick={()=>{deleteTask(index)}}> ❌</span></Table.Cell>
               <Table.Cell className='Cell'>
                {/* {!fillArray[index] ?(<Button id={'botEdit'+index} className='w-16' pill  onClick={()=>{editTask(index) }}>Edit</Button>) : (<Button id={'botOk'+index} className=' w-16 ' pill onClick={()=>{updateTaskInput(index)}}>Ok</Button>)} */}
                <Button id={'botEdit'+index} className='w-16' pill  onClick={()=>{editTask(index) }}>Edit</Button> <Button id={'botOk'+index} className=' w-16 ' pill onClick={()=>{updateTaskInput(index)}}>Ok</Button>
                {fillArray[index] ?'ok':'No'}
                <br/>
                {fillArray[index]+'sssssss'}
               </Table.Cell>
             </Table.Row>
 
             )
           })
          }
         
         </Table.Body>
       </Table>
     </div>
     </div>

     {/* start modal */}
   
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete all tasks?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => { setOpenModal(false) ; deleteAllTask() }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Footer/>

    </>
    
  )
}

export default Task