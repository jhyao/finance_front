import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { Symbol } from './models/symbol';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor() { }

  getSymbols(): Symbol[] {
    return [
      {code: 'a', name: 'aaaaaaaaaaaaaaaaaa'},
      {code: 'ab', name: 'absdfsgsd'},
      {code: 'b', name: 'bbbb'}
    ];
  }

}
