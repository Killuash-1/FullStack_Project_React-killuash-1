import { Router } from "express";
import ContactController from "../controllers/Contact.controller";
import YupSchema from "../schemas/Yup.schema";
import YupVerification from "../middlewares/serializer/Serializer.middleware";
import ContactVerifiyMiddleware from "../middlewares/ContactVerifiy.middleware";
import UserVerifyMiddleware from "../middlewares/UserVerify.middleware";

export const contact = Router();

contact.get(
  "/contacts/:id",
  UserVerifyMiddleware.tokenValidation,
  ContactController.list,
);

contact.get(
  "/contacts",
  UserVerifyMiddleware.tokenValidation,
  ContactController.listAll,
);

contact.post(
  "/contacts",
  YupVerification.text(YupSchema.contactSchema),
  ContactVerifiyMiddleware.authContact,
  ContactController.storeContactInUser,
);

contact.patch(
  "/contacts/:id",
  YupVerification.text(YupSchema.contactSchema),
  ContactVerifiyMiddleware.authContactPatchDelete,
  ContactController.update,
);

contact.delete(
  "/contacts/:id",
  UserVerifyMiddleware.tokenValidation,
  ContactController.delete,
);
