import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly api = environment.apiUrl + '/devices'
  constructor(private readonly httpClient:HttpClient) { }
  get<T>() {
    return this.httpClient.get<T>(this.api)
  }
  post<T>(data: unknown) {
    return this.httpClient.post<T>(this.api, data)
  }
  put<T>(data: unknown) {
    return this.httpClient.put<T>(this.api, data);
  }
}
