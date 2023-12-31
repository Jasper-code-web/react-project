import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./style.css";

function App() {
  const [todos, setTodos] = useState([
    { title: "Cabbage", isCheck: false, id: 1, isEdit: false },
    { title: "Garlic", isCheck: false, id: 2, isEdit: false },
    { title: "Apple", isCheck: true, id: 3, isEdit: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");

  const inputWord = (e) => {
    setNewTodo(e.target.value)
  };

  const enterInput = (e) => {
    if (e.code === "Enter") {
      setTodos([
        ...todos,
        {
          title: newTodo,
          isCheck: false,
          isEdit: false,
          id: todos[todos.length - 1].id + 1
        }
      ])
      setNewTodo("")
    }
  };

  const changeCheckState = (e, id) => {
    todos.map(todo => {
      if (todo.id === id) todo.isCheck = e.target.checked
    })
    setTodos([...todos])
  }

  const removeTodo = (todo) => {
    setTodos([...todos.filter(item => item.id !== todo.id)])
  }

  const changeEditState = (todo) => {
    todos.map(item => {
      if (todo.id === item.id) {
        item.isEdit = true
        setEditTodo(todo.title)
      }
    })
    setTodos([...todos])
  }

  const changeEditWord = (e) => {
    setEditTodo(e.target.value)
  }

  const confirmEdit = (e, todo) => {
    const handleEdited = (todo) => {
      console.log('editTodo',editTodo)
      if(editTodo == "") {
        console.log('editTodo',editTodo)
        removeTodo(todo)
      }
      else {
        todos.map(item => {
          if (todo.id === item.id) {
            item.title = editTodo
            item.isEdit = false
          }
        })
        setTodos([...todos])
      }
      setEditTodo("")
    }
    if(todo && todo.isEdit) {
      if(e && e.code) {
        if(e.code === "Enter") handleEdited(todo)
      } else handleEdited(todo)
    }
  }

  return (
    <div className="app">
      <ul className="todo-list">
        <input
          placeholder="请输入"
          onKeyUp={(e) => enterInput(e)}
          onChange={(e) => inputWord(e)}
          value={newTodo}
        ></input>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="view">
              <li className={todo.isEdit ? "blank" : "completed"}>
                <span className={todo.isCheck ? "title" : ""} onDoubleClick={() => changeEditState(todo)}>{todo.title}</span>
                <input type="checkbox" value={todo.isCheck} checked={todo.isCheck} onChange={(e) => changeCheckState(e, todo.id)}></input>
                <span className="close" onClick={() => removeTodo(todo)}>X</span>
              </li>
              <input type="text" value={editTodo} onKeyUp={(e) => confirmEdit(e, todo)} onBlur={() => {confirmEdit(todo)}} onChange={(e) => {changeEditWord(e)}} className={todo.isEdit ? "edit-input" : "invisible-input"} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
