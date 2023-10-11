import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App.jsx'
import { BrowserRouter } from 'react-router-dom'

describe('testing React Components', () => {
    
    beforeEach(() => {
        render(<BrowserRouter><App /></BrowserRouter>)
    })

    test('renders the Prefpage component for the "/" route', () => {
      const buttons = screen.getAllByRole('button');
      // console.log(buttons);
      expect(buttons.length).toEqual(2);
      console.log("buttons: ", buttons)
      expect(buttons[0]).toHaveClass('primary');
      expect(buttons[1]).toHaveClass('secondary');
      expect(screen.getByText('Findr')).toHaveClass('title');
    })
})