import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _isLoading: boolean = false;

  constructor() { }

  setLoading(value: boolean): void {
    this._isLoading = value;
  }

  isLoading(): boolean {
    return this._isLoading;
  }
}
