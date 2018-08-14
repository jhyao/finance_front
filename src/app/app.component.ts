import { Component } from '@angular/core';
import { SymbolService } from './symbol.service';
import { Symbol } from './models/symbol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance';

  ngOnInit() {
  }
}
