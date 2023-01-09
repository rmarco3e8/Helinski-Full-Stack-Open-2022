describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:8080/api/testing/reset');
    const user = {
      name: 'marco polo',
      username: 'rmarco',
      password: 'p4ssw0rd',
    };
    cy.request('POST', 'http://localhost:8080/api/users', user);
    cy.visit('http://localhost:8080');
  });

  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
  });

  it('login form can be opened', () => {
    cy.contains('login').click();
  });

  it('user can login', () => {
    cy.contains('login').click();
    cy.get('#username').type('rmarco');
    cy.get('#password').type('p4ssw0rd');
    cy.get('#login-button').click();

    cy.contains('marco polo logged-in');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('login').click();
      cy.get('#username').type('rmarco');
      cy.get('#password').type('p4ssw0rd');
      cy.get('#login-button').click();
    });

    it('a new note can be created', () => {
      cy.contains('new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.contains('new note').click();
        cy.get('#note-input').type('another note cypress');
        cy.contains('save').click();
      });

      it('it can be made important', () => {
        cy.contains('another note cypress')
          .contains('make important')
          .click();

        cy.contains('another note cypress')
          .contains('make not important');
      });
    });
  });
});
