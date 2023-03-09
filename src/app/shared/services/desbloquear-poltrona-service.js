import * as APIClient from '../../adapter/api/APIClient';

export const desbloquearPoltrona = async (body) => {
  return APIClient.desbloquearPoltrona(APIClient.URL_DESBLOQUEAR_POLTRONA, body);
};
