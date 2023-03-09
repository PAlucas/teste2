import React from 'react';

import { DetalheLogin } from './DetalheLogin';
import { RJControls } from '../../controls/RJControls';

import { makeStyles } from '@mui/styles';

export const ModalLogin = (props) => {
  const { isShowModal, closeModalLogin } = props;

  const useStyles = makeStyles(() => ({
    paper: { minWidth: '40%' },
    centralizar: { textAlign: 'center' },
  }));

  const classes = useStyles();

  return (
    <>
      {isShowModal && (
        <RJControls.RJModal
          titulo={'Faça seu login!'}
          conteudo={
            <DetalheLogin
              isLoginByEmail={false}
              closeModal={() => closeModalLogin()}
            ></DetalheLogin>
          }
          textoFecharModal="Fechar"
          textoConfirmaModal="Confirmar"
          classes={classes}
          isShowCloseTitle={true}
          onClickCloseTitle={() => closeModalLogin()}
        ></RJControls.RJModal>
      )}
    </>
  );
};
