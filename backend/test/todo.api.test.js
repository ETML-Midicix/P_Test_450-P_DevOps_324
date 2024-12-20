const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const bcrypt = require('bcrypt');
const UserModel = require('../database/models/user.model');
const { key } = require('../env/keys/index');
const cookieParser = require('cookie-parser');
const app = express();
const jsonwebtoken = require('jsonwebtoken');
const TodoModel = require('../database/models/todo.model');

app.use(cookieParser());
app.use(express.json());
app.use(router);

let user;
let token;

beforeEach(async () => {
    // Supprime tous les users et todos pour repartir d'une base propre
    await UserModel.deleteMany({});
    await TodoModel.deleteMany({});
    
    // Crée un utilisateur et génère un token
    user = new UserModel({
        email: "test@gmail.com",
        password: await bcrypt.hash("passwordTest", 8),
    });
    await user.save();
    token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
    });
});

describe('Gestion todo', () => {
    it('Création d\'un todo avec des données valides', async () => {
        const response = await request(app)
            .post('/api/todo/add')
            .set('Cookie', `token=${token}`)
            .send({ text: 'Acheter du pain' });

        expect(response.statusCode).toBe(200);
        expect(response.body.text).toBe('Acheter du pain');
    });

    it('GET all todos', async () => {
        // Ajout de deux todos pour l'utilisateur
        await TodoModel.insertMany([
            { text: "Acheter du pain", completed: false, user_id: user._id },
            { text: "Acheter du lait", completed: false, user_id: user._id }
        ]);

        const response = await request(app)
            .get('/api/todo/')
            .set('Cookie', `token=${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].text).toBe("Acheter du pain");
    });

    it('Suppression d\'un todo', async () => {
        // Ajout d'un todo pour l'utilisateur
        const todo = new TodoModel({
            text: "Acheter du pain",
            completed: false,
            user_id: user._id
        });
        await todo.save();
        // requete get afin de récupérer l'id du todo 
        const responseGetTodo = await request(app)
            .get('/api/todo/')
            .set('Cookie', `token=${token}`);

        todoID = responseGetTodo.body[0]._id;
        const response = await request(app)
            .post(`/api/todo/${todoID}`)
            .set('Cookie', `token=${token}`);

        expect(response.statusCode).toBe(200);

        // Vérifie que le todo a été supprimé
        const todos = await TodoModel.find();
        expect(todos.length).toBe(0);
    });

    it('Modification d\'un todo', async () => {
        // Ajout d'un todo pour l'utilisateur
        const todo = new TodoModel({
            text: "Acheter du pain",
            completed: false,
            user_id: user._id
        });
        await todo.save();
        // requete get afin de récupérer l'id du todo 
        const responseGetTodo = await request(app)
            .get('/api/todo/')
            .set('Cookie', `token=${token}`);

        todoID = responseGetTodo.body[0]._id;
        const response = await request(app)
            .patch(`/api/todo/${todoID}`)
            .set('Cookie', `token=${token}`)
            .send({text:"Todo modifie"});

        expect(response.statusCode).toBe(200);

    });
});
