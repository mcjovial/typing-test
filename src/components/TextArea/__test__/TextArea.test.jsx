import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../TextArea';

const mockedOnChange = jest.fn();

describe("AddInput", () => {
  it('should render textarea element', () => {
    render(
      <TextArea
        defaultValue='Paste your'
        onChange={mockedOnChange}
      />
    );
    const inputElement = screen.getByText(/Paste your/i);
    expect(inputElement).toBeInTheDocument();
  });
    
  it('should be able to type into input', () => {
    render(
      <TextArea
        defaultValue='Paste your'
        onChange={mockedOnChange}
      />
    );
    const inputElement = screen.getByText(/Paste your/i);
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: "Go Grocery Shopping" } })
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });
})