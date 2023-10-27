import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import InputField from './InputField';

// Mock the submit function
const mockSubmit = jest.fn();

describe('InputField', () => {
  it('tests the default props', () => {
       render(<InputField placeholder='Enter text here' />)
       const input = screen.getByPlaceholderText('Enter text here')
       expect(input).toBeInTheDocument()
       expect(input).toHaveValue('') // the initial value is an empty string
   })

   it('tests the onChange event', () => {
    render(<InputField placeholder='Add new task..' />)
    const input = screen.getByPlaceholderText('Add new task..')
    const value = 'Entered Text'
    fireEvent.change(input, {
        target: {
            value
        }
    })
    expect(input).toHaveValue('Entered Text') // the state has been updated.
})

it("calls the submit function on form submission", () => {
  render(<InputField submit={mockSubmit} />);
  const inputElement = screen.getByPlaceholderText("Enter text here");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(inputElement, { target: { value: "Test Todo" } });
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalledWith("Test Todo");
});

it("clears the input field on form submission when clearOnSubmit is true", () => {
  render(<InputField submit={mockSubmit} clearOnSubmit={true} />); 
  const inputElement = screen.getByPlaceholderText("Enter text here");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(inputElement, { target: { value: "Test Todo" } });
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalledWith("Test Todo");
  expect(inputElement.value).toBe("");
});

})