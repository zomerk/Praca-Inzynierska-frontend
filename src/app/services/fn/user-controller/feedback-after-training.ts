/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Feedback } from '../../models/feedback';

export interface FeedbackAfterTraining$Params {
  trainingId: number;
      body: Feedback
}

export function feedbackAfterTraining(http: HttpClient, rootUrl: string, params: FeedbackAfterTraining$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, feedbackAfterTraining.PATH, 'post');
  if (params) {
    rb.query('trainingId', params.trainingId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

feedbackAfterTraining.PATH = '/user/feedback';