import React from 'react'

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';

export const RJButtonSearch = () => {
    return (
        <IconButton color="primary" aria-label="upload picture" component="span" type="submit" >
          <SearchIcon />
        </IconButton>
    )
}
