describe('Teste de Carga - Fake Store API', () => {
  const baseUrl = 'https://fakestoreapi.com';
  const qtdRequisicoes = 30;

  it('Teste de carga com múltiplas requisições GET /products', () => {
    const requisicoesGet = [];

    for (let i = 0; i < qtdRequisicoes; i++) {
      requisicoesGet.push(
        cy.request({
          method: 'GET',
          url: `${baseUrl}/products`,
          time: true,
        }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.duration).to.be.lessThan(1000);

          cy.log(`GET ${i + 1} - ${res.duration} ms`);
          console.log(`GET ${i + 1} - Tempo: ${res.duration} ms | Status: ${res.status}`);
        })
      );
    }

    Cypress.Promise.all(requisicoesGet);
  });

  it('Teste de carga com múltiplas requisições POST /users', () => {
    const requisicoesPost = [];

    for (let i = 0; i < qtdRequisicoes; i++) {
      const usuarioFake = {
        email: `teste${i}@exemplo.com`,
        username: `usuario${i}`,
        password: `senha${i}`,
        name: {
          firstname: "João",
          lastname: "Silva"
        },
        address: {
          city: "Salvador",
          street: "Rua X",
          number: i + 1,
          zipcode: "40000-000"
        },
        phone: "71999999999"
      };

      requisicoesPost.push(
        cy.request({
          method: 'POST',
          url: `${baseUrl}/users`,
          body: usuarioFake,
          failOnStatusCode: false,
          time: true
        }).then((res) => {
          expect([200, 201]).to.include(res.status);
          expect(res.duration).to.be.lessThan(2000);

          cy.log(`POST ${i + 1} - ${res.duration} ms`);
          console.log(`POST ${i + 1} - Tempo: ${res.duration} ms | Status: ${res.status}`);
        })
      );
    }

    Cypress.Promise.all(requisicoesPost);
  });
});
