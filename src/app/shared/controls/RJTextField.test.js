import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';

import { RJControls } from './RJControls'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';

let theme = createTheme();

describe('Componente RJTextField', () => {
  it('ver se componente está renderizando', () => {
    let component = render(mockRJTextField);

    expect(component).toBeTruthy();
  });

  it('ver se os elementos label, input, fieldset e legend estão visíveis no componente', () => {
    render(mockRJTextField);

    const { container } = render(mockRJTextField);

    let label = screen.getAllByText('Nome');
    let input = container.getElementsByTagName("input")[0];
    let fieldset = container.getElementsByTagName("fieldset")[0];    
    let legend = container.getElementsByTagName("legend")[0];    
    
    expect(label).toBeTruthy();
    expect(input).toBeInTheDocument();
    expect(fieldset).toBeInTheDocument(); 
    expect(legend).toBeInTheDocument(); 
  });

  it('verificar se a função onChange do input está sendo chamada e se o valor do input está sendo alterado conforme as mudanças do usuário', () => {
    render(mockRJTextField);

    const { container } = render(mockRJTextField);

    let input = container.getElementsByTagName("input")[0];
    let valueInput = 'Nome teste';

    fireEvent.change(input, {target: {value: 'Nome teste'}});

    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(valueInput);
  });

});

const defaultProps = {
    label: 'Nome',
    id: 'nome',
    name: 'nome',
    value: 'Teste',
    onChangeTextField: value => {
        defaultProps.value = value;
    },
    variant: 'outlined',
    type: 'text'
}

const mockRJTextField = (
  <ThemeProvider theme={theme}>
    <RJControls.RJTextField
        label={defaultProps.label}
        id={defaultProps.id}
        name={defaultProps.name}
        onChange={defaultProps.onChangeTextField}
        variant={defaultProps.variant}
        type={defaultProps.type}
    />
  </ThemeProvider>
);


// TODO: função onChange, conteúdo/tamanho lista options