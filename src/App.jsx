import { useState, useReducer } from "react";
import "./style.css";
import Todo from "./Todo";

export const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodos(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
      return todo
      })
  }
}

function newTodos(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }

  console.log(todos);

  return (
    <>
    <form onSubmit={handleSubit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
    {todos.map(todo => {
return     <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
    })}
    </>
  );
}

export default App;

// ==========================
//・payload: {name: name} ⇒ 2つ目のname≒このname ⇒ const [name, setName] = useState("");
// ==========================
