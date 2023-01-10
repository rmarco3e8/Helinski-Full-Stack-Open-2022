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

  it('login fails with wrong password', () => {
    cy.contains('login').click();
    cy.get('#username').type('rmarco');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    // cy.get('.error').contains('Wrong credentials');
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'marco polo logged-in');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'rmarco', password: 'p4ssw0rd' });
    });

    it('a new note can be created', () => {
      cy.contains('new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', () => {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
