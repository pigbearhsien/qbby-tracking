import { react, useEffect, useState } from "react";
import { FcEngineering } from "react-icons/fc";
import { FaOptinMonster } from "react-icons/fa";
import { Icon, IconButton } from "@mui/material";
import { BiBadgeCheck } from "react-icons/bi";
import { GrFormAdd } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
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
            <div className="partA" style={{ width: "80%" }}>
              <Checkbox
                {...label}
                icon={<FaOptinMonster size={25} />}
                checkedIcon={<BiBadgeCheck size={25} />}
              />
              {todo}
            </div>
            <IconButton
              style={{ width: "20%", verticalAlign: "bottom" }}
              onClick={() => {
                todos.filter((item) => item === todo);
                console.log(todos);
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
    <div
      className="todoList"
      style={{ height: "100%", boxSizing: "border-box" }}
    >
      <div className="todoHeader">
        <div className="title" style={{ fontSize: "20px" }}>
          <FcEngineering size={20}></FcEngineering>今日任務
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
                      <GrFormAdd
                        size={20}
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          if (!newTodo) setLoad(false);
                          else {
                            setTodos([...todos, newTodo]);
                            setNewTodo("");
                            setLoad(true);
                          }
                        }}
                      ></GrFormAdd>
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
                      <GrFormAdd
                        size={20}
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          if (!newTodo) setLoad(false);
                          else {
                            setTodos([...todos, newTodo]);
                            setNewTodo("");
                            setLoad(true);
                          }
                        }}
                      ></GrFormAdd>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">
                  尚未輸入代辦事項
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
