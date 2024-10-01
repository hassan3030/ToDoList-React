import React , {useState} from 'react'
import image from './images.png'
import { DarkThemeToggle, Flowbite , Table , Button, Navbar ,Modal  } from "flowbite-react"
import Confetti from 'react-confetti'
import pop from './music/pop.wav'
import wrong from './music/wrong.wav'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from 'react-toastify';
const Task = () => {
  const [tasks , setTasks] = useState([]);
  const [inputVal , setInputVal] = useState('');
  const [audio , setAudio] = useState();
  const [openModal, setOpenModal] = useState(false );
  const [updateTask, setUpdateTask] = useState(true );
  const notifyAdding = () => toast.info("Task Is Added 👌");
  const notifyDeleting = () => toast.warn("Task Is Deleted ❌");
  const notifyDeletingAll = () => toast.warn("All Tasks Are Deleted ❌");
  const notifyErrorValid = () => toast.error("Please Fill Detailes of Task");
  const notifyFinish = () => toast("Task Is Finished 👌");
  const notifyUpdate = () => toast("Task Is Updated 👌");
  
  
  const addTask = ()=>{
   if(inputVal==''){notifyErrorValid()}
   if(inputVal!=''){
    const oldTasks = tasks 
    const newTasks = [...oldTasks , {id : tasks.length+1 , titile:inputVal , done:true}]
    setTasks(newTasks)
    setInputVal('')
    notifyAdding()
    setAudio(new Audio(pop))
    audio.play()
   }
  
  }

  const handleAddTask = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
    }

  const deleteTask = (i)=>{
    if(tasks.length==0){ setTasks([])}
     const oldTasks = tasks 
     const newTasks = oldTasks.splice(i ,1)
     setTasks(newTasks)
     notifyDeleting()
   
  }
  const deleteAllTask = ()=>{
    setTasks([])
    notifyDeletingAll()
    setAudio(new Audio(wrong))
    audio.play()
  }
  const completTask = (i)=>{
    const newTasks = tasks 
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
    notifyFinish()
  }
  return (
    <>
     <ToastContainer
     position="top-center"
     theme="dark"
     />
    {/* <Confetti className='w-screen h-screen' /> */}
   
    <div className=''>
       
       {/* nav start */}
       <Navbar fluid rounded className="dark:bg-[#121212]" >
       <Navbar.Brand href="#">
         <img src={image} className="mr-3 h-6 sm:h-9 w-24 rounded-full" alt="Not found" />
         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hover:text-black hover:scale-25 ">To Do List</span>
       </Navbar.Brand>
       <div className="flex md:order-2 gap-1">
     {tasks.length ?  (<Button color="failure" onClick={() => setOpenModal(true)} >Delete All</Button>):'' }
                 <Button onClick={addTask}>ٍAdd Task</Button>
         <Flowbite>
       <DarkThemeToggle />
     </Flowbite>
         <Navbar.Toggle />
       </div>
       <Navbar.Collapse className=''>
       <input
     name ='taskTitle'
     value={inputVal}
     onChange={(e)=>{ setInputVal(e.target.value)}}
     onKeyPress={handleAddTask}
     type="text"
     className=" block lg:-mt-5 md:-mt-5 min-h-[auto] w-full rounded border-1 border-blue-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
     id="exampleFormControlInputText"
     placeholder=" Titile Task" />
       </Navbar.Collapse>
     </Navbar>
 
     {/* task table */}
 
     <div className="overflow-x-auto h-[500px] overflow-y-scroll">
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
             
          //  [1,2,4,3,5,6,7,89,9,10,11,31,44]
           tasks.map((item , index)=>{
             return (
               <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 max-h-8" key={item}>
               <Table.Cell className=" text-gray-900 dark:text-white  " title='Done'>
               <span className=' inline-block cursor-pointer box-border text-2xl hover:translate-x-2'   onClick={()=>{completTask(index)}} > 👉</span>
               </Table.Cell>
               <Table.Cell className={`line-clamp-1 max-w-52 truncate overflow-clip align-middle ${item[index]?.done && 'line-through'}`} title=''
               > 
              { toString(item[index]?.titile)} --- {item[index]?.id} 
               </Table.Cell>
               <Table.Cell> <span className=' cursor-pointer box-content hover:text-2xl ' title='Delete' onClick={()=>{deleteTask(index)}}> ❌</span></Table.Cell>
               <Table.Cell>
                {updateTask? (<Button className='w-16' pill  onClick={()=>{setUpdateTask(false)}}>Edit</Button>) : ( <Button className='w-16' pill onClick={()=>{setUpdateTask(true)}}>Ok</Button>)}
                
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
    </>
    
  )
}

export default Task