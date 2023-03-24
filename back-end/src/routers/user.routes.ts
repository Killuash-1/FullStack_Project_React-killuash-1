import { Router } from "express";
import UserController from "../controllers/User.controller";
import SerializerMiddleware from "../middlewares/serializer/Serializer.middleware";
import UserVerifyMiddleware from "../middlewares/UserVerify.middleware";
import YupSchema from "../schemas/Yup.schema";

export const user = Router();

user.post(
  "/users",
  SerializerMiddleware.text(YupSchema.userSchema),
  UserVerifyMiddleware.userExist,
  UserController.store
);

user.get(
  "/users",
  UserVerifyMiddleware.tokenValidation,
  UserController.list
);

user.get("/users/:id",  UserVerifyMiddleware.tokenValidation,UserController.getOne);

user.patch(
  "/users/:id",
  UserVerifyMiddleware.idVerification,
  UserVerifyMiddleware.tokenValidation,
  UserVerifyMiddleware.verifyPatchBody,
  UserVerifyMiddleware.verifyPatchAndDelete,
  UserController.update
);

user.delete(
  "/users/:id",
  UserVerifyMiddleware.idVerification,
  UserVerifyMiddleware.tokenValidation,
  UserVerifyMiddleware.verifyPatchAndDelete,
  UserController.delete
);