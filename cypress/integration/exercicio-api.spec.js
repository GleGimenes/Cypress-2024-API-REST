/// <reference types="cypress" />
let token

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200);
               expect(response.body).to.have.property('usuarios');
               expect(response.body.usuarios).to.be.an('array');
               if (response.body.usuarios.length > 0) {
                    expect(response.body.usuarios[0]).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id');
               }
          });
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               //expect(response.body.quantidade).to.equal(17)
               expect(response.duration).to.be.lessThan(18)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "João da silva Saurino",
                    "email": "joaodoteste@doteste.com",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     })


     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               failOnStatusCode: false,
               body: {
                    "nome": "João da silva Sauro",
                    "email": "dinoteste@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })

     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200);
               let id = response.body.usuarios[0]._id;
               cy.request({
                    headers: { authorization: token },
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         "nome": "Fulano de Souza Beltrano",
                         "email": "souzabeltrano@qa.com.br",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro alterado com sucesso');
               });
          });
     })

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then((response) => {
               expect(response.status).to.equal(200);
               let id = response.body.usuarios[0]._id;
               cy.request({
                    headers: { authorization: token },
                    method: 'DELETE',
                    url: `usuarios/${id}`,
               }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body.message).to.equal('Registro excluído com sucesso');
               });
          });
     });

})





