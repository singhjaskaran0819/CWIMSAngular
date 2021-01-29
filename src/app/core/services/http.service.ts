import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private API_SERVER = environment.apiUrl;
  headers = new HttpHeaders({
    // "authorization": sessionStorage.getItem("token")
  });

  constructor(private httpClient: HttpClient) {
    this.handleError = this.handleError.bind(this)
  }

  handleError(error: HttpErrorResponse) {

    LoaderService.hideLoader();
    let errorMessage;
    if (error.status === 0) {
      errorMessage = "Network Error";
    }
    return throwError(error.error ? error.error.errors : {});
  }

  public getData(apiPath: string, data?: any) {
    let url = this.API_SERVER;
    return this.httpClient.get<any>(`${url}${apiPath}`, { params: data })
  }

  public postData(apiPath: string, data?: any) {
    if (apiPath.includes('forgot-password')) {
      return this.httpClient.post<any>(`${this.API_SERVER}/v1/user/forgot-password`, data);
    }
    else {
      return this.httpClient.post<any>(`${this.API_SERVER}${apiPath}`, data);
    }

  }

  public patchData(apiPath: string, data?: any, params?: HttpParams) {
    return this.httpClient.patch(`${this.API_SERVER}${apiPath}`, data, { headers: this.headers, params: params }).pipe(map((response: any) => {
      return response;
    }), catchError(this.handleError));
  }

  public putData(apiPath: string, data?: any) {

    if (apiPath.includes("reset-password")) {
      return this.httpClient.put<any>(`${this.API_SERVER}/v1/user/reset-password`, data).pipe(catchError(this.handleError));
    } else if (apiPath.includes("updateUser")) {
      return this.httpClient.put<any>(`${this.API_SERVER}/v1/user/updateUser`, data);
    }
    else {
      const url = `${this.API_SERVER}${apiPath}`;
      return this.httpClient.put<any>(url, data);
    }
  }

  public deleteData(apiPath: string, data?) {
    let url = this.API_SERVER;
    return this.httpClient.delete(`${url}${apiPath}`, { params: data })
      .pipe(catchError(this.handleError));
  }
}
