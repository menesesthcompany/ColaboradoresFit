import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RecoverypassComponent } from './pages/recoverypass/recoverypass.component';
import { NewpasswordComponent } from './pages/newpassword/newpassword.component';

export const routes: Routes = [
    { path: 'home' , component: HomeComponent},
    { path: 'dashboard' , component: DashboardComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'redefinirsenha', component: RecoverypassComponent},
    { path: 'novasenha', component: NewpasswordComponent},
    { path: '', component: LoginComponent},
];
