import { addCommands } from '../support/commands';
addCommands();

beforeEach(() => {
cy.visit('https://www.saucedemo.com/')
})

describe('Login flow', () => {
    it('Successful login', () => {
        cy.login('standard_user', 'secret_sauce');

        // Verifies logged in homepage
        cy.getByTestID('header-container').should('be.visible').contains('Swag Labs');
        cy.getByTestID('open-menu').should('be.visible');
        cy.getByTestID('shopping-cart-link').should('be.visible');
        cy.getByTestID('secondary-header').within(() => {
            cy.getByTestID('title').should('be.visible').contains('Products');
            cy.getByTestID('product-sort-container').should('be.visible');
        });
        cy.getByTestID('inventory-container').should('be.visible');
    });

    it('Failed login', () => {  // Logs user in
        cy.login('locked_out_user', 'secret_sauce');

        // Verifies login errors
        cy.getByTestID('error').should('be.visible').contains('Epic sadface: Sorry, this user has been locked out.');
        cy.getByTestID('error-button').should('be.visible').click();
        cy.getByTestID('error').should('not.exist');
    });
  })