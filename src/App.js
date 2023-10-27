import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import InputField from "./components/InputField/InputField";
import TodosList from "./components/TodoList/TodoList";
import { useDispatch } from "react-redux";
import { addTodo, updateTodos } from "./redux/actions";

const App = () => {
  const data = useSelector((state) => state.todos);
  const [todos, setTodos] = useState(data);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setTodos(data);
  }, [data])

 
  return (
    <div className="App">
      <InputField
        placeholder={"Add new task.."}
        buttonLabel="Add"
        clearOnSubmit={true}
        submit={(description) => dispatch(addTodo(description))}
      />

      <InputField
        placeholder={"Search task.."}
        buttonLabel="Find"
        submit={setSearch}
      />
 
      <TodosList
        todos={todos}
        filter={search}
        onDataUpdate={(updated) => dispatch(updateTodos(updated))} 
      />
    </div>
  );
};

export default App;
