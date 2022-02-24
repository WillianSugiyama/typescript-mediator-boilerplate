import 'reflect-metadata';
import { handler as apiHandler } from './api/api-handler';

/*
  API HANDLER AND MESSAGE HANDLER STAY HERE !
*/

export const handler = async () => {
  return await apiHandler();
};
