import React from 'react';

import Box from '@mui/material/Box';

import { FilaPoltronas } from './FilaPoltronas';
import { OpcaoPoltronas } from './OpcaoPoltronas';
import './BusEstructure.css';

export const Onibus = (props) => {
  const { filasPoltronas, isShowOnibus, corridaSelecionada } = props;

  return (
    <>
      {isShowOnibus && (
        <>
          <Box
            sx={{
              width: 1,
              padding: '1em',
            }}
          >
            <OpcaoPoltronas></OpcaoPoltronas>
          </Box>

          <Box
            sx={{
              width: 1,
              padding: '2% 7%',
              display: 'flex',
            }}
          >
            <Box
              className={'bus-front'}
              sx={{
                width: '16%',
              }}
            ></Box>
            <Box
              className={'bus-middle'}
              sx={{
                width: '75%',
              }}
            >
              <Box className={'bus-seats'}>
                {filasPoltronas.map((item, index) => (
                  <FilaPoltronas
                    key={index}
                    filaPoltronas={item}
                    corridaSelecionada={corridaSelecionada}
                  ></FilaPoltronas>
                ))}
              </Box>
            </Box>
            <Box
              className={'bus-back'}
              sx={{
                width: '8%',
              }}
            ></Box>
          </Box>
        </>
      )}
    </>
  );
};

function moviePropsAreEqual(prevMovie, nextMovie) {
  return prevMovie.isShowOnibus;
}

export const MemoizedOnibus = React.memo(Onibus, moviePropsAreEqual);
