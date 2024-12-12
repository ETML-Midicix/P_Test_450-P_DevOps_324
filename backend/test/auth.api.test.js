const request = require('supertest');
const express = require('express');
const router = require('../routes/index');

const UserModel = require('../database/models/user.model')

const app = express();
app.use(express.json());
app.use(router);

// Supprime tout les users afin d'avoir une base propre
beforeEach(async () => {
    //await UserModel.deleteMany({});
  });

describe('Creation compte', () => {

    it('Création compte user avec donnée valide', async () => {
        // const bcrypt = require('bcrypt');
        // // Définition d'un mockup
        // const user = new UserModel({
        //   email: "test@gmail.com",
        //   password: await bcrypt.hash("passwordTest", 8),
        // });
        // user.save();
        // Essaie de connexion avec les bonnes infos (par rapport au mockups)
        const response = await request(app)
            .post('/api/user/add')
            .send({name:'testttUser', email: 'testtt@gmail.com', password: 'passwordTest' });
            console.log(response.data);
            expect(response.statusCode).toBe(200);
            expect(response.body.email).toBe('testtt@gmail.com');

         
    });
});