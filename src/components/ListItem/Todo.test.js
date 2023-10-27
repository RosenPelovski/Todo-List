import React from "react";
import {render, screen} from "@testing-library/react";
 
import Todo from "./Todo";

// Mock the state 
const todos= [
    { id: 1, text: "Sample Task 1", completed: false },
    { id: 2, text: "Sample Task 2", completed: false },
    { id: 3, text: "Sample Task 3", completed: true },
  ]

describe("Todo Component", () => {
  it("renders list item todo component", () => {
    let [first] = todos;
    render(
        <Todo data={first} />
    );
    
    const description = screen.getByText(first.text);
    const editButton = screen.getByText(`Edit`);
    const deleteButton = screen.getByTestId(`delete_${first.id}`);
    const checkbox = screen.getByTestId(`checkbox_${first.id}`);  

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(description).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
 
    
  });
});
