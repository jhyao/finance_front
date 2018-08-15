import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { SymbolComponent } from './symbol/symbol.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SymbolsSelectorComponent } from './symbols-selector/symbols-selector.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'symbol', component: SymbolComponent},
  { path: 'login', component: LoginComponent},
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'test', component: SymbolsSelectorComponent }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
