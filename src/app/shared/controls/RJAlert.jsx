import React from 'react'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const RJAlert = (props) => {

    const {severity, title, message} = props;

    return (
        <Alert severity={severity}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
    )
}
