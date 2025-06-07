import { addCommands } from '../support/commands';
addCommands();

beforeEach(() => {
cy.visit('https://www.saucedemo.com/');
cy.login('standard_user', 'secret_sauce');
})

describe('Side Nav', () => {
    it('Verifies all buttons', () => {
        cy.get('button').should('be.visible').contains('Open Menu').click();
        cy.getByTestID('inventory-sidebar-link').should('be.visible').contains('All Items');
        cy.getByTestID('about-sidebar-link')
            .should('be.visible')
            .contains('About')
            .should('have.attr', 'href', 'https://saucelabs.com/');
        cy.getByTestID('logout-sidebar-link').should('be.visible').contains('Logout');
        cy.getByTestID('reset-sidebar-link').should('be.visible').contains('Reset App State');
    });
  })