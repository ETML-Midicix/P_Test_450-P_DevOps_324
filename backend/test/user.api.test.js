const request = require('supertest');
const express = require('express');
const router = require('../routes/index');

const UserModel = require('../database/models/user.model')

const app = express();
app.use(express.json());
app.use(router);

// Supprime tout les users afin d'avoir une base propre
beforeEach(async () => {
    await UserModel.deleteMany({});
  });

describe('Authentification', () => {

    it('Connexion user avec donnée valide', async () => {
        const bcrypt = require('bcrypt');
        // Définition d'un mockup
        const user = new UserModel({
          email: "test@gmail.com",
          password: await bcrypt.hash("passwordTest", 8),
        });
        await user.save();
        // Essaie de connexion avec les bonnes infos (par rapport au mockups)
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'test@gmail.com', password: 'passwordTest' });
            expect(response.status).toBe(200);
            expect(response.body.email).toBe('test@gmail.com');

         
    });

    it('Connexion user avec donnée invalide', async () => {
        // Essaie de connexion (alors qu'aucun mockup n'a été définis)
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'User@gmail.com', password: 'passwordTest' });

        expect(response.status).toBe(400);
        expect(response.body).toBe('Utilisateur non trouvé');
    });

    it('Connexion user avec mauvais password', async () => {
        //Création d'un user de test
        const bcrypt = require('bcrypt');
        // Définition d'un mockup
        const user = new UserModel({
          email: "User@gmail.com",
          password: await bcrypt.hash("MotDePasse", 8),
        });
        await user.save();
        // Essaie de connexion avec infos erronées
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'User@gmail.com', password: 'MauvaisMotDePasse' });
            expect(response.status).toBe(400);
         
    });
});