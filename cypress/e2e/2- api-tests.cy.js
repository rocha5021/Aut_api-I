describe('Treinamento de Testes de API - JSONPlaceholder (Users)', () => {

  it('GET - Listar usuários', () => {
    cy.request('https://jsonplaceholder.typicode.com/users')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.eq(10) // JSONPlaceholder retorna 10 usuários fixos
      })
  })

  it('GET - Consultar usuário por ID', () => {
    cy.request('https://jsonplaceholder.typicode.com/users/1')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', 1)
        expect(response.body).to.have.property('name')
      })
  })

  it('POST - Criar novo usuário (fake)', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        name: 'Neo',
        username: 'theone',
        email: 'neo@matrix.com'
      }
    }).should((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.include({
        name: 'Neo',
        username: 'theone',
        email: 'neo@matrix.com'
      })
      expect(response.body).to.have.property('id') // ID fake retornado
    })
  })

  it('PUT - Atualizar usuário (fake)', () => {
    cy.request({
      method: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/users/1',
      body: {
        name: 'Neo Atualizado',
        username: 'theupdatedone'
      }
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.include({
        name: 'Neo Atualizado',
        username: 'theupdatedone'
      })
    })
  })

  it('DELETE - Remover usuário (fake)', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://jsonplaceholder.typicode.com/users/1'
    }).should((response) => {
      expect(response.status).to.eq(200) // JSONPlaceholder sempre retorna 200
    })
  })

})
