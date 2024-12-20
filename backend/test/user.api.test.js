const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');
const { key } = require('../env/keys/index');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);

let user, token;

beforeEach(async () => {
    // Supprime tous les utilisateurs pour une base propre
    await UserModel.deleteMany({});

    // Crée un utilisateur par défaut pour les tests
    user = new UserModel({
        email: "test@gmail.com",
        password: await bcrypt.hash("passwordTest", 8),
    });
    await user.save();

    // Génère un token par défaut pour l'utilisateur
    token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
    });
});

describe('Gestion compte', () => {
    it('Création compte user avec donnée valide', async () => {
        const response = await request(app)
            .post('/api/user/add')
            .send({ name: 'testttUser', email: 'testtt@gmail.com', password: 'passwordTest' });

        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe('testtt@gmail.com');
    });

    it('Suppression compte', async () => {
        const response = await request(app)
            .delete('/api/user/delete')
            .set('Cookie', `token=${token}`);

        expect(response.statusCode).toBe(200);
    });

    it('Mise à jour du compte', async () => {
        const response = await request(app)
            .patch('/api/user/edit')
            .set('Cookie', `token=${token}`)
            .send({ email: "nouveauEmail@gmail.com" });

        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe('nouveauEmail@gmail.com');
    });

    it('Récupération des informations du compte courant', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Cookie', `token=${token}`);

        expect(response.statusCode).toBe(200);
    });
});
