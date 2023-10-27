import React, { useEffect, useState, useRef } from "react";
import "./Todo.css";
const Todo = ({ data, deleteTodo, editTodo, completeTodo }) => {
  const [updatedText, handleUpdate] = useState(data.text);
  const [editing, handleEditing] = useState(false);
  const [checked, onCheck] = useState(data.completed);

  const textRef = useRef(null);

  useEffect(() => {
    //set focus to text 
    if (editing) {
      textRef.current.focus();
    }
  }, [textRef, editing]);

  useEffect(() => {
    handleUpdate(data.text);
  }, [data]);

  const onEditHandle = (e) => {
    if (editing) {
      //stop ediding
      handleEditing(false);
      //update data
      editTodo({ ...data, text: updatedText });
    } else {
      //start editing
      handleEditing(true);
    }
  };

  const handleCheck = (checked) => {
    //change checkbox state
    onCheck(checked);

    //wait for transition to play 
    setTimeout(() => {
      completeTodo(checked);
    }, 200);

  }

  return (
    <div className="list-item">
      <div className="list_item_options">
        <input
          type="checkbox"
          id={`box${data.id}`}
          data-testid={`checkbox_${data.id}`}
          checked={checked}
          onChange={(e) => handleCheck(e.target.checked)}
        />
        <div className="list_item_options">
          <div className={`todo-button rect`} onClick={(e) => onEditHandle(e)}>
            {editing ? "Save" : "Edit"}
          </div>

          <div
            className="todo-button delete"
            data-testid={`delete_${data.id}`}
            onClick={() => deleteTodo()}
          />
        </div>
      </div>

      <div
        className={`text ${data.completed ? "completed" : "active"}`}
        contentEditable={editing}
        suppressContentEditableWarning={true}
        ref={textRef}
        onInput={(e) => handleUpdate(e.currentTarget.innerText)}
        onBlur={(e) => setTimeout(() => { if (editing) { handleEditing(false); } }, 200)}
      >
        {data.text.replace("/[\n]/g;", "\n")}
      </div>
    </div>
  );
};

export default Todo;
