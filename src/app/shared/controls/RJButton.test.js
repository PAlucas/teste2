import React from 'react'
import { render, screen } from '@testing-library/react';

import { RJControls } from './RJControls'

describe('Componente RJButton', () => {
  
  it('ver se mostra o botao com o texto informado', () => {
    render(
        <RJControls.RJButton
          text="Buscar"
          size="small"
          type="submit"
      />
    )

    expect(screen.getByText('Buscar')).toBeInTheDocument();
  })
})