import * as APIClient from '../../adapter/api/APIClient';

export const bloquearPoltrona = async (body) => {
  return APIClient.bloquearPoltrona(APIClient.URL_BLOQUEAR_POLTRONA, body);
};
