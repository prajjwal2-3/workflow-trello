import express from 'express';
import { Router } from 'express';
import { getAllUsers,createUser,deleteUser,updateUser,getUserByEmailId} from '../controllers/userController';
const route: Router = express.Router();

route.get('/', getAllUsers);
route.get('/userDetails', getUserByEmailId);
route.post('/', createUser);
route.put('/', updateUser);
route.delete('/', deleteUser);

export default route