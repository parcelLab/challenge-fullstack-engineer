import  {Application} from 'express';
import ordersRoute from './app/routes/order.routes';

export default (app: Application) => {
    app.use(ordersRoute);
    // CONTROLLER_SETUP
};