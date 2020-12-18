import {Router} from 'express';
import CampusController from '../controllers/campus.controller';

const campusRouter = Router();

const campusController = new CampusController();

campusRouter.get('/', campusController.readAll);

campusRouter.get('/:id', campusController.readOnly);

// TODO: autenticar essas rotas para somente admins usarem
campusRouter.post('/admin', campusController.insert);

campusRouter.put('/admin/:id', campusController.update);

export default campusRouter;
