import React from 'react'
import { render, screen } from '@testing-library/react';

import { RJControls } from './RJControls'


const tipoTrechos = [
  { id: 'iv', label: 'Ida e Volta' },
  { id: 'si', label: 'Somente Ida' },
]

const tipoTrechoId = '';

const handleInputChangeTrecho = e => {
  handleInputChange(e);
  isIdaVolta = e.target.value === 'iv';
}

describe('Componente RJAutocomplete', () => {
    it('ver se mostra o titulo e o placeholder', () => {
        render(
          <RJControls.RJAutocomplete
              name="tipoTrechoId"
              label="Trecho"
              value={tipoTrechoId}
              onChange={handleInputChangeTrecho}
              options={tipoTrechos}
              >
          </RJControls.RJAutocomplete>
        )
    
        expect(screen.getByLabelText('Trecho')).toBeInTheDocument();
        
      })


      it('ver se existe a caixa de texto para filtrar a lista', () => {
        render(
          <RJControls.RJAutocomplete
              name="tipoTrechoId"
              label="Trecho"
              value={tipoTrechoId}
              onChange={handleInputChangeTrecho}
              options={tipoTrechos}
              >
          </RJControls.RJAutocomplete>
        )

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
      })
})