import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandlerService } from '../utils/http-error-handler.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../shared/interfaces/server-response';

@Injectable()
export class BaseService {
  constructor(public http: HttpClient, private errorHandler: HttpErrorHandlerService) {}

  get(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    },
  ): Observable<ServerResponse> {
    return this.http
      .get<ServerResponse>(url, options)
      // .pipe(tap(data => this.handleSuccessResponse, error => this.errorHandler.handleErrorResponse))
      .pipe(
        catchError(error => {
          return this.errorHandler.handleErrorResponse(error);
        }),
      );
  }

  post(
    url: string,
    body: any | null,
    options: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType: 'arraybuffer';
      withCredentials?: boolean;
    },
  ) {
    return this.http.post(url, body, options);
  }

  // handleSuccessResponse = (res: ServerResponse) =>
  //   !res.error && !res.warning ? res : this.errorHandler.handleCustomServerError(res);
}
