import React, { useState, useEffect } from 'react';

import moment from 'moment';

import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Corridas } from '../corridas/Corridas';
import { RJControls } from '../../controls/RJControls';

import * as service from '../../services/localidade-service';
import * as serviceCorridas from '../../services/corridas-services';

let isIdaVolta = null;
let isJaEscolheuIda = false;
let hasPesquisa = false;

const initialFormValues = {
  tipoTrechoId: '',
  origemId: '',
  destinoId: '',
  dataIda: null,
  dataRetorno: null,
};

const tipoTrechos = [
  { id: 'iv', title: 'Ida e Volta' },
  { id: 'si', title: 'Somente Ida' },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  resultContent: {
    padding: theme.spacing(1),
  },
}));

export const BarraPesquisaTrecho = () => {
  const classes = useStyles();
  const [trechos, setTrechos] = useState([]);
  const [origens, setOrigens] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [corridasIda, setCorridasIda] = useState([]);
  const [corridasVolta, setCorridasVolta] = useState([]);

  const [isNovaPesquisa, setIsNovaPesquisa] = useState([]);

  const [origem, setOrigem] = useState([]);
  const [destino, setDestino] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = React.useState(false);

  const ordenarOrigemDestino = (listaOptions) => {
    listaOptions.sort((primeiroItem, segundoItem) => {
      if (primeiroItem.title && segundoItem.title) {
        return primeiroItem.title < segundoItem.title ? -1 : 
        primeiroItem.title > segundoItem.title ? 1 : 
        0;
      }
    });
  }

  useEffect(() => {
    ordenarOrigemDestino(origens);
  }, [origens]);

  useEffect(() => {
    ordenarOrigemDestino(destinos);
  }, [destinos]);

  const validate = (fieldValues = values) => {
    console.log(fieldValues);

    let temp = { ...errors };

    console.log(temp);

    if ('tipoTrecho' in fieldValues)
      temp.trecho = fieldValues.trecho
        ? ''
        : 'Campo Tipo Trecho é obrigatório.';
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    RJControls.useRJForm(initialFormValues, true, validate);

  useEffect(() => {
    setAlert(false);
    setLoading(true);
    service
      .pesquisarLocalidades()
      .then((resp) => {
        setTrechos(resp.data);
        setOrigens(resp.data.map(preencherLocalidadeByTrechoCallback));
        setLoading(false);
      })
      .catch((error) => {
        console.log('Ocorreu um erro ao buscar os trechos');
        console.log(error);
        setAlert(true);
        setAlertMessage(error);
        setAlertMessage('Ocorreu um erro ao buscar os trechos.');
        setLoading(false);
      });
  }, []);

  function preencherLocalidadeByTrechoCallback(value) {
    return { id: value.origem.id, title: value.origem.cidade };
  }

  function preencherLocalidadeCallback(value) {
    return { id: value.id, title: value.cidade };
  }

  function convertDateToString(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  function filtrarLocalidadeCallback(trecho) {
    return trecho.origem.id === values.origemId;
  }

  function filtrarDestinoCallback(trecho) {
    return trecho.id === values.destinoId;
  }

  function extrairDestinos() {
    let listDestinos = trechos.filter(filtrarLocalidadeCallback);
    if (listDestinos[0]) {
      setOrigem(listDestinos[0].origem);
      listDestinos = listDestinos[0].destinos.map(preencherLocalidadeCallback);
      setDestinos(listDestinos);
    }
  }

  const handleInputChangeOrigem = (e) => {
    const { value } = e.target;
    values.origemId = value;
    extrairDestinos();
  };

  const handleInputChangeDestino = (e) => {
    const { value } = e.target;
    values.destinoId = value;
    const destinoFiltrado = destinos.filter(filtrarDestinoCallback);
    if (destinoFiltrado[0]) {
      setDestino(destinoFiltrado[0].title);
    }
  };

  const handleInputChangeTrecho = (e) => {
    handleInputChange(e);
    isIdaVolta = e.target.value === 'iv';
  };

  const onClickPesquisarIda = (e) => {
    e.preventDefault();
    isIdaVolta = values.tipoTrechoId === 'iv';
    isJaEscolheuIda = false;

    const reqApiBody = {
      data: convertDateToString(values.dataIda),
      destino: values.destinoId,
      origem: values.origemId,
      volta: false,
    };

    pesquisar(reqApiBody);
  };

  function pesquisar(reqApiBody) {
    setAlert(false);
    setLoading(true);
    serviceCorridas
      .pesquisarCorridas(reqApiBody)
      .then((data) => {
        hasPesquisa = true;
        console.log(data.data.lsServicos);
        if (reqApiBody.volta) {
          setCorridasVolta(data.data.lsServicos);
          setIsNovaPesquisa(true);
        } else {
          setCorridasIda(data.data.lsServicos);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setAlert(true);
        setAlertMessage(err.response.data.message);
        setAlertMessage(
          'Desculpe, não há passagens disponíveis para esta data. Faça uma nova busca para viajar.'
        );

        if (reqApiBody.volta) {
          setCorridasVolta([]);
        } else {
          setCorridasIda([]);
        }

        setLoading(false);
      });
  }

  const onClickPesquisarVolta = (e) => {
    e.preventDefault();

    isJaEscolheuIda = true;

    if (!isIdaVolta) {
      return;
    }

    const reqApiBody = {
      data: convertDateToString(values.dataRetorno),
      destino: values.origemId,
      origem: values.destinoId,
      volta: true,
    };

    pesquisar(reqApiBody);
  };

  return (
    <Paper className={classes.pageContent}>
      <RJControls.RJForm>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          justify={'space-evenly'}
        >
          <Grid item xs={12}>
            <RJControls.RJSelect
              name="tipoTrechoId"
              label="Trecho"
              value={values.tipoTrechoId}
              onChange={handleInputChangeTrecho}
              options={tipoTrechos}
              error={errors.tipoTrecho}
            />

            <RJControls.RJSelect
              name="origemId"
              label="Saindo de"
              value={values.origemId}
              onChange={handleInputChangeOrigem}
              options={origens}
              error={errors.trecho}
            />

            <RJControls.RJSelect
              name="destinoId"
              label="Chegando em"
              value={values.destinoId}
              onChange={handleInputChangeDestino}
              options={destinos}
              error={errors.trecho}
            />

            <RJControls.RJDatePicker
              name="dataIda"
              label="Data de ida"
              margin="normal"
              value={values.dataIda}
              onChange={handleInputChange}
              dateMin={new Date()}
            />

            <RJControls.RJDatePicker
              name="dataRetorno"
              label="Data de volta"
              margin="normal"
              value={values.dataRetorno}
              onChange={handleInputChange}
              dateMin={values.dataIda ? values.dataIda : new Date()}
            />

            <RJControls.RJButton
              text="Buscar"
              size="small"
              type="submit"
              onClick={onClickPesquisarIda}
            />
          </Grid>
        </Grid>
        <Grid container>
          {<RJControls.RJLoading open={loading} />}

          {alert ? (
            <RJControls.RJAlert
              severity="warning"
              title=""
              message={alertMessage}
            ></RJControls.RJAlert>
          ) : (
            <></>
          )}

          {hasPesquisa && (
            <Corridas
              origem={origem}
              destino={destino}
              corridasIda={corridasIda}
              isNovaPesquisa={isNovaPesquisa}
              corridasVolta={corridasVolta}
              selecionarClick={onClickPesquisarVolta}
              hasVolta={isIdaVolta}
            ></Corridas>
          )}
        </Grid>
      </RJControls.RJForm>
    </Paper>
  );
};
