export function addCommands (){
    Cypress.Commands.add('getByTestID', (dataTest) => {
        cy.get(`[data-test="${dataTest}"]`) 
    });

    Cypress.Commands.add('login', (username,password) => {

    });
};
