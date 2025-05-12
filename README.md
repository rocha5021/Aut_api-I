# 🚀 Projeto de Testes de API com Cypress

Este projeto tem como objetivo demonstrar na prática como utilizar o **Cypress** para realizar **testes automatizados de API**, cobrindo desde operações CRUD até validações de segurança, carga e boas práticas de resposta.

## 🧪 O que o projeto faz

- Realiza testes completos no recurso `/users` da API JSONPlaceholder.
- Simula operações de criação, leitura, atualização e exclusão (CRUD).
- Executa cenários negativos e de validação de regras (headers, performance, e-mails inválidos).
- Valida query parameters, métodos não permitidos e manipulações de erro.
- Inclui testes de segurança e carga com outras APIs públicas.

## 📂 Estrutura

- `users_crud.cy.js` – Testes CRUD completos para o recurso "Users".
- `users_validations.cy.js` – Casos focados em validações específicas.
- `security.cy.js` – Casos simulando ataques e falhas comuns de segurança.
- `load.cy.js` – Testes de carga com múltiplas requisições para validação de performance.

## 🛠️ Ferramentas Utilizadas

- [Cypress](https://www.cypress.io/) — Framework de testes E2E.
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — API fake para testes.
- [Reqres.in](https://reqres.in/) — API pública para testes de autenticação.
- [FakeStoreAPI](https://fakestoreapi.com/) — API de produtos e usuários fake.

## ✅ Benefícios dos testes de API automatizados

- **Velocidade**: Executam testes em segundos.
- **Precisão**: Reduz erros manuais na validação de endpoints.
- **Cobertura**: Garante que falhas ou vulnerabilidades sejam identificadas.
- **Escalabilidade**: Facilita a execução em pipelines CI/CD.
- **Segurança**: Permite simular ataques e prevenir falhas comuns.

## ▶️ Como executar

1. Instale dependências:
   ```bash
   npm install

Execute os testes:

npx cypress open
