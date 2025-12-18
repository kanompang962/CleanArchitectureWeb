import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = signal(false);

  loading = this._loading.asReadonly();

  show() {
    console.log('show')
    this._loading.set(true);
  }

  hide() {
    console.log('hide')
    this._loading.set(false);
  }
}