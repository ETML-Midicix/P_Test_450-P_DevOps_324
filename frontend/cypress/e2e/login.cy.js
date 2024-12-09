describe('Test de connexion', () => {
    beforeEach(() => {
      // Remplacez par l'URL de votre application
      cy.visit('http://localhost:5173'); 
    });



    it('Deplacement vers inscription', ()=> {
        //Création du compte
        cy.visit('http://localhost:5173/register');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmation"]').type('password123');


        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login'); // Vérifie que l'URL contient '/login' pour vérifier la redirection


        //Connexion avec le compte créer précédement
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');

        cy.get('button[type="submit"]').click();
    })
  /*
    it('devrait se connecter avec des identifiants valides', () => {
      // Localiser et remplir les champs de connexion
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
  
      // Soumettre le formulaire
      cy.get('button[type="submit"]').click();
  
      // Vérifier que la connexion est réussie
      cy.url().should('include', '/dashboard'); // Vérifie la redirection
      cy.contains('Bienvenue').should('be.visible'); // Vérifie le texte affiché
    });
  
    it('devrait afficher une erreur pour un mot de passe incorrect', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      // Vérifier le message d'erreur
      cy.contains('Mauvais email ou mot de passe!').should('be.visible');
    });
  
    it('Utilisateur non trouvé', () => {
      cy.get('input[name="email"]').type('notfound@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
  
      // Vérifier le message d'erreur
      cy.contains('Utilisateur non trouvé').should('be.visible');
    });*/
  });
  