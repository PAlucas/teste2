import React from 'react';

import Box from '@mui/material/Box';

import { ItemOpcaoPoltrona } from './ItemOpcaoPoltronas';
import './BusEstructure.css';

export const OpcaoPoltronas = (props) => {
  return (
    <>
      <Box
        sx={{
          width: 1,
          display: 'flex',
        }}
      >
        <ItemOpcaoPoltrona
          classe="libre"
          tipoPoltrona="Poltrona Livre"
        ></ItemOpcaoPoltrona>
        <ItemOpcaoPoltrona
          classe="ocupada"
          tipoPoltrona="Poltrona Ocupada"
        ></ItemOpcaoPoltrona>
        <ItemOpcaoPoltrona
          classe="seleccionada"
          tipoPoltrona="Poltrona Selecionada"
        ></ItemOpcaoPoltrona>
        <ItemOpcaoPoltrona
          classe="libre poltrona-feminina"
          tipoPoltrona="Poltrona Feminina"
        ></ItemOpcaoPoltrona>
      </Box>
    </>
  );
};
