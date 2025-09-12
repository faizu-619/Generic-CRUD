import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GenericService<Type> {

  private defaultModel = new BehaviorSubject<Type | null>(null);
  public defaultModel$ = this.defaultModel.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  getSchema(modelName: string): Observable<any> {
    return this.http.get(`./assets/setup/${modelName}.json`);
  }

  getAll(modelName: string): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}/${modelName}`);
  }

  get(modelName: string, id: number): Observable<Type> {
    return this.http.get<Type>(`${this.baseUrl}/${modelName}/${id}`);
  }

  save(modelName: string, obj: Type): Observable<Type> {
    return this.http.post<Type>(`${this.baseUrl}/${modelName}`, obj);
  }

  delete(modelName: string, id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${modelName}/${id}`);
  }

  updateModel(model: Type): void {
    this.defaultModel.next(model);
  }
}
