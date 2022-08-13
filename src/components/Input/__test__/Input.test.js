import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

const mockedOnChange = jest.fn();

describe("AddInput", () => {
  it('should render input element', () => {
    render(
      <Input
        size='4'
        list='time'
        name='challenge_time'
        placeholder='Minutes'
        onChange={mockedOnChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Minutes/i);
    expect(inputElement).toBeInTheDocument();
  });
    
  it('should be able to type into input', () => {
    render(
      <Input
        size='4'
        list='time'
        name='challenge_time'
        placeholder='Minutes'
        onChange={mockedOnChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Minutes/i);
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } })
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });
})