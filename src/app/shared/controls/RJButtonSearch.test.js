import React from 'react'
import { render } from '@testing-library/react';

import { RJControls } from './RJControls'

describe('Componente RJButtonSearc', () => {
  
  it('ver se mostra o botao com o icone correspondente', () => {
    const { container } =  render(<RJControls.RJButtonSearch/>)
    
    expect(container.querySelector('[data-testid="SearchIcon"]')).toBeInTheDocument();

  })
})