describe('Blog app', () => {
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

  it('Login form is shown', () => {
    cy.get('#login-form');
    cy.contains('username').get('#username-input');
    cy.contains('password').get('#password-input');
    cy.get('#submit-login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username-input').type('rmarco');
      cy.get('#password-input').type('p4ssw0rd');
      cy.get('#submit-login').click();

      cy.contains('marco polo logged in');
      cy.contains('logout');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username-input').type('rmarco');
      cy.get('#password-input').type('wrong');
      cy.get('#submit-login').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'marco polo logged in');
      cy.get('#login-form');
    });

    describe('When logged in', () => {
      beforeEach(() => {
        cy.login({ username: 'rmarco', password: 'p4ssw0rd' });
      });

      it('A blog can be created', () => {
        cy.contains('new blog').click();

        cy.get('#title-input').type('interesting title');
        cy.get('#author-input').type('cool author');
        cy.get('#url-input').type('www.coolkidz.org');

        cy.get('#submit-blog').click();

        cy.get('.blogDiv').contains('interesting title cool author');
        cy.get('.blogDiv').contains('view').click();
        cy.get('.blogDiv').contains('www.coolkidz.org');
        cy.get('.blogDiv').contains('likes 0');
        cy.get('.blogDiv').contains('marco');
        cy.get('.blogDiv').contains('remove');
      });

      describe('and a blog exists', () => {

      });
    });
  });
});
