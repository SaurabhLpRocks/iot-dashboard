import { appVariables } from '../constants/app.constants';

export class NgxError {
  constructor() {
    this.error = appVariables.defaultServerError.error;
    this.message = appVariables.defaultServerError.message;
  }
  error: string;
  warning?: string;
  message: string;
}
