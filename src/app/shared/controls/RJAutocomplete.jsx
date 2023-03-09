import React from 'react'

import { Autocomplete, TextField } from '@mui/material';


export const RJAutocomplete = (props) => {

    const { name, label, value, error=null, onChange, options } = props;

    const defaultProps = {
        options: {options},
        getOptionLabel: (option) => option.label,
      };

      return (
        <Autocomplete
          disablePortal
          id={name}
          value={value}
          onChange={onChange}
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      );
    }
    
    





