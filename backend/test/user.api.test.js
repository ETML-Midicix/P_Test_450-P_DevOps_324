const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model')
const { key } = require('../env/keys/index');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);
const jsonwebtoken = require('jsonwebtoken');
const { ExplainableCursor } = require('mongodb');

// Supprime tout les users afin d'avoir une base propre
beforeEach(async () => {
    await UserModel.deleteMany({});

  });

    
describe('Gestion compte', () => {

    it('Création compte user avec donnée valide', async () => {
        const response = await request(app)
            .post('/api/user/add')
            .send({name:'testttUser', email: 'testtt@gmail.com', password: 'passwordTest' });
            console.log(response.data);
            expect(response.statusCode).toBe(200);
            expect(response.body.email).toBe('testtt@gmail.com');
    });
    
    it('Suppresion compte', async () => {
        const user = new UserModel({
            email: "test@gmail.com",
            password: await bcrypt.hash("passwordTest", 8),
        });
        await user.save();
        const token = jsonwebtoken.sign({}, key, {
            subject: user._id.toString(),
            expiresIn: 60 * 60 * 24 * 30 * 6,
            algorithm: 'RS256',
            });

            const response = await request(app)
            .delete('/api/user/delete')
            .set('Cookie', `token=${token}`); // Définir le header via .set()
            expect(response.statusCode).toBe(200);

    });
});
