/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageTrainer } from '../../models/page-trainer';

export interface GetUnverifiedTrainers$Params {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
}

export function getUnverifiedTrainers(http: HttpClient, rootUrl: string, params?: GetUnverifiedTrainers$Params, context?: HttpContext): Observable<StrictHttpResponse<PageTrainer>> {
  const rb = new RequestBuilder(rootUrl, getUnverifiedTrainers.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sortBy', params.sortBy, {});
    rb.query('sortDir', params.sortDir, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageTrainer>;
    })
  );
}

getUnverifiedTrainers.PATH = '/admin/unverified';