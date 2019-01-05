import { environment } from '../../../environments';

function createUrl(actionName: string): string {
    return `${environment.apiHost}api/${actionName}`;
  }
  function createAuthUrl(actionName: string): string {
    return `${environment.apiHost}${actionName}`;
  }

  export const appApiResources = {
    baseUrl: environment.apiHost,
    staticUploadsPath: `${environment.apiHost}Uploads/`,
    login: createAuthUrl('token'),
    register: createUrl('register'),
    error: createUrl('error'),
    dashBoard: createUrl('dashboard'),
  };
