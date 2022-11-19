import { react, useState } from "react";
import { FcEngineering } from "react-icons/fc";
import "./todoList.css";

const todoList = () => {
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
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>10</li>
          </ul>
        </div>
      </div>
      <div className="todoFooter"></div>
    </div>
  );
};

export default todoList;
