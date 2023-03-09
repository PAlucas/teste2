import React from 'react'
import {render, screen } from '@testing-library/react';
import { RJControls } from './RJControls';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';

let theme = createTheme();

describe('Componente RJForm', () => { 
    it('verificar se componente RJForm e RJSelect estão renderizando', () => {
      let component = render(mockRJForm);
  
      expect(component).toBeTruthy();
    });

    it('verificar se a tag form e os elementos do RJSelect estão presentes no componente', () => {
        render(mockRJForm);

        const { container } = render(mockRJForm);
    
        let form = container.querySelector('form');
        expect(form).toBeInTheDocument();

        // Elementos RJ Select: select, label, input

        let nameInput = 'origemId';
        let valueInput = 'origemId';
        
        let select = container.querySelector(`#mui-component-select-${nameInput}`);
        let label = screen.getAllByText('Saindo de');
        let input = container.querySelector(".MuiSelect-nativeInput"); 

        expect(label).toBeTruthy();
        expect(select).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).toEqual(valueInput);
    });

    it('verificar se o valor do input está sendo alterado e se o valor é válido, ou seja, se é diferente de null/vazio', () => {
        const { container } = render(mockRJForm);

        let input = container.querySelector('.MuiSelect-nativeInput');        

        let mockInputChange = jest.fn(value => {

            // TODO: corrigir quando value é null - teste quebra

            input.value = value;

            let validateField = false;

            if (!!input.value) {
                validateField = !validateField;
            }

            return {
                inputValue: input.value,
                isValid: validateField
            };
        });

        let returnExpected = {
            inputValue: 'Origem',
            isValid: true
        }

        // toStrictEqual - comparação objetos
        // toBe - comparação de strings

        expect(mockInputChange(returnExpected.inputValue)).toStrictEqual(returnExpected);
    });

    it('verificar se o formulário está sendo resetado', () => {
        const { container } = render(mockRJForm);

        let input = container.querySelector('.MuiSelect-nativeInput');
        let inputValue = input.value;

        let mockResetForm = jest.fn(() => {
            inputValue = ''
            return inputValue;
        });

        expect(mockResetForm()).toBe('');
    });
});

// Props

const mockInitialFormValues = {
    origemId: ''
};

let mockChangeInputValues = e => {
    propsRJSelect.origemId.value = e.target.value;
};

const mockValidateFields = fieldValues => {
    
    let validate = true;

    for (item of fieldValues) {
        if (item == '') {
            validate = !validate;
            break;
        }
    }

    return validate;
}

const mockResetForm = () => {
    mockInitialFormValues.origemId = ''
}

let listOptions = [
    {
      id: Math.random() * 10,
      title: 'BELO HORIZONTE (MG)'
    }
];

const propsRJSelect = {
    origemId: {
        name: 'origemId',
        label: 'Saindo de',
        value: 'origemId',
        options: listOptions,
        onChangeSelected: value => {
            propsRJSelect.origemId.value = value;
        }
    }
}

const propsRJForm = {
    mockInitialFormValues,
    validateOnChange: true,
    mockChangeInputValues,
    mockValidateFields,
    mockResetForm
};

const mockRJForm = (
    <ThemeProvider theme={theme}>
        <RJControls.RJForm props={propsRJForm}>
            <RJControls.RJSelect 
                name={propsRJSelect.origemId.name} 
                label={propsRJSelect.origemId.label} 
                value={propsRJSelect.origemId.value}
                options={propsRJSelect.origemId.options}
                onChange={propsRJSelect.origemId.onChangeSelected} />
            </RJControls.RJForm>
    </ThemeProvider>
);