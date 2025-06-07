export function addCommands (){
    Cypress.Commands.add('getByTestID', (dataTest) => {
        cy.get(`[data-test="${dataTest}"]`) 
    });

    Cypress.Commands.add('login', (username,password) => {
        cy.getByTestID('username').should('be.visible').type(`${username}`);
        cy.getByTestID('password').should('be.visible').type(`${password}`);
        cy.getByTestID('login-button').should('be.visible').contains('Login').click();
    });

    Cypress.Commands.add('logout', (username,password) => {
        cy.get('button').should('be.visible').contains('Open Menu').click();
        cy.getByTestID('logout-sidebar-link').should('be.visible').contains('Logout').click();
    });
};
