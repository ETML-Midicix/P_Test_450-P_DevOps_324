describe('Tests E2E', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173'); 
    });

    let rdmnbuser = Math.round(Math.random() * 1319)
    let rdmnbuserpwd = Math.round(Math.random() * 1319)
    
    let username = `Archibald Haddock ${rdmnbuser}ème du nom`;
    let useraddress = `Château de Moulinsart`;
    let userzip = rdmnbuser;
    let userlocation = "Belgique";

    it('Deplacement vers inscription', ()=> {
      //Création du compte
      cy.visit('http://localhost:5173/register');
      cy.get('input[name="email"]').type(`user${rdmnbuser}@example.com`);
      cy.get('input[name="password"]').type(`password${rdmnbuserpwd}`);
      cy.get('input[name="confirmation"]').type(`password${rdmnbuserpwd}`);



      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/login'); // Vérifie que l'URL contient '/login' pour vérifier la redirection
    })

    it('Deplacement vers la connexion et la navigation et gestion des tâches', ()=> {
      //Connexion avec le compte créer précédement
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="email"]').type(`user${rdmnbuser}@example.com`);
      cy.get('input[name="password"]').type(`password${rdmnbuserpwd}`);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/'); // Vérifie que l'URL contient '/' pour vérifier la redirection



      //Creation of task 1
      cy.get('input[name="text"]').type('tâche 1');
      cy.get('button[type="submit"]').click();



      //Creation of task 2
      cy.get('input[name="text"]').type('tâche 2');
      cy.get('button[type="submit"]').click();



      //Creation of task 3
      cy.get('input[name="text"]').type('tâche 3');
      cy.get('button[type="submit"]').click();



      //do click later, do not deleted all, need to check after log out if they stayed
      cy.get('input[type="checkbox"]').then(input =>{
        for (let elem of input){
          elem.click();
        }
        input[0].click();
      });

      // cy.get('ul[role="list"]').then(tasks =>{
      //   for (let elem of tasks){
      //     elem.children().first()
      //   }
      // })

      // cy.get('div[role="tooltip"]').then(trashs=>{
      //   let c = 0;
      //   for (let trash of trashs){
      //     c++;
      //     if (c >= Math.round(trashs.length / 2)){
      //       console.log(trashs);
      //       console.log(trash);
      //       trash.click();
      //     }
      //   }
      // })



      //Redirect to About
      cy.get('a[href="/about"]').click();
      cy.url().should('include', '/about'); // Vérifie que l'URL contient '/about' pour vérifier la redirection



      //Change Theme
      cy.get('button[id="theme-toggle"]').click();



      //Open profile icon pop up
      cy.get('button[id="headlessui-menu-button-v-2"]').click();
      cy.get('a[href="/profile"]').click();
      cy.url().should('include', '/profile'); // Vérifie que l'URL contient '/profile' pour vérifier la redirection
      


      //Change Back Theme
      cy.get('button[id="theme-toggle"]').click();



      //Change datas
      cy.get('input[name="name"]').type(username); //Change name
      cy.get('input[name="address"]').type(useraddress); //Change adress
      cy.get('input[name="zip"]').type(userzip); //Change NPA
      cy.get('input[name="location"]').type(userlocation); //Change location
      cy.get('button[type="submit"]').click(); //Change



      //Disconnect
      cy.get('button[id="headlessui-menu-button-v-2"]').click();
      cy.get('a[href="#"]').contains('Déconnection').click();
      cy.url().should('include', '/profile'); // Vérifie que l'URL contient '/profile' pour vérifier la redirection



      //Connect again
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="email"]').type(`user${rdmnbuser}@example.com`);
      cy.get('input[name="password"]').type(`password${rdmnbuserpwd}`);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/'); // Vérifie que l'URL contient '/' pour vérifier la redirection



      //Open profile icon pop up and back to /profile
      cy.get('button[id="headlessui-menu-button-v-2"]').click();
      cy.get('a[href="/profile"]').click();
      cy.url().should('include', '/profile'); // Vérifie que l'URL contient '/profile' pour vérifier la redirection



      //Check if infos are saved
      cy.get('input[name="name"]')
      .invoke('val')
      .then(txt => expect(txt).to.equal(username)); //Check name

      cy.get('input[name="address"]')
      .invoke('val')
      .then(txt => expect(txt).to.equal(useraddress)); //Check adress

      cy.get('input[name="zip"]')
      .invoke('val')
      .then(txt => expect(parseInt(txt)).to.equal(userzip)) //Check NPA

      cy.get('input[name="location"]')
      .invoke('val')
      .then(txt => expect(txt).to.equal(userlocation)); //Check location



      //Delete account
      cy.get('a[href="#"]').contains('Supprimer').click(); //get delete account button
      cy.url().should('include', '/register'); // Vérifie que l'URL contient '/register' pour vérifier la redirection
    


      //Try connection with deleted account, should get error
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="email"]').type(`user${rdmnbuser}@example.com`);
      cy.get('input[name="password"]').type(`password${rdmnbuserpwd}`);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/'); // Vérifie que l'URL contient '/' pour vérifier la redirection
      cy.get('span').contains('Utilisateur non trouvé');
    })
  });
  