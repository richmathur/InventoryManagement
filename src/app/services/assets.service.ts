import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../model/asssets.model';
@Injectable({
  providedIn: 'root',
})
export class AssetsService{
  private apiUrl='https://localhost:7253/api/assets';
  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }
  // Add this for the Save button to work
  createAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }
}
