import * as APIClient from "../../adapter/api/APIClient";

export const buscarMapaOnibus = async (body) => {
  return APIClient.buscarMapaOnibus(APIClient.URL_BUSCAR_MAPA_ONIBUS, body);
};
