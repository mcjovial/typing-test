import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

const mockedOnClick = jest.fn();

describe("AddInput", () => {

  it('should render a button with the class of btn', () => {
    render(
      <Button
        type='success'
        onClick={mockedOnClick}
        name='Go!'
      />
    );
    const button = screen.getByRole('button', { name: /Go/i })
    fireEvent.click(button)
    expect(button).toHaveClass('btn')  
  });
    
  it('should render a disabled button', () => {
    render(
      <Button
        type='success'
        disabled='true'
        name='Go!'
      />
    );
    const buttonElement = screen.getByRole("button", { name: /Go/i});
    expect(buttonElement).toBeDisabled()
  });

  it('should button click event', () => {
    render(
      <Button
        type='success'
        onClick={mockedOnClick}
        name='Go!'
      />
    );
    const button = screen.getByRole('button', { name: /Go/i })
    fireEvent.click(button)
    expect(mockedOnClick.mock.calls.length).toEqual(1)  
  });

})