import React, { useState } from 'react';

import Box from '@mui/material/Box';

import * as serviceDesbloquearPoltrona from '../../services/desbloquear-poltrona-service';
import { RJControls } from '../../controls/RJControls';
import './BusEstructure.css';

export const Poltrona = (props) => {
  const { id, classe, onClick, numero, corridaSelecionada } = props;

  const [exibirModalPoltrona, setExibirModalPoltrona] = useState(false);
  const [statusPoltrona, setStatusPoltrona] = useState('libre');
  const [transacao, setTransacao] = useState('');

  const verificarStatusPoltrona = (statusPoltrona) => {
    if (statusPoltrona === 'libre') {
      setExibirModalPoltrona(true);
    } else if (statusPoltrona === 'ocupada') {
      if (transacao) {
        const bodyDesbloqueioPoltrona = {
          transacao: transacao,
        };

        serviceDesbloquearPoltrona
          .desbloquearPoltrona(bodyDesbloqueioPoltrona)
          .then((dadosResponse) => {
            console.log('Retorno - Desbloqueio poltrona: ');
            console.log(dadosResponse);

            setStatusPoltrona('libre');
          })
          .catch((error) => {
            console.log('Erro ao desbloquear a poltrona: ');
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <RJControls.RJModalPoltrona
        setarTransacao={setTransacao}
        setarPoltronaOcupada={() => setStatusPoltrona('ocupada')}
        statusPoltrona={statusPoltrona}
        corridaSelecionada={corridaSelecionada}
        fecharModal={() => setExibirModalPoltrona(false)}
        exibirModalPoltrona={exibirModalPoltrona}
        numeroPoltrona={numero}
      />
      <Box
        id={id}
        onClick={() => {
          verificarStatusPoltrona(statusPoltrona);
        }}
        className={'bus-seat poltrona-' + statusPoltrona}
      >
        <label>{numero}</label>
      </Box>
    </>
  );
};
