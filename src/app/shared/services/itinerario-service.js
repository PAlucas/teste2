import * as APIClient from '../../adapter/api/APIClient';

export const pesquisarItinerario = async (body) => {
  return APIClient.pesquisar(APIClient.URL_BUSCAR_ITINERARIO, body, {
    method: 'post',
  });
};
