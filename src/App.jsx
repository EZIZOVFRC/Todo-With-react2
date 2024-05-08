import React, { useState } from "react";
import "./App.css";

function App() {
  const [inpValue, setInpValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInp = (e) => {
    setInpValue(e.target.value);
  };
  let count = tasks.length;
  const addTask = (e) => {
    e.preventDefault();
    if (inpValue.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          detail: inpValue,
          completed: false,
        },
      ]);
      setInpValue("");
    }
  };

  const delTask = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const completedTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filterData = (str) => {
    switch (str) {
      case "completed":
        setTasks([...tasks.filter((task) => task.completed)]);
        break;
      case "uncompleted":
        setTasks([...tasks.filter((task) => !task.completed)]);
        break;
      case "all":
        setTasks([...tasks]);
        break;
      default:
        setTasks([...tasks]);
        break;
    }
  };

  return (
    <>
      <div className="todol">
        <div className="todos">
          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Create a new todo..."
              onChange={handleInp}
              value={inpValue}
            />
            <button id="addtsk" type="submit">
              Add
            </button>
          </form>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "inherit",
                }}
              >
                <button id="done" onClick={() => completedTask(task.id)}>
                  <i className="fa-solid fa-check"></i>
                </button>
                <span>{task.detail}</span>
              </li>
            ))}
          </ul>
          <div className="sorts">
            <span id="leftt">{count} items left</span>
            <button id="del" onClick={clearCompleted}>
              Clear completed
            </button>
            <select
              name=""
              id=""
              onChange={(e) => {
                filterData(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
