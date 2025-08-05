import { Router } from 'express';
import IndexController from '../controllers/index';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app) {
    app.use('/', router);
    router.get('/', indexController.getIndex.bind(indexController));
    router.post('/items', indexController.createItem.bind(indexController));
    router.get('/items/:id', indexController.getItem.bind(indexController));
}