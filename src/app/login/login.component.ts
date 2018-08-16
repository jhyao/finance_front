import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  error: string = '';
  redirectTo: string = '/home';
  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.redirectTo = this.activatedRoute.snapshot.params['redirectTo'];
  }

  login() {
    if (this.username) {
      this.error = 'empty username';
    }
    if (this.password) {
      this.error = "";
    }
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        if(response.error) {
          this.error = response.error;
        } else {
          this.loginService.user = response.result;
          console.log(this.loginService.getUser());
          $("#nav-login").hide();
          $('#nav-user').show();
          $('#nav-user').html(response.result.username);
          this.router.navigate([this.redirectTo]);
        }
      }
    )
  }

}
