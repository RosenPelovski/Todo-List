import React from "react";
import Todo from "../ListItem/Todo";
import "./TodoList.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodosList = ({ todos = [], filter = "", onDataUpdate = () => { } }) => {
    
    //const handle drag sorting
    const handleDrop = (result) => {
        // in case of droping out of the list
        if (!result.destination) {
            return;
        }
        // in case of droping on same destinatoin
        if (result.destination.index === result.source.index) {
            return;
        }
        // reorder data
        let reordered = reorderArray(result.source.index, result.destination.index);

        //send data changes to parent
        //and then to global state
        onDataUpdate(reordered);
    };

    //hamdle complete
    const handleComplete = (item, val) => {
        //update item 'completed' property
        let updatedItem = { ...item, completed: val };

        //update data with edited item
        let updatedData = updateItem(updatedItem);

        //send data changes to parent
        //and then to global state
        onDataUpdate(updatedData);
    };

    //handle delete todo
    const handleDelete = (id) => {
        //remove item
        let updatedData = todos.filter((todo) => todo.id !== id);

        //send data changes to parent
        //and then to global state
        onDataUpdate(updatedData);
    };

    //handle custom sort
    function compare(a, b) {
        //move completed tasks to the end of the list
        let comparison = 0;
        if (a.completed && !b.completed) {
            comparison = 1;
        }
        if (!a.completed && b.completed) {
            comparison = -1;
        }
        return comparison;
    }

    const updateItem = (edited) => {
        //find item by id and replace it
        let updatedData = todos.map((todo) =>
            todo.id !== edited.id ? todo : edited
        );
        return updatedData;
    };

    const handleEdit = (edited) => {
        //update data with edited item
        let updatedData = updateItem(edited);

        //send data changes to parent
        //and then to global state
        onDataUpdate(updatedData);
    };

    const reorderArray = (startIndex, endIndex) => {
        let reordered = [...todos];
        var element = reordered[startIndex];
        reordered.splice(startIndex, 1);
        reordered.splice(endIndex, 0, element);
        return reordered;
    };

    function byString(todo) {
        //check if item text contain filtering string
        return todo.text.toUpperCase().includes(filter.toUpperCase());
    }

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list">
                {(dropProps) => (
                    <ul
                        ref={dropProps.innerRef}
                        {...dropProps.droppableProps}
                        className="todo-list"
                    >
                        {todos
                            .sort(compare)
                            .filter(byString)
                            .map((item, idx) => (
                                <Draggable
                                    draggableId={`list_item_${item.id}`}
                                    index={idx}
                                    key={`list_item_${item.id}`}
                                >
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            data-testid="list-item"
                                        >
                                            <Todo
                                                data={item}
                                                editTodo={handleEdit}
                                                deleteTodo={() => handleDelete(item.id)}
                                                completeTodo={(val) => handleComplete(item, val)}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}

                        {dropProps.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default TodosList;
