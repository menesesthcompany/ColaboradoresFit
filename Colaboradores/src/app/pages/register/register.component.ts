import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  cadastroObj: any = {
    nome: "",
    email: "",
    login: '',
    senha: "",
  };

  // Variáveis para controle da mensagem
  showMessage: boolean = false;
  message: string = '';
  isSuccess: boolean = false;  // Variável para controle de sucesso ou erro

  // Injeção do HttpClient
  http = inject(HttpClient);

  constructor(private router: Router) {}

  onClick() {
    console.log('onClick chamado');

    // Verifica se todos os campos foram preenchidos
    if (!this.cadastroObj.nome || !this.cadastroObj.email || !this.cadastroObj.login || !this.cadastroObj.senha) {
      this.showMessage = true;
      this.message = "Por favor, preencha todas as lacunas.";
      this.isSuccess = false;
      return;
    }

    // Envia a requisição para a API
    this.http.post("http://localhost:5153/api/Colaborador", this.cadastroObj).subscribe(
      (res: any) => {
        console.log("Resposta completa:", res);
        
        if (res.sucesso) {
          // Exibe a mensagem de sucesso
          this.showMessage = true;
          this.message = "Cadastro realizado com sucesso!";
          this.isSuccess = true;  // Caso a requisição tenha sucesso
          
          const colaboradorCriado = res.dados;
          console.log("Colaborador criado:", colaboradorCriado);

          this.router.navigateByUrl("/");  // Redireciona para a página inicial após o cadastro
        } else {
          // Exibe mensagem de erro caso a API retorne algo errado
          this.showMessage = true;
          this.message = res.mensagem || "Verifique os dados informados.";
          this.isSuccess = false;  // Caso a requisição não seja bem-sucedida
        }
      },
      (error) => {
        console.error("Erro ao realizar o cadastro:", error);
        // Exibe mensagem de erro caso haja falha na requisição
        this.showMessage = true;
        this.message = "Ocorreu um erro ao tentar realizar o cadastro. Por favor, tente novamente.";
        this.isSuccess = false;
      }
    );
  }
}
