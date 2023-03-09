import axios from 'axios';

export const URL_BLOQUEAR_POLTRONA =
  'api-gateway/bloqueiopoltrona/bloquearPoltrona';
export const URL_BUSCAR_CORRIDAS = 'api-gateway/consultacorrida/buscaCorrida';
export const URL_BUSCAR_ITINERARIO =
  'api-gateway/itinerario/buscarItinerarioCorrida';
export const URL_BUSCAR_MAPA_ONIBUS = 'api-gateway/consultaonibus/buscaOnibus';
export const URL_DESBLOQUEAR_POLTRONA =
  'api-gateway/desbloqueiopoltrona/desbloquearPoltrona';
export const URL_LOGIN = 'api-gateway/autenticacao/login';
export const URL_LOCALIDADES = 'api-gateway/localidade/buscarOrigenDestino/10';

const httpHeaders = {
  Authorization: 'Basic YXBpd2ViOndlYjEwMjAzMA==',
  'Content-Type': 'application/json',
  'Request-Target': 'rjapi',
};

async function getData(endpoint) {
  try {
    let res = await axios({
      url: endpoint,
      method: 'get',
      timeout: 8000,
      headers: httpHeaders,
    });
    if (res.status === 200) {
      console.log(res.status);
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export const pesquisarAninhada = async (endpoint) => {
  //const req = await axios.get(endpoint);
  const req = await axios({
    url: endpoint,
    method: 'get',
    timeout: 8000,
    headers: httpHeaders,
  });

  const json = req.data;
  return json;
};

export const pesquisar = async (endpoint, body = {}, params = {}) => {
  return await axios({
    url: endpoint,
    method: params.method,
    timeout: 15000,
    headers: httpHeaders,
    data: body,
  });
};

export const salvar = async (endpoint, params) => {
  return axios.get(endpoint);
};

export const excluir = async (endpoint, params) => {
  return axios.get(endpoint);
};

export const buscarMapaOnibus = async (endpoint, body = {}) => {
  return await axios({
    url: endpoint,
    method: 'post',
    timeout: 15000,
    headers: httpHeaders,
    data: body,
  });
};

export const bloquearPoltrona = async (endpoint, body = {}) => {
  return await axios({
    url: endpoint,
    method: 'post',
    timeout: 15000,
    headers: httpHeaders,
    data: body,
  });
};

export const desbloquearPoltrona = async (endpoint, body = {}) => {
  return await axios({
    url: endpoint,
    method: 'post',
    timeout: 15000,
    headers: httpHeaders,
    data: body,
  });
};

export const logar = async (endpoint, body = {}) => {
  return await axios({
    url: endpoint,
    method: 'post',
    timeout: 15000,
    headers: httpHeaders,
    data: body,
  });
};
