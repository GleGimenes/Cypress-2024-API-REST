/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

    // ... outros testes ...

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

    // ... outros testes ...

});
