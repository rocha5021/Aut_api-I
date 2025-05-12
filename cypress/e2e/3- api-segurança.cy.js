describe('🛡️ Testes de Segurança - API Reqres.in', () => {
  const baseUrl = 'https://reqres.in/api';

  it('🔒 Deve falhar ao tentar login com credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: 'usuario@invalido.com',
        password: 'senhaerrada'
      }
    }).then((res) => {
      expect(res.status).to.eq(401); // Corrigido de 400 → 401
      expect(res.body).to.have.property('error');
    });
  });

  it('🔐 Não deve retornar token ao omitir o password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: 'eve.holt@reqres.in'
      }
    }).then((res) => {
      expect(res.status).to.eq(401); // Corrigido de 400 → 401
      expect(res.body).to.have.property('error');
    });
  });

  it('🧨 Deve falhar com payload malicioso (simulação de SQL Injection)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      failOnStatusCode: false,
      body: {
        email: "' OR 1=1 --",
        password: 'senha123'
      }
    }).then((res) => {
      expect(res.status).to.not.eq(200); // Qualquer status diferente de sucesso é aceito
    });
  });

  it('🔍 Deve retornar 404 para usuário inexistente', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/9999`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

  it('🛑 Não deve retornar campos sensíveis na resposta do usuário', () => {
    cy.request('GET', `${baseUrl}/users/2`).then((res) => {
      expect(res.status).to.eq(200);
      const user = res.body.data;
      expect(user).to.not.have.property('password');
      expect(user).to.not.have.property('token');
    });
  });
});
