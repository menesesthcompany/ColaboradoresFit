import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Importando o CommonModule

@Component({
  selector: 'app-recoverypass',
  standalone: true,
  templateUrl: './recoverypass.component.html',
  styleUrls: ['./recoverypass.component.css'],
  imports: [FormsModule, CommonModule]  // Adicionando o CommonModule aqui
})
export class RecoverypassComponent {
  recoveryObj: any = {
    email: ""
  };

  // Variáveis para controle da mensagem
  showMessage: boolean = false;
  message: string = '';
  isSuccess: boolean = false;  // Variável para controle de sucesso ou erro

  // Injeção do HttpClient
  http = inject(HttpClient);

  constructor() {}

  // Função de envio de e-mail
  onSendEmail() {
    // Verifica se o campo de email está vazio
    if (!this.recoveryObj.email) {
      this.showMessage = true;
      this.message = "Por favor, insira um e-mail válido.";
      this.isSuccess = false;  // Caso o email esteja vazio, é um erro
      return;
    }
  
    // Envia a requisição para a API
    this.http.post("http://localhost:5153/api/PasswordReset/request-reset", { email: this.recoveryObj.email }).subscribe(
      (res: any) => {
        // Exibe a mensagem de sucesso
        this.showMessage = true;
        this.message = res?.message || "Link de redefinição de senha enviado para o e-mail informado.";
        this.isSuccess = true;  // Caso a requisição tenha sucesso, marca como sucesso
      },
      (error) => {
        // Exibe mensagem de erro
        console.error("Erro ao enviar e-mail:", error);
        this.showMessage = true;
        this.message = error?.error?.message || "Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente.";
        this.isSuccess = false;  // Caso ocorra erro, marca como erro
      }
    );
  }
}
