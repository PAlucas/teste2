import React, { useState } from 'react';

import { RJControls } from '../../controls/RJControls';

import AccountCircle from '@mui/icons-material/AccountCircle';
import { ModalLogin } from './ModalLogin';

export const Login = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModalLogin = () => {
    setIsShowModal(true);
  };

  const closeModalLogin = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <RJControls.RJButton
        text="Fazer Login"
        color="inherit"
        variant="outlined"
        type="submit"
        startIcon={<AccountCircle />}
        onClick={showModalLogin}
      />
      <ModalLogin
        isShowModal={isShowModal}
        closeModalLogin={() => closeModalLogin()}
      ></ModalLogin>
    </>
  );
};
