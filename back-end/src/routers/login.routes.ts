import { Router } from "express";
import UserController from "../controllers/User.controller";
import SerializerMiddleware from "../middlewares/serializer/Serializer.middleware";
import YupSchema from "../schemas/Yup.schema";


export const login = Router()

login.post(
    "/login",
    SerializerMiddleware.text(YupSchema.loginSchema),
    UserController.login
)