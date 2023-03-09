import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const DetalheItinerario = (props) => {
  const { listaItinerarios } = props;

  return (
    <>
      <Grid container spacing={1} style={{ fontSize: '14px' }}>
        <Grid item xs={4}>
          <Typography variant="h9" color="green">
            CIDADE
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h9" color="green">
            PERMAN&Ecirc;NCIA
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h9" color="green">
            DIST&Acirc;NCIA
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h9" color="green">
            HORA
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ fontSize: '12px' }}>
        {listaItinerarios.map((itemItinerario) => (
          <Box
            key={itemItinerario.localidade.id}
            sx={{
              display: 'contents',
            }}
          >
            <Grid item xs={4}>
              <Typography variant="h9" color="text.secondary">
                {itemItinerario.localidade.cidade}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h9" color="text.secondary">
                {itemItinerario.permanencia}hs
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h9" color="text.secondary">
                {itemItinerario.distancia}km
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h9" color="text.secondary">
                {itemItinerario.hora}hs
              </Typography>
            </Grid>
          </Box>
        ))}
      </Grid>
    </>
  );
};
