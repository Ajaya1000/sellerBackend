// ESM syntax is supported.
import express from 'express';
import { userRoutes,sessionRoutes,productRoutes } from '../routes/index';

import {PORT,NODE_ENV,MONGO_URI,SESS_NAME, SESS_SECRET, SESS_LIFETIME} from './config';
import session from "express-session";
import connectStore from "connect-mongo";
import mongoose from 'mongoose';
(async () => {
    try {
      await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
      console.log('MongoDB connected');
      const app=express();
      const MongoStore = connectStore(session)

    app.disable('x-powered-by');

    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: 'session',
          ttl: parseInt(SESS_LIFETIME) / 1000
        }),
        cookie: {
          sameSite: true,
          secure: NODE_ENV === 'production',
          maxAge: parseInt(SESS_LIFETIME)
        }
      }));

    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/session', sessionRoutes);
    apiRouter.use('/product', productRoutes);

    app.listen(PORT,function( ){
    console.log(`listening on port ${PORT}`);
    });}
    catch(err){
    console.log(err);
    }
})();
