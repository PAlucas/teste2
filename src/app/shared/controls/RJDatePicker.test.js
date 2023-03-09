import React from 'react';
import { render, screen } from '@testing-library/react';

import { RJControls } from './RJControls';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
const theme = createTheme();

describe('Componente RJDatePicker', () => {
  it('ver se componente redenriza corretamente', () => {
    var component = render(mockRJDatePicker);

    expect(component).toBeTruthy();
  });

  it('ver a label setada do component', () => {
    render(mockRJDatePicker);

    const labelTest = screen.getAllByText('First date');
    expect(labelTest).toHaveLength(2);
  });

  it('ver se o value da data corresponde a data setada', () => {
    render(mockRJDatePicker);

    expect(screen.getByDisplayValue('11/01/2022')).toBeInTheDocument();
  });

  it('ver se formato da data está correto', () => {
    render(mockRJDatePicker);

    const regexFormatDate =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    var dataAtual = screen.getByLabelText(/Choose date/i).value;

    expect(dataAtual).toMatch(regexFormatDate);
  });
});

const defaultProps = {
  label: 'First date',
  name: 'firstTesteDate',
  value: new Date(2022, 0, 11),
};

const mockRJDatePicker = (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RJControls.RJDatePicker {...defaultProps} />
    </LocalizationProvider>
  </ThemeProvider>
);
