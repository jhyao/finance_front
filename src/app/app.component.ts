import { Component } from '@angular/core';
import { SymbolService } from './symbol.service';
import { Symbol } from './models/symbol';
import { LoginService } from './login.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance';
  user: User;
  logined :boolean = false;

  constructor(private loginService: LoginService) {

  }
  
  ngOnInit() {
    this.user = this.loginService.getUser();
    console.log('app' + this.user);
    this.logined = true;
  }
}
