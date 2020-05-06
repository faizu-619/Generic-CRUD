import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenericService<Type> {

  private defaultModel = new Subject<Type>();
  public defaultModel$ = this.defaultModel.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.defaultModel.next({} as Type);
  }

  getSchema(modelName: string): Observable<any> {
    return this.http.get(`./assets/setup/${modelName}.json`);
  }

  getAll(modelName: string): Observable<Type[]> {
    const apiURL = `${this.baseUrl}/${modelName}`;
    return this.http.get<Type[]>(apiURL);
  }

  get(modelName: string, id: number): Observable<Type> {
    const apiURL = `${this.baseUrl}/${modelName}/${id}`;
    return this.http.get<Type>(apiURL);
  }

  save(modelName: string, obj: Type): Observable<Type> {
    const apiURL = `${this.baseUrl}/${modelName}`;
    return this.http.post<Type>(apiURL, obj);
  }

  delete(modelName: string, id: number): Observable<any> {
    const apiURL = `${this.baseUrl}/${modelName}/${id}`;
    return this.http.delete(apiURL);
  }

  updateModel(model: Type): void {
    this.defaultModel.next(model);
  }

}
