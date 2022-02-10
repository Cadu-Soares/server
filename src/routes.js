import {Router} from "express";
import {route} from "express/lib/router"

import HelloController from "./controllers/HelloController";
import UserController from "./controllers/UserController";

const routes = new Router();

routes.get('/hello', HelloController.index);

// RESTFull
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

export default routes;

