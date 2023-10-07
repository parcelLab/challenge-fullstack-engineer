import express from 'express';
import { getAllByEmail } from '../controller/orderController';

const router = express.Router();

router.get('/api/orders/:email', getAllByEmail);

export default router;
