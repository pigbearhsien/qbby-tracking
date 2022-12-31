import { react, useEffect, useState } from "react";
import { FaOptinMonster } from "react-icons/fa";
import { Icon, IconButton } from "@mui/material";
import { BiBadgeCheck } from "react-icons/bi";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import "./todoList.css";
import instance from "../hooks/api";
import { useInfo } from "../hooks/util";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const TodoList = () => {
  const { userName, userId } = useInfo();
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState(true);

  const addTodo = async () => {
    console.log(newTodo);
    await instance.post("/addTodo", {
      studentId: userId,
      event: newTodo,
      status: "undone",
    });
  };

  const getTodo = async () => {
    console.log("frontend get");
    const {
      data: { eventList },
    } = await instance.get("/getTodo", { params: { studentId: userId } });
    //console.log(eventList);
    setTodos(eventList);
  };

  const checkTodo = async (target, state) => {
    let newState = "";
    if (state === "undone") newState = "done";
    else if (state === "done") newState = "undone";

    await instance.put("/checkTodo", {
      studentId: userId,
      event: target,
      status: newState,
    });
  };

  const deleteTodo = async (target) => {
    await instance.delete("/deleteTodo", {
      params: {
        studentId: userId,
        event: target,
      },
    });
  };

  useEffect(() => {
    getTodo();
  }, []);

  useEffect(() => {}, [load]);

  const todoFormat = () => {
    return (
      <>
        {todos.map((todo) => (
          <div className="todoContainerRow">
            <div
              className="partA"
              style={{
                width: "80%",
                fontWeight: "600",
                fontFamily: "Trebuchet MS",
              }}
            >
              <Checkbox
                {...label}
                onChange={() => {
                  checkTodo(todo.event, todo.status);
                }}
                icon={<FaOptinMonster size={30} />}
                checkedIcon={<BiBadgeCheck size={30} />}
              />

              {todo.event}
            </div>
            <IconButton
              style={{ width: "25%", verticalAlign: "bottom" }}
              onClick={() => {
                deleteTodo(todo.event);
                //bug
                getTodo();
              }}
            >
              <RiDeleteBin5Fill size={25} />
            </IconButton>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="todoWrapper" style={{ height: "100%" }}>
      <div className="todoHeader">
        <div
          className="title"
          style={{
            fontSize: "30px",
            fontWeight: "600",
            padding: "2vh",
            textAlign: "bottom",
            fontFamily: "Trebuchet MS",
          }}
        >
          <TaskAltRoundedIcon fontSize="large"></TaskAltRoundedIcon>TODOS
        </div>
      </div>
      <div className="todoBody">
        <div className="todoContainer">
          <div className="todoAddBar">
            {load ? (
              <FormControl variant="standard">
                {/*<InputLabel></InputLabel>*/}
                <Input
                  id="input-with-icon-adornment"
                  value={newTodo}
                  onChange={(e) => {
                    setNewTodo(e.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AddCircleRoundedIcon
                        color={newTodo ? "" : "disabled"}
                        size={20}
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          if (!newTodo) setLoad(false);
                          else {
                            addTodo();
                            getTodo();
                            setLoad(true);
                            setNewTodo("");
                          }
                        }}
                      ></AddCircleRoundedIcon>
                    </InputAdornment>
                  }
                />
              </FormControl>
            ) : (
              <FormControl error variant="standard">
                {/*<InputLabel></InputLabel>*/}
                <Input
                  id="input-with-icon-adornment"
                  value={newTodo}
                  onChange={(e) => {
                    setNewTodo(e.target.value);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AddCircleRoundedIcon
                        color={newTodo ? "" : "disabled"}
                        size={20}
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          if (!newTodo) setLoad(false);
                          else {
                            addTodo();
                            getTodo();
                            setLoad(true);
                            setNewTodo("");
                          }
                        }}
                      ></AddCircleRoundedIcon>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">
                  Please enter a ToDo
                </FormHelperText>
              </FormControl>
            )}
          </div>
          {todoFormat()}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
