import React from 'react';

import { RJControls } from '../../controls/RJControls';
import { DetalheItinerario } from './DetalheItinerario';

import { makeStyles } from '@mui/styles';

export const ModalItinerario = (props) => {
  const { listaItinerarios, isShowModal } = props;

  const useStyles = makeStyles(() => ({
    paper: { minWidth: 'fit-content' },
    centralizar: { textAlign: 'center' },
  }));

  const classes = useStyles();

  return (
    <>
      {isShowModal && (
        <RJControls.RJModal
          titulo="ITINERÁRIO"
          conteudo={
            <DetalheItinerario
              listaItinerarios={listaItinerarios}
            ></DetalheItinerario>
          }
          textoFecharModal="Fechar"
          textoConfirmaModal="Confirmar"
          isShowFecharModal={true}
          isShowConfirmarModal={false}
          classes={classes}
        ></RJControls.RJModal>
      )}
    </>
  );
};
