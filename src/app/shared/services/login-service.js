import * as APIClient from '../../adapter/api/APIClient';

export const logar = async (body) => {
  return APIClient.logar(APIClient.URL_LOGIN, body);
};
