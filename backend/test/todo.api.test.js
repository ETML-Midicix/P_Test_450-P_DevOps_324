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
const TodoModel = require('../database/models/todo.model');

// Supprime tout les users afin d'avoir une base propre
beforeEach(async () => {
    await UserModel.deleteMany({});


  });

    
describe('Gestion todo', () => {

    it('Création dun todo avec donnée valide', async () => {
        // MockUp
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

        // Test route
        const response = await request(app)
            .post('/api/todo/add')
            .set('Cookie', `token=${token}`)
            .send({text:'Acheter du pain'});
            console.log(response.data);
            expect(response.statusCode).toBe(200);
            expect(response.body.text).toBe('Acheter du pain');
    });
/*
    it('Suppression dun todo', async () => {
        // MockUp
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
            
        // Test route
        const response = await request(app)
            .post('/api/todo/1')
            .set('Cookie', `token=${token}`)
            .send({text:'Acheter du pain'});
            expect(response.statusCode).toBe(200);
            expect(response.body.text).toBe('Acheter du pain');
    });*/
    it('GET all todos', async () => {
        // MockUp
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

            const todo1 = new TodoModel({
                text: "Acheter du pain",
                completed: false,
                user_id:user._id
            });
            const todo2 = new TodoModel({
                text: "Acheter du lait",
                completed: false,
                user_id:user._id
            });
            
        // Test route
        const response = await request(app)
            .get('/api/todo/')
            .set('Cookie', `token=${token}`)
            console.log(response.data);
            expect(response.statusCode).toBe(200);
    });
});


