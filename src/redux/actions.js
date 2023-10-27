export const UPDATE_TODOS = "UPDATE_TODOS";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const REORDER_TODO = "REORDER_TODO";


export const updateTodos = (todos) => ({
    type: UPDATE_TODOS,
    todos,
});

export const addTodo = (text) => ({
    type: ADD_TODO,
    text,
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id,
});

export const editTodo = (todo) => ({
    type: EDIT_TODO,
    payload: todo,
});
export const reorderTodo = (startIndex, endIndex) => ({
    type: REORDER_TODO,
    startIndex,
    endIndex,
}); 
