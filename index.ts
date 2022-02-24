import 'reflect-metadata';
import { container } from './src/infrastructure/configurations/container';
import { ProcessHttpRequest } from './src/interface/api/process-http-request';

export const handler = async () => {
  container.get(ProcessHttpRequest).run();
};

handler();
