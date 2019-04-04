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
    describe ('Adding tasks', () => {
        beforeEach(function() {
            cy.visit('/');
            cy.get('form').click();
            cy.get('input').type('pass');
            cy.get('form').submit();
          })
        it('Should add a task in the todo list', () => {
            
            cy.get('[name="title"]').type('test');
            cy.get('[name="item"]').type('test1');
            cy.get('[id="select-day"]').click();
            cy.get('[data-value="Monday"]').click();
            cy.get('[name="tags"]').type('test2');
            cy.get('[id="add"]').click();
            cy.get('[id="1"]').should('exist')
        });
        it('Should add a two tasks in the todo list', () => {
           
            cy.get('[name="title"]').type('test');
            cy.get('[name="item"]').type('test1');
            cy.get('[id="select-day"]').click();
            cy.get('[data-value="Monday"]').click();
            cy.get('[name="tags"]').type('test2');
            cy.get('[id="add"]').click();
            cy.get('[id="1"]').should('exist')

            cy.get('[name="title"]').type('test2');
            cy.get('[name="item"]').type('test2');
            cy.get('[id="select-day"]').click();
            cy.get('[data-value="Tuesday"]').click();
            cy.get('[name="tags"]').type('test2');
            cy.get('[id="add"]').click();
            cy.get('[id="2"]').should('exist')
        });
    });
  });