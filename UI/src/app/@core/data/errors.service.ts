import 'rxjs/add/observable/of';

import * as StackTraceGPS from 'stacktrace-gps';
import * as StackTraceParser from 'error-stack-parser';
import * as moment from 'moment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { NbTokenLocalStorage } from '@nebular/auth';
import { appApiResources } from '../../shared/constants/api.contants';

// Cool library to deal with errors: https://www.stacktracejs.com

@Injectable()
export class ErrorsService {
  constructor(private injector: Injector, private http: HttpClient, private localStorage: NbTokenLocalStorage) {}

  async log(error: Error) {
    const parsedStackInfo = await this.parseErrorStack(error);
    const errorToSend = this.addContextInfo(error, parsedStackInfo);

    // Log the error to the console
    console.error(error);

    // Send error to server
    return this.http.post(appApiResources.error, errorToSend).toPromise();
  }

  addContextInfo(error: Error, parsedStackInfo) {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const errorName: string = error.name || null;
    const appId: string = '';
    const user: AuthLocalstoragePayload = this.localStorage.get().getPayload();
    const { id, email, name } = user;
    const time: string = moment.utc().toISOString();
    const location = this.injector.get(LocationStrategy);
    const url: string = location instanceof PathLocationStrategy ? location.path() : '';
    // const status: number = error.status || null;
    const message: string = error.message || error.toString();
    const stackFrames = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    return {
      errorName,
      appId,
      name,
      email,
      id,
      time,
      url,
      message,
      stackFrames,
      parsedStackInfo,
      originalErrorStack: JSON.stringify(error.stack),
    };
  }

  async parseErrorStack(error: any) {
    /*
     * Parse error to parses and extracts function names, URLs, line numbers, and column numbers from
     * the given Error's stack as an Array of StackFrames.
     * More Info: https://www.stacktracejs.com/#!/docs/error-stack-parser
     */
    const parsedStackedFrames: any[] = StackTraceParser.parse(error);
    const stackFrame = parsedStackedFrames[0];


    /*
     * Better location/name information from source maps with stacktrace-gps
     * More Info: https://www.stacktracejs.com/#!/docs/stacktrace-gps
     */
    let errorMappedLocation: ParsedClientErrorStack,
      errorPinpoint: ParsedClientErrorStack,
      errorFunctionName: ParsedClientErrorStack;
    const gps = new StackTraceGPS();
    try {
      errorMappedLocation = await gps.getMappedLocation(stackFrame);
    } catch (error) {
      errorMappedLocation.isFailedToParse = true;
      errorMappedLocation.parseFailedStack = error.toString();
    }

    try {
      errorPinpoint = await gps.pinpoint(stackFrame);
    } catch (error) {
      errorPinpoint.isFailedToParse = true;
      errorPinpoint.parseFailedStack = error.toString();
    }

    try {
      errorFunctionName = await gps.findFunctionName(stackFrame);
    } catch (error) {
      errorFunctionName.isFailedToParse = true;
      errorFunctionName.parseFailedStack = error.toString();
    }
    return { errorMappedLocation, errorPinpoint, errorFunctionName };
    /*
     * Sourcemapped stacktrace:
     * https://stackoverflow.com/questions/42095429/error-stacktrace-with-angular-2-and-webpack-2#answer-42160797
     * More Info: https://github.com/novocaine/sourcemapped-stacktrace
     */
    // pass e.stack to window.mapStackTrace
    // SourcemappedStacktrace.mapStackTrace(error.stack, function (mappedStack) {
    //   // do what you want with mappedStack here
    //   console.log('mapStackTrace',mappedStack.join("\n"));
    // });
  }
}
