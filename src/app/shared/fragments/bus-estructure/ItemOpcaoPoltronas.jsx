import React from 'react';

import Box from '@mui/material/Box';

import './BusEstructure.css';

export const ItemOpcaoPoltrona = (props) => {
  const { classe, tipoPoltrona } = props;

  return (
    <>
      <Box
        className={'label-bus'}
        sx={{
          width: 1 / 4,
        }}
      >
        <Box className={`bus-seat poltrona-${classe}`} label="0">
          <label>&nbsp;&nbsp;</label>
        </Box>
        <label>{tipoPoltrona}</label>
      </Box>
    </>
  );
};
