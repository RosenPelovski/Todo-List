import React from "react"
import { render, screen } from "@testing-library/react"
import TodosList from "./TodoList"


describe('TodoList', () => {
    it("should render list of 3 tasks", () => {
        const todos = [
            { id: 1, text: "Sample Task 1", completed: false },
            { id: 2, text: "Sample Task 2", completed: false },
            { id: 3, text: "Sample Task 3", completed: true },
        ]
      
    render(<TodosList todos={todos} />)
    const listItems = screen.getAllByTestId('list-item');
    expect(listItems).toHaveLength(todos.length);
    })
})
