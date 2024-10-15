import React, { useState, useEffect } from "react";
import image from "./images.png";
import "./task.css";
import {
  DarkThemeToggle,
  Flowbite,
  Table,
  Button,
  Navbar,
  Modal,
  Tooltip ,
} from "flowbite-react";
import Confetti from "react-confetti";
import pop from "./music/pop.wav";
import wrong from "./music/wrong.wav";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaPenAlt } from "react-icons/fa";
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Task = () => {
  const [tasks, setTasks] = useState([] || null);
  const [tasksDone, setTasksDone] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [inputIndex, setInputIndex] = useState();
  const [inputUpdateVal, setInputUpdateVal] = useState("");
  const [audio, setAudio] = useState();
  const [sielent, setSielent] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const notifyAdding = () => toast.info("Task Is Added 👌");
  const notifyDeleting = () => toast.warn("Task Is Deleted ❌");
  const notifyDeletingAll = () => toast.warn("All Tasks Are Deleted ❌");
  const notifyErrorValid = () => toast.error("Please Fill Detailes of Task");
  const notifyFinish = () => toast("Task Is Finished 👌");
  const notifyRelosded = () => toast.info("Task Is Reloded 👌");
  const notifyUpdate = () => toast("Task Is Updated 👌");

  useEffect(() => {
    const storedTasks = localStorage.getItem("storageTasks");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
    setAudio(new Audio(pop));
  }, [tasks]);

  const addTask = () => {
    if (inputVal === "") {
      notifyErrorValid();
    }
    if (inputVal !== "") {
      const oldTasks = tasks || [];
      const newTasks = [
        ...oldTasks,
        { id: tasks?.length + 1, title: inputVal, done: true },
      ];
      localStorage.setItem("storageTasks", JSON.stringify(newTasks));
      setTasks(JSON.parse(localStorage.getItem("storageTasks")));
      setInputVal("");
      notifyAdding();
      setTasksDone(false);

      if (sielent === true) {
        setAudio(new Audio(pop));
        audio.play();
      }
    }
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleUpdateTask = (e) => {
    if (e.key === "Enter") {
      updateTaskInput(inputIndex);
    }
  };

  const updateTaskInput = (i) => {
    if (inputUpdateVal === "") {
      notifyErrorValid();
    }
    if (inputUpdateVal !== "") {
      const oldTasks = tasks || [];
      oldTasks[i].title = inputUpdateVal;
      const newTasks = oldTasks;
      localStorage.setItem("storageTasks", JSON.stringify(newTasks));
      setTasks(JSON.parse(localStorage.getItem("storageTasks")));
      setOpenModalUpdate(false);
      setInputVal("");
      notifyUpdate();
      if (sielent === true) {
        setAudio(new Audio(pop));
        audio.play();
      }
    }
  };

  const deleteTask = (i) => {
    if (tasks.length === 0) {
      localStorage.setItem("storageTasks", JSON.stringify([]));
      setTasks([]);
      setTasksDone(false);
      notifyDeletingAll();
      if (sielent === true) {
        setAudio(new Audio(wrong));
        audio.play();
      }
    } else {
      const oldTasks = tasks;
      const newTasks = oldTasks.splice(i, 1);
      setTasks(newTasks);
      localStorage.setItem("storageTasks", JSON.stringify(tasks));
      setTasks(JSON.parse(localStorage.getItem("storageTasks")));

      // array task fillter
      const allEqualDone = (tasks) => tasks.every((ob, i) => ob.done === false);
      setTasksDone(allEqualDone(tasks));

      notifyDeleting();
    }
  };
  const deleteAllTask = () => {
    setTasks([]);
    localStorage.setItem("storageTasks", JSON.stringify([]));

    notifyDeletingAll();
    if (sielent === true) {
      setAudio(new Audio(wrong));
      audio.play();
    }
    setTasksDone(false);
  };

  const completTask = (i) => {
    setInputIndex(i);
    const newTasks = tasks;
    const newDone = newTasks[i].done;
    newTasks[i].done = !newDone;
    setTasks(newTasks);
    localStorage.setItem("storageTasks", JSON.stringify(tasks));
    setTasks(JSON.parse(localStorage.getItem("storageTasks")));
    if (newTasks[i].done === false) notifyFinish();
    else notifyRelosded();

    // array task fillter
    const allEqualDone = (tasks) => tasks.every((ob, i) => ob.done === false);
    setTasksDone(allEqualDone(tasks));
  };
  return (
    <>
      <ToastContainer position="top-left" theme="dark" />
      {tasksDone && <Confetti className="w-screen h-screen" />}

      <div className="dark:bg-gray-800 dark:bg-clip-border min-h-dvh">
        {/* nav start */}
        <Navbar fluid rounded   className=" dark:!bg-gray-800" >
          <Navbar.Brand href="#">
            gray-800
            <img
              src={image}
              className="logo mr-3 h-8 sm:h-9 w-24 rounded-full "
              alt="Not found"
            />
          </Navbar.Brand>
          <div className="flex md:order-2 gap-1 sm:justify-start ">
            {tasks?.length ? (
              <Button color="failure" onClick={() => setOpenModalDelete(true)}>
                Delete All
              </Button>
            ) : (
              ""
            )}
            <Button onClick={addTask}>ٍAdd</Button>
            {sielent ? (
              <MdMusicNote
                className="text-3xl my-1 align-text-bottom rounded p-1 opacity-50 hover:bg-[#E5E7EB] dark:text-white "
                onClick={() => {
                  setSielent(false);
                }}
              />
            ) : (
              <MdMusicOff
                className="text-3xl my-1 align-text-bottom rounded p-1 opacity-50 hover:bg-[#E5E7EB] dark:text-white"
                onClick={() => {
                  setSielent(true)
                }}
              />
            )}
            <Flowbite>
              <DarkThemeToggle />
            </Flowbite>
          </div>
          <div className="input-task mt-3">
            <input
              name="taskTitle"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
              }}
              onKeyPress={handleAddTask}
              type="text"
              className="input-task block lg:-mt-5 md:-mt-5 min-h-[auto] w-full rounded border-1 border-blue-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInputText"
            />
          </div>
        </Navbar>

        {/* task table */}

        <div className="table-task ">
          <Table hoverable>
            <Table.Head className="">
              <Table.HeadCell>#</Table.HeadCell>
              <Table.HeadCell className="">Task title</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {
                tasks &&
                  tasks.map((item, index) => {
                    return (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 max-h-8"
                        key={index}
                      >
                        <Table.Cell
                          className="Cell text-gray-900 dark:text-white dark:bg-gray-800 "
                          title="Done"
                        >
                          <span
                            className=" Cell inline-block cursor-pointer box-border text-2xl hover:translate-x-2"
                            onClick={() => {
                              completTask(index);
                            }}
                          >
                            👉
                          </span>
                        </Table.Cell>
                        <Table.Cell
                          className={` Cell  dark:bg-gray-800 dark:bg-clip-border text-black mt-[17px] dark:text-white ${
                            !item?.done && "line-through"
                          }`}
                         
                        >
                         
                          
                          <Tooltip  className="max-w-[250px] break-words" content={item?.title} placement="bottom">
                          <p 
                          className="line-clamp-1 max-w-52 truncate overflow-clip align-middle ">
                            {item?.title}
                          </p>
    </Tooltip>
                   </Table.Cell>
                        <Table.Cell className="Cell dark:bg-gray-800 dark:bg-clip-border">
                          <span
                            className="Cell dark:bg-gray-800 cursor-pointer box-content hover:text-2xl "
                            title="Delete"
                            onClick={() => {
                              deleteTask(index);
                            }}
                          >
                          ❌
                          </span>
                        </Table.Cell>
                        <Table.Cell className="Cell dark:bg-gray-800">
                          <Button
                            className=" w-16 "
                            pill
                            onClick={() => {
                              setOpenModalUpdate(true);
                              setInputIndex(index);
                            }}
                          >
                            Edit
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
              }
            </Table.Body>
          </Table>
        </div>
      </div>

      {/* Start Modal Delete */}

      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete all tasks?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModalDelete(false);
                  deleteAllTask();
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Start Modal Update */}

      <Modal
        show={openModalUpdate}
        size="md"
        onClose={() => setOpenModalUpdate(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FaPenAlt className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to change title of task?
            </h3>
            <input
              name="inputUpdat"
              value={inputUpdateVal}
              onChange={(e) => {
                setInputUpdateVal(e.target.value);
              }}
              onKeyPress={handleUpdateTask}
              type="text"
              className=" min-h-[auto] w-full mb-5 rounded border-1 border-blue-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="enter task title"
            />
            <div className="flex justify-center gap-4">
              <Button
                color="blue"
                pill
                onClick={() => {
                  updateTaskInput(inputIndex);
                }}
              >
                {"Ok"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalUpdate(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
s 

    </>
  );
};

export default Task;