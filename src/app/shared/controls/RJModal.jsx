import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { RJControls } from './RJControls';

export const RJModal = (props) => {
  const [open, setOpen] = useState(true);

  const {
    titulo,
    conteudo,
    textoFecharModal,
    textoConfirmaModal,
    isShowFecharModal,
    isShowConfirmarModal,
    onClickCloseTitle,
    classes,
  } = props;

  function onHandleClose() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      // onClose={onHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes ? classes.paper : '' }}
      className={classes ? classes.centralizar : ''}
    >
      <DialogTitle
        style={{ textAlign: 'center', display: 'flex' }}
        onClose={onHandleClose}
      >
        {titulo}
        {onClickCloseTitle ? (
          <IconButton
            aria-label="close"
            onClick={onClickCloseTitle}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{conteudo}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {isShowFecharModal && (
          <RJControls.RJButton
            text={textoFecharModal}
            size="small"
            type="button"
            onClick={onHandleClose}
          />
        )}
        {isShowConfirmarModal && (
          <RJControls.RJButton
            text={textoConfirmaModal}
            size="small"
            type="button"
            onClick={onHandleClose}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
