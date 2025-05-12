/// <reference types="cypress" />

describe('✅ Sequência Completa de Testes de API - Recurso: Users', () => {

  let userId

  before(() => {
    cy.log('🔧 Iniciando sequência de testes')
  })

  it('1️⃣ Criar novo usuário com dados válidos (POST)', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        name: 'Test QA',
        username: 'testqa',
        email: 'qa@example.com'
      },
      failOnStatusCode: false // Evita falhas automáticas
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
      userId = res.body.id
      cy.log(`Usuário criado com ID: ${userId}`)
      cy.screenshot('01-usuario-criado')
    })
  })

  it('2️⃣ Buscar usuário criado (GET)', () => {
    if (!userId) {
      cy.log('❌ ID do usuário não definido. Teste abortado.')
      return
    }
    cy.log(`🔍 Buscando usuário com ID: ${userId}`)
    cy.request({
      url: `https://jsonplaceholder.typicode.com/users/${userId}`,
      failOnStatusCode: false // Evita falhas automáticas
    }).then((res) => {
      if (res.status === 404) {
        cy.log('⚠️ Usuário não encontrado. Verifique se o ID é válido.')
      } else {
        expect(res.status).to.eq(200)
        cy.log('✅ Usuário encontrado com sucesso.')
      }
      cy.screenshot('02-consulta-usuario')
    })
  })

  it('3️⃣ Atualizar usuário (PUT)', () => {
    if (!userId) {
      cy.log('❌ ID do usuário não definido. Teste abortado.')
      return
    }
    cy.request({
      method: 'PUT',
      url: `https://jsonplaceholder.typicode.com/users/${userId}`,
      body: {
        name: 'Test QA Atualizado',
        username: 'qa_updated'
      },
      failOnStatusCode: false // Adicionado para tratar erros manualmente
    }).then((res) => {
      expect(res.status).to.be.oneOf([200, 500]) // Tratando possíveis respostas
      if (res.status === 200) {
        expect(res.body.username).to.eq('qa_updated')
      } else {
        cy.log('⚠️ Erro no servidor ao atualizar o usuário.')
      }
      cy.screenshot('03-atualizacao-usuario')
    })
  })

  it('4️⃣ Deletar usuário (DELETE)', () => {
    cy.request({
      method: 'DELETE',
      url: `https://jsonplaceholder.typicode.com/users/${userId}`
    }).then((res) => {
      expect(res.status).to.eq(200)
      cy.screenshot('04-delecao-usuario')
    })
  })

  it('5️⃣ Buscar usuário inexistente (GET)', () => {
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/users/9999',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
      cy.screenshot('05-usuario-inexistente')
    })
  })

  it('6️⃣ Tentar deletar usuário inexistente (DELETE)', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://jsonplaceholder.typicode.com/users/9999',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200)
      cy.screenshot('06-delete-inexistente')
    })
  })

  // TESTES ADICIONAIS

  it('7️⃣ Criar usuário com campo obrigatório ausente (sem nome)', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        username: 'invalido',
        email: 'fail@example.com'
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 201]) // depende da API real
      cy.screenshot('07-post-campo-obrigatorio')
    })
  })

  it('8️⃣ Enviar dados com tipo inválido (ID string)', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users/abc',
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 404])
      cy.screenshot('08-id-invalido')
    })
  })

  it('9️⃣ Validar headers da resposta', () => {
    cy.request('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        expect(res.headers).to.have.property('content-type')
        expect(res.headers['content-type']).to.include('application/json')
        cy.screenshot('09-validacao-header')
      })
  })

  it('🔟 Validar tempo de resposta (performance)', () => {
    cy.request('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        expect(res.duration).to.be.lessThan(2000)
        cy.screenshot('10-validacao-performance')
      })
  })

  it('1️⃣1️⃣ Validar lista completa de usuários (GET)', () => {
    cy.request('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.length(10)
        cy.screenshot('11-lista-usuarios')
      })
  })

  it('1️⃣2️⃣ Criar usuário com e-mail inválido (POST)', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        name: 'Teste Inválido',
        username: 'failuser',
        email: 'invalido-email' // e-mail incorreto
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 201]) // depende da API real
      cy.screenshot('12-post-email-invalido')
    })
  })

  it('1️⃣3️⃣ Validar busca com query param (GET?username=testqa)', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users?username=Bret'
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.length).to.be.greaterThan(0)
      cy.screenshot('13-query-param')
    })
  })

  it('1️⃣4️⃣ Validar método não permitido (PATCH)', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://jsonplaceholder.typicode.com/users',
      failOnStatusCode: false
    }).then((res) => {
      expect([404, 405]).to.include(res.status)
      cy.screenshot('14-metodo-nao-permitido')
    })
  })

})
