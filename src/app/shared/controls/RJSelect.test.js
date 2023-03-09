import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';

import { RJControls } from './RJControls'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';

let theme = createTheme();

describe('Componente RJSelect', () => {
  it('ver se componente está renderizando', () => {
    let component = render(mockRJSelect);

    expect(component).toBeTruthy();
  });

  it('ver se os elementos select, label, input e svg estão visíveis no componente', () => {
    render(mockRJSelect);

    const { container } = render(mockRJSelect);

    let nameInput = 'origem';
    let valueInput = 'origem';

    let select = container.querySelector(`#mui-component-select-${nameInput}`);
    let label = screen.getAllByText('Saindo de');
    let input = container.querySelector(".MuiSelect-nativeInput");    
    let svg = container.querySelector(".MuiSelect-icon");    

    expect(label).toBeTruthy();
    expect(select).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(valueInput);
    expect(svg).toBeInTheDocument(); 
  });

  it('ver se select foi clicado e uma opção foi selecionada', () => {
    render(mockRJSelect);

    const { container } = render(mockRJSelect);
    
    let nameInput = 'origem';
    let select = container.querySelector(`#mui-component-select-${nameInput}`);
    let textSelected = defaultProps.options[0].title;

    // Abrir e click
    fireEvent.mouseDown(select);
    fireEvent.click(screen.getByText(textSelected));
  });

});

let listOptions = [
  {
    id: Math.random() * 10,
    title: 'BELO HORIZONTE (MG)'
  },
  {
    id: Math.random() * 10,
    title: 'CONTAGEM (MG)'
  },
  {
    id: Math.random() * 10,
    title: 'PORTO ALEGRE (RS)'
  },
  {
    id: Math.random() * 10,
    title: 'SANTA MARIA (RS)'
  }
];

const defaultProps = {
  label: 'Saindo de',
  name: 'origem',
  value: 'origem',
  options: listOptions,
  onChangeSelected: value => {
    defaultProps.value = value;
  }
}

let mockRJSelect = (
  <ThemeProvider theme={theme}>
    <RJControls.RJSelect
      label="Saindo de"
      name={defaultProps.name}
      value={defaultProps.value}
      options={defaultProps.options}
      onChange={defaultProps.onChangeSelected}
    />
  </ThemeProvider>
);


// TODO: função onChange, conteúdo/tamanho lista options