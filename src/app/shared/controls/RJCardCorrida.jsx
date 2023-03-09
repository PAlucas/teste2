import React from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

import { Itinerario } from '../fragments/itinerario/Itinerario';
import { RJControls } from './RJControls';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const RJCardCorrida = (props) => {
  const {
    id,
    empresa,
    dataIda,
    dataChegada,
    horaIda,
    horaChegada,
    origem,
    destino,
    classe,
    poltronasLivres,
    preco,
    poltronasTotal,
    distancia,
    labelBotaoSelecionar,
    selecionarClick,
    filasPoltronas,
    servico,
    dataViagem,
    ...other
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 1 }} key={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={empresa}
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <QueryBuilderIcon />{' '}
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h9" color="red">
              {dataIda} - {horaIda}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              {origem}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              CLASSE
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              POLTRONAS LIVRES
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="h6" color="red">
              R$ {preco}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <RJControls.RJButton
              text={labelBotaoSelecionar}
              size="small"
              type="button"
              onClick={selecionarClick}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <QueryBuilderIcon />{' '}
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" color="text.secondary">
              {dataChegada} - {horaChegada}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              {destino}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="h6" color="text.secondary">
              {classe}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              {poltronasLivres}
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Itinerario
              dataViagem={dataViagem}
              servicoViagem={servico}
            ></Itinerario>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Distância
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Total de poltronas
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {distancia} Km
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {poltronasTotal}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
