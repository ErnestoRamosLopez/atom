/// <reference types="cypress" />

import { usuario } from "./dummy-data";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('loginDefault', () => {
    cy.login('ernesto.ramos@neoris.com', 'Test12345');
});


Cypress.Commands.add('login', (email, password) => {
    cy.intercept(`${Cypress.env('baseBackendUrl')}/auth/login`, {
        statusCode: 200,
        status: 200,
        data: usuario
    }).as('loginRequest');
    cy.visit(Cypress.env('baseUrl'));

    cy.get('.btn.drawer-button').click();

    cy.get('.drawer-side.z-50').get('button.btn-login-popup').click();

    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('button.btn-login').click();

    
    cy.wait('@loginRequest');
    cy.get('.Toastify').contains('Inicio de sesion exitoso');
});

Cypress.Commands.add('validateToast', (text) => {
    cy.get('.Toastify').contains(text);
});