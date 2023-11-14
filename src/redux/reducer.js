
import { UPDATE_TODOS, ADD_TODO, REORDER_TODO, DELETE_TODO, EDIT_TODO } from "./actions";

const initialState = {
    todos: [
        { id: 0, text: "Hello world", completed: false }
    ],
};

const todoReducer = (state = initialState, action) => {
    let { todos } = state;
    switch (action.type) {
        case UPDATE_TODOS:
            return { ...state, todos: action.todos };

        case ADD_TODO:
            // Get the timestamp and convert 
            // it into alphanumeric input
            let uniqueId = Date.now().toString(36);
            return {
                ...state,
                todos: [{ id: uniqueId, text: action.text, completed: false }, ...todos],
            };
        case DELETE_TODO: {
            return {
                ...state,
                todos: todos.filter((todo) => todo.id !== action.id),
            };
        }
        case EDIT_TODO: {
            let eddited = todos.map((todo) =>
                todo.id !== action.payload.id ? todo : action.payload
            );
            return { todos: eddited };
        }
        case REORDER_TODO:
            const { startIndex, endIndex } = action;
            let _todos = [...todos];
            const [movedTodo] = _todos.splice(startIndex, 1);
            _todos.splice(endIndex, 0, movedTodo);
            return {
                ...state,
                todos: _todos
            };

        default:
            return state;
    }
};

export default todoReducer;
