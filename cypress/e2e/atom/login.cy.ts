import { newUser, usuario } from "../../support/dummy-data";

describe('Authentication tests', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit(Cypress.env('baseUrl'));
    })

    it('should mount', () => {
        cy.url().should('include', '/tienda');
    });

    it('should login and load home page when visiting root page', () => {
        cy.intercept(`${Cypress.env('baseBackendUrl')}/auth/login`, {
            statusCode: 200,
            status: 200,
            data: usuario
        }).as('loginRequest');

        cy.get('.btn.drawer-button').click();
        // cy.get('.drawer-side.z-50').contains('Dashboard').should('not.exist');
        // cy.get('.drawer-side.z-50').contains('Tienda');
        // cy.get('.drawer-side.z-50').contains('Contacto');
        // cy.get('.drawer-side.z-50').contains('Iniciar sesion');

        cy.get('.drawer-side.z-50').get('button.btn-login-popup').click();

        cy.get('input#email').type('ernesto.ramos@neoris.com');
        cy.get('input#password').type('Test12345');
        cy.get('button.btn-login').click();

        
        cy.wait('@loginRequest');
        cy.validateToast('Inicio de sesion exitoso');
        
        cy.visit(Cypress.env('baseUrl'));
        cy.get('.Home').should('exist');
    });

    it('should register', () => {
        cy.intercept(`${Cypress.env('baseBackendUrl')}/auth/register`, {
            statusCode: 200,
            status: 200,
            data: usuario
        }).as('registerRequest');

        cy.get('.btn.drawer-button').click();

        cy.get('.drawer-side.z-50').get('button.btn-login-popup').click();

        cy.get('.tabs.tabs-lg.tabs-bordered > a').contains('Registrarse').click();

        cy.get('input#name').type(newUser.name);
        cy.get('input#lastname').type(newUser.lastname);
        cy.get('input#email').type(newUser.email);
        cy.get('input#password').type(newUser.password);
        cy.get('input#passwordConfirm').type(newUser.password);
        cy.get('button.btn-register').click();

        
        cy.wait('@registerRequest');
        cy.validateToast('Registro exitoso');
        
        cy.visit(Cypress.env('baseUrl'));
        cy.get('.Home').should('exist');
    });
});