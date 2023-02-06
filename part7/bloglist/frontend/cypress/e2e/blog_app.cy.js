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
        beforeEach(() => {
          cy.createBlog({
            title: 'boring title',
            author: 'lame author',
            url: 'www.lameoz.net',
          });
        });

        it('user can like a blog', () => {
          cy.contains('view').click();
          cy.get('.blogDiv').contains('likes 0');
          cy.get('.likeButton').click();
          cy.get('.blogDiv').contains('likes 1');
        });

        it('user can delete their own blog', () => {
          cy.contains('view').click();
          cy.get('.blogDiv').contains('remove').click();
          cy.get('html').should('not.contain', 'boring title lame author');
          cy.get('.blogDiv').should('not.exist');
        });

        it("user can't delete a blog that isn't theirs", () => {
          cy.request('POST', 'http://localhost:8080/api/users', {
            name: 'wumbo wilson',
            username: 'bigWumb',
            password: 'swag4days',
          });
          cy.contains('logout').click();
          cy.login({ username: 'bigWumb', password: 'swag4days' });
          cy.contains('view').click();
          cy.get('.blogDiv').contains('rmarco');
          cy.get('.blogDiv').contains('remove').should('not.be.visible');
        });
      });

      describe('and multiple blogs exist', () => {
        beforeEach(() => {
          cy.createBlog({
            title: 'title with 0 likes',
            author: 'count alot',
            url: 'www.math.gov',
          });
          cy.createBlog({
            title: 'title with 2 likes',
            author: 'count alot',
            url: 'www.math.gov',
          });
          cy.createBlog({
            title: 'title with 1 likes',
            author: 'count alot',
            url: 'www.math.gov',
          });
          cy.createBlog({
            title: 'title with 3 likes',
            author: 'count alot',
            url: 'www.math.gov',
          });
        });

        it('blogs are ordered by likes, greatest to least', () => {
          cy.contains('title with 2 likes').parent().as('blog-2-like');
          cy.get('@blog-2-like').contains('view').click();
          cy.get('@blog-2-like').find('.likeButton').click();
          cy.get('@blog-2-like').find('.likeButton').click();

          cy.contains('title with 1 likes').parent().as('blog-1-like');
          cy.get('@blog-1-like').contains('view').click();
          cy.get('@blog-1-like').find('.likeButton').click();

          cy.contains('title with 3 likes').parent().as('blog-3-like');
          cy.get('@blog-3-like').contains('view').click();
          cy.get('@blog-3-like').find('.likeButton').click();
          cy.get('@blog-3-like').find('.likeButton').click();
          cy.get('@blog-3-like').find('.likeButton').click();

          cy.get('.blogDiv').eq(0).should('contain', 'title with 3 likes');
          cy.get('.blogDiv').eq(1).should('contain', 'title with 2 likes');
          cy.get('.blogDiv').eq(2).should('contain', 'title with 1 likes');
          cy.get('.blogDiv').eq(3).should('contain', 'title with 0 likes');
        });
      });
    });
  });
});
