import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';

import { RJControls } from '../../controls/RJControls';
import { MemoizedOnibus } from '../bus-estructure/Onibus';

import * as serviceMapaOnibus from '../../services/mapa-onibus-service';

const useStyles = makeStyles((theme) => ({
  resultContent: {
    padding: theme.spacing(1),
  },
}));

export const ListaCorridas = (props) => {
  const classes = useStyles();

  const [filasPoltronas, setFilasPoltronas] = useState([]);
  const [selectedCorrida, setSelectedCorrida] = useState(null);
  const [mapaPoltronas, setMapaPoltronas] = useState([]);

  const { origem, destino, listCorridas } = props;

  function convertDate(dataComTraco) {
    let dataSplit = dataComTraco.split('-');
    return dataSplit[2] + '/' + dataSplit[1] + '/' + dataSplit[0];
  }

  function selecionarViagem(corridaSelecionada) {
    if (!corridaSelecionada) console.log("Nenhuma corrida foi selecionada");

    let dataHoraCorrida = corridaSelecionada.dataCorrida;
    let dataCorrida = dataHoraCorrida.split(" ")[0];

    let servicoCorrida = parseInt(corridaSelecionada.servico);

    const bodyBuscarMapaOnibus = {
      data: dataCorrida,
      destino: corridaSelecionada.grupoDestinoId,
      origem: corridaSelecionada.grupoOrigemId,
      servico: servicoCorrida
    }

    serviceMapaOnibus
    .buscarMapaOnibus(bodyBuscarMapaOnibus)
    .then(dadosOnibus => {
      setMapaPoltronas(dadosOnibus.data.mapaPoltrona);

      createArrayFilasPoltronas(mapaPoltronas);
      setSelectedCorrida(corridaSelecionada);
    }).catch(error => {
      console.log("Erro: ");
      console.log(error.response.data.message);
    });
  }

  function createArrayFilasPoltronas(mapaPoltrona) {
    var posicaoX = mapaPoltrona[0].x;
    var numeroPoltronas = 1;
    var arryaFilasPoltronas = [];
    var novaFila = [];
    mapaPoltrona.map((item) => {
      var novaPosicaoX = item.x;

      if (posicaoX !== novaPosicaoX) {
        posicaoX = novaPosicaoX;
        numeroPoltronas = 1;
        arryaFilasPoltronas.push(novaFila.reverse());
        novaFila = [];
      }

      if (numeroPoltronas === 3) {
        var itemVazio;

        novaFila.push(itemVazio);
      }

      novaFila.push(item);
      numeroPoltronas++;
    });

    arryaFilasPoltronas.push(novaFila.reverse());
    setFilasPoltronas(arryaFilasPoltronas);
    // console.log(arryaFilasPoltronas);
  }

  return listCorridas.map((item, index) => (
    <>
      <Grid item xs={12} className={classes.resultContent} key={item.servico}>
        {' '}
        <RJControls.RJCardCorrida
          key={`${item.servico}-${index}`}
          empresa={item.empresa}
          dataIda={convertDate(item.saida.substring(0, 10))}
          horaIda={item.saida.substring(11, 16)}
          dataChegada={convertDate(item.chegada.substring(0, 10))}
          horaChegada={item.chegada.substring(11, 16)}
          origem={origem}
          destino={destino}
          classe={item.classe}
          poltronasLivres={item.poltronasLivres}
          poltronasTotal={item.poltronasTotal}
          distancia={item.km}
          preco={item.preco.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          })}
          labelBotaoSelecionar={'POLTRONAS'}
          selecionarClick={() => selecionarViagem(item)}
          servico={item.servico}
          dataViagem={item.saida.substring(0, 10)}
        />{' '}
        <Card sx={{ maxWidth: 1 }}>
          <MemoizedOnibus
            isShowOnibus={selectedCorrida === item}
            key={`${index}-${item.servico}`}
            corridaSelecionada={selectedCorrida}
            filasPoltronas={selectedCorrida === item ? filasPoltronas : null}
          ></MemoizedOnibus>
        </Card>
      </Grid>
    </>
  ));
};