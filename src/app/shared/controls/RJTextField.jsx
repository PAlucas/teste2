import React from 'react';
import TextField from "@material-ui/core/TextField";

export const RJTextField = (props) => {
    const { onChange, label, name, id, variant, type, value, ...other } = props;

    return (
      <TextField
        label={label}
        id={id}
        name={name}
        onChange={onChange}
        variant={variant || 'outlined'}
        type={type || 'text'}
        {...other}
      />
    );
}