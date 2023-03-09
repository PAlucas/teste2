import React from 'react';

import { Poltrona } from './Poltrona';
import './BusEstructure.css';

export const FilaPoltronas = (props) => {
  const { filaPoltronas, corridaSelecionada } = props;

  return (
    <>
      <div className={'bus-line'}>
      {filaPoltronas.map((itemPoltrona, index) =>
          itemPoltrona ? (
            <Poltrona
              key={index}
              id={`poltrona-${itemPoltrona.numero}`}
              corridaSelecionada={corridaSelecionada}
              classe={itemPoltrona.disponivel && (itemPoltrona.numero != 'WC' && itemPoltrona.numero != 'ES' && itemPoltrona.numero != 'CF') ? 'libre' : 'ocupada'}
              numero={itemPoltrona.numero}
            ></Poltrona>
          ) : (
            <Poltrona
              key={index}
              id={`poltrona-vazia`}
              classe={'vacia'}
              numero={''}
            >
              {' '}
            </Poltrona>
          )
          
        )}  
      </div>
    </>
  );
};
