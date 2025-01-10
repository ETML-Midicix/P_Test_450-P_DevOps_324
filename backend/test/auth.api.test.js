const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(router);

let user;

beforeEach(async () => {
    // Supprime tous les utilisateurs pour une base propre
    await UserModel.deleteMany({});

    // Crée un utilisateur par défaut pour les tests
    user = new UserModel({
        email: "test@gmail.com",
        password: await bcrypt.hash("passwordTest", 8),
    });
    await user.save();
});

describe('Authentification', () => {
    it('Connexion user avec donnée valide', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({ email: user.email, password: 'passwordTest' });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe(user.email);
    });

    it('Connexion user avec donnée invalide', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({ email: 'User@gmail.com', password: 'passwordTest' });

        expect(response.status).toBe(400);
        expect(response.body).toBe('Utilisateur non trouvé');
    });

    it('Connexion user avec mauvais password', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({ email: user.email, password: 'MauvaisMotDePasse' });

        expect(response.status).toBe(400);
    });
});
