import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom"
import ItemList from '../ItemList';


const MockItemList = ({ name, data, symble, ...rest }) => {
  return (
      <BrowserRouter>
        <ItemList 
          name={name}
          data={data}
        />
      </BrowserRouter>
  )
}

describe("AddInput", () => {
  it('should contain span tag with correct text', () => {
    render(
      <MockItemList 
        name='CPM'
        data='50'
      />
    );
    const smallElement = screen.getByText(/50/i);
    expect(smallElement).toContainHTML('span');
  });

  it('should render correct text content', () => {
    render(
      <MockItemList 
        name='CPM'
        data='50'
      />
    ); 
    const element = screen.getByText(/50/i);
    expect(element).toHaveTextContent('50');
    expect(element).toBeVisible();
  });
})