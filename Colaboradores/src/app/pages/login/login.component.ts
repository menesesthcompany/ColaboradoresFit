import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  loginObj: any = {
    login: "",
    senha: ""
  };
  isPasswordVisible = false;
  showMessage = false;
  message = "";
  isSuccess = false;

  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor(private router: Router) {}

  onLogin() {
    if (!this.loginObj.login || !this.loginObj.senha) {
      return;
    }

    this.http.post("http://localhost:5153/api/Colaborador/login", this.loginObj).subscribe(
      (res: any) => {
        if (res.sucesso) {
          this.authService.setUser({ login: this.loginObj.login });
          this.router.navigateByUrl("/dashboard");
          this.showMessage = true;
          this.message = "Login realizado com sucesso!";
          this.isSuccess = true;
        } else {
          this.showMessage = true;
          this.message = res.mensagem || "Verifique seu login ou senha.";
          this.isSuccess = false;
        }
      },
      (error) => {
        this.showMessage = true;
        this.message = "Ocorreu um erro ao tentar fazer login.";
        this.isSuccess = false;
      }
    );
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
