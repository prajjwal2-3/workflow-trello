import express from 'express';
import { Router } from 'express';
import { getUserCards,createCard,deleteCard,updateCard } from '../controllers/taskController';
const route: Router = express.Router();

route.get('/', getUserCards);
route.post('/', createCard);
route.put('/', updateCard);
route.delete('/', deleteCard);

export default route
