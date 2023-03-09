import React from 'react'
import { render, screen } from '@testing-library/react';

import { RJControls } from './RJControls'

describe('Componente RJAlert', () => {
  it('ver se mostra a mensagem de warning', () => {
    render(
      <RJControls.RJAlert
          severity="warning"
          title=""
          message="ola"
          >
      </RJControls.RJAlert>
    )

    expect(screen.getByText('ola')).toBeInTheDocument();
  })
})