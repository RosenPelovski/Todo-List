import React from "react";
import { render, fireEvent, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // You may need to install this package
import App from "./App";

// Mock the Redux store
const mockStore = configureStore([]);
const initialState = {
  todos: [
    { id: 1, text: "Sample Task 1", completed: false },
    { id: 2, text: "Sample Task 2", completed: true },
  ],
};
const store = mockStore(initialState);
 

describe("App Component", () => {
  it("renders the App component with an input field for adding tasks", async () => {
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addInput = screen.getByPlaceholderText("Add new task..");
    const searchInput = screen.getByPlaceholderText("Search task..");
    const todoList = screen.getByRole("list");
    const listItems = screen.getAllByTestId('list-item');

    expect(addInput).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(todoList).toBeInTheDocument();
    expect(listItems).toHaveLength(initialState.todos.length);

    

  });
 

  it("filter the list when the 'Find' button is clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search task..");
    const findButton = screen.getByText("Find");

    // Ensure that both tasks are displayed 
    const task1 = screen.getByText("Sample Task 1");
    const task2 = screen.getByText("Sample Task 2");

    fireEvent.change(searchInput, { target: { value: "Sample Task 1" } });
    fireEvent.click(findButton)

    // Ensure that Sample Task 1 is displayed
    expect(task1).toBeInTheDocument();

    // Ensure that Sample Task 2 is not found
    expect(task2).not.toBeInTheDocument();
  });

});
