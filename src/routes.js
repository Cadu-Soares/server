import {Router} from "express";

import auth from "./middlewares/auth";

import HelloController from "./controllers/HelloController";
import UserController from "./controllers/UserController";
import SessionsController from "./controllers/SessionsController";

const routes = new Router();

// --- ROTA PÚBLICA ---/
routes.get('/hello', HelloController.index);
routes.post('/sessions', SessionsController.create);

// --- AUTENTICAÇÃO --- //

// routes.use(auth);

// ROTAS PRIVADAS
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

export default routes;

