describe ('ToDO E2E tests', () => {
    it ('Visit the app', () => {
      cy.visit ('/');
    });
    it('Should display the sign in component when not signed in', () => {
        cy.visit('/');
        cy.contains('sign in')
    });
    it('Should display the todo component when signed in', () => {
        cy.visit('/');
        cy.get('form').submit();
        cy.get('input').type('pass');
        cy.get('form').submit();
    });
    it('Should add a task in the todo list', () => {
        cy.visit('/');
        cy.get('form').click();
        cy.get('input').type('pass');
        cy.get('form').submit();
        cy.get('ToDO-demo-2').should('not.exist');
        cy.get('input').type('test');
        cy.get('button').click();
        cy.get('.ToDO-demo-2').should('exist');
    });
  });