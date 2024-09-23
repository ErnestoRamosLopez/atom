import { productTest } from "../../support/dummy-data";

describe('Tienda tests', () => {
    beforeEach(() => {
        cy.loginDefault();
        cy.visit(`${Cypress.env('baseUrl')}/tienda`);
    });

    it('should add items to shopping cart', () => {
        cy.get('.product-grid').find('.card').should('have.length', 10);
        
        cy.get('.product-grid').find('.card').first().get('button').contains('Agregar').click();

        cy.validateToast('Producto agregado');

        cy.get('span.cart-counter').should('have.text', 1);
    });

    it('should use pagination', () => {
        cy.get('.product-grid').find('.card').should('have.length', 10);

        cy.intercept(`${Cypress.env('baseBackendUrl')}/products?_page=2&_perPage=10`, {
            statusCode: 200,
            status: 200,
            body: [
                productTest
            ],
            headers: {
                'x-total-count': "50"
            }
        }).as('productSearch');
        
        cy.get('.pagination').find('button').contains('2').click();

        cy.wait('@productSearch');

        cy.get('.product-grid').find('.card').should('have.length', 1);
    });

    it('should update pagination', () => {
        cy.intercept(`${Cypress.env('baseBackendUrl')}/products?_page=2&_perPage=10`, {
            statusCode: 200,
            status: 200,
            body: [
                productTest
            ],
            headers: {
                'x-total-count': "100"
            }
        }).as('productSearch');
        
        cy.get('.pagination').find('button').contains('2').click();

        cy.wait('@productSearch');

        cy.get('.pagination').find('button').should('have.length', 10);
    });
});