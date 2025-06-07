import { addCommands } from '../support/commands';
addCommands();

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.login('standard_user', 'secret_sauce');
})

describe('Shopping UI', () => {
    it('Adds/removes items to/from cart', () => {
        cy.getByTestID('header-container').should('be.visible').contains('Swag Labs');
        cy.getByTestID('inventory-list').should('be.visible');

        cy.getByTestID('shopping-cart-badge').should('not.exist');
        cy.getByTestID('inventory-item-description').contains('Sauce Labs Backpack');

        //verify cart is empty
        cy.getByTestID('shopping-cart-link').should('be.visible').click();
        cy.getByTestID('inventory-list').should('not.exist');
        cy.getByTestID('inventory-item').should('not.exist');
        cy.getByTestID('continue-shopping').should('be.visible').click();

        // Add backpack to cart
        cy.getByTestID('remove-sauce-labs-backpack').should('not.exist');
        cy.getByTestID('add-to-cart-sauce-labs-backpack').should('be.visible').click();
        cy.getByTestID('remove-sauce-labs-backpack').should('be.visible');
        cy.getByTestID('shopping-cart-badge').should('be.visible');

        // Verify backpack successfully added to cart
        cy.getByTestID('shopping-cart-link').should('be.visible').click();
        cy.getByTestID('inventory-item').should('be.visible').within(() =>{
            cy.getByTestID('inventory-item-name').should('be.visible').contains('Sauce Labs Backpack');
            cy.getByTestID('inventory-item-price').should('be.visible').contains('29.99');
        });
    });

    it('Filters inventory list', () => {
        cy.getByTestID('header-container').should('be.visible').contains('Swag Labs');
        cy.getByTestID('inventory-list').should('be.visible');

        // Verify filter Options
        cy.getByTestID('product-sort-container').should('be.visible').within(() => {
            cy.get('option').should('be.visible').should('have.length', 4)
            cy.get('option').contains('Name (A to Z)');
            cy.get('option').contains('Name (Z to A)');
            cy.get('option').contains('Price (low to high)');
            cy.get('option').contains('Price (high to low)');
        });

        cy.getByTestID('inventory-item').eq(0).contains('Sauce Labs Backpack');

        // Apply low to high filter
        cy.getByTestID('product-sort-container').should('be.visible').select('Price (low to high)');

        cy.getByTestID('inventory-item').eq(0).contains('Sauce Labs Onesie');
    });
  })