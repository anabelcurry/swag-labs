export function addCommands (){
    Cypress.Commands.add('getByTestID', (dataTest) => {
        cy.get(`[data-test="${dataTest}"]`) 
    });

    Cypress.Commands.add('login', (username,password) => {
        cy.getByTestID('username')
        .should('have.attr', 'placeholder', 'Username')
        .type(`${username}`);
    
        cy.getByTestID('password')
        .should('have.attr', 'placeholder', 'Password')
        .type(`${password}`);

        cy.getByTestID('login-button').should('be.visible').contains('Login').click();
    });
};
