import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from "../util/helpers";
import {
  SESS_NAME
} from '../src/config'
import UserInfo from '../models/userInfo';
const userRouter = express.Router();
// userRouter.use(express.json());
userRouter.post("", async (req, res) => {
  try {
    const { username, email, password } = req.body
    console.log(req.body);
    await signUp.validate({
      username,
      email,
      password
    } );
    
    const newUser = new User({ username, email, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();
    req.session.user = sessionUser;
    res.send({ userId: newUser.id, username });
  } catch (err) {
    console.log(err);
    res.status(400).send(parseError(err));
  }
});
userRouter.post("/:uid", async (req, res) => {
  console.log('inside userinfo');
  try {
      const {
        name,
        phoneNumber,
        companyNumber,
        storeName,
        primaryProductCategory,
        pincode,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        gst,
        pan
      } = req.body;
      const id = req.params.uid;
      if (req.session && req.session.user && req.session.user.userId === id) {

      } else {
        res.status(401).send({
          'message': 'You are not logged in'
        });
        console.log('console after res');
        return;
      }
      
      const newUserInfo = new UserInfo({
        id,
        name,
        phoneNumber,
        companyNumber,
        storeName,
        primaryProductCategory,
        pincode,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        gst,
        pan
      });
      await newUserInfo.save();
    res.send({
      id,
      name,
      phoneNumber,
      companyNumber,
      storeName,
      primaryProductCategory,
      pincode,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      gst,
      pan
    });

  } catch (err) {
    res.status(400).send(parseError(err));
  }
});
userRouter.get("/:uid", async (req, res) => {
  try{
    const id = req.params.uid;
    if (req.session && req.session.user && req.session.user.userId === id) {

    } else {
      res.status(401).send({
        'message': 'You are not logged in'
      });
      console.log('console after res');
      return;
    }

    const userInfo = await UserInfo.findOne({id});
    res.json(userInfo);

  }catch (err) {
      res.status(400).send(parseError(err));
    }
});
export default userRouter;