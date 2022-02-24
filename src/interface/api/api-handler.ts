import 'reflect-metadata';
import { container } from '../../infrastructure/configurations/container';

import { ProcessHttpRequest } from './process-http-request';

export const handler = async () => {
  container.get(ProcessHttpRequest).run();
};
