import { react, useEffect, useState } from "react";
import { FaOptinMonster } from "react-icons/fa";
import { Icon, IconButton } from "@mui/material";
import { BiBadgeCheck } from "react-icons/bi";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import "./todoList.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [load, setLoad] = useState(true);

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
                onChange={(e) => {
                  let tmp = todos;
                  for (let i = 0; i < todos.length; i++) {
                    if (todos[i].task === todo.task) {
                      tmp[i].checked = !tmp[i].checked;
                    }
                  }
                  setTodos(tmp);
                  e.target.checked = todo.checked;
                }}
                icon={<FaOptinMonster size={30} />}
                checkedIcon={<BiBadgeCheck size={30} />}
              />

              {todo.task}
            </div>
            <IconButton
              style={{ width: "25%", verticalAlign: "bottom" }}
              onClick={() => {
                setTodos(todos.filter((item) => item.task !== todo.task));
              }}
            >
              <RiDeleteBin5Fill size={25} />
            </IconButton>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    //console.log(todos);
  }, [todos]);

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
                            setTodos([
                              ...todos,
                              { task: newTodo, checked: false },
                            ]);
                            setNewTodo("");
                            setLoad(true);
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
                            setTodos([
                              ...todos,
                              { task: newTodo, checked: false },
                            ]);
                            setNewTodo("");
                            setLoad(true);
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
