import { addCommands } from '../support/commands';
addCommands();

beforeEach(() => {
cy.visit('https://www.saucedemo.com/')
})

describe('Successful Login', () => {
    it('Logs in user', () => {
        // Logs user in
        cy.getByTestID('username')
            .should('have.attr', 'placeholder', 'Username')
            .type('standard_user');
        
        cy.getByTestID('password')
            .should('have.attr', 'placeholder', 'Password')
            .type('secret_sauce');

        cy.getByTestID('login-button').should('be.visible').contains('Login').click();

        // Verifies logged in homepage
        cy.getByTestID('header-container').should('be.visible').contains('Swag Labs');
        cy.getByTestID('open-menu').should('be.visible');
        cy.getByTestID('shopping-cart-link').should('be.visible');
        cy.getByTestID('secondary-header').within(() => {
            cy.getByTestID('title').should('be.visible').contains('Products');
            cy.getByTestID('product-sort-container').should('be.visible');
        });
        cy.getByTestID('inventory-container').should('be.visible');

    })
  })