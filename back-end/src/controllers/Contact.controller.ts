import { Request, Response } from "express";
import ContactService from "../services/Contact.service";

class ContactController {
  async list(req: Request, res: Response) {
    const id = req.params.headers
    const contacts = await ContactService.getContact(id);

    return res.status(200).json(contacts);
  }

  async storeContactInUser(req: Request, res: Response) {
    const contactCreated = await ContactService.createContact(req);

    return res.status(201).json(contactCreated);
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const id = req.params.id;
    const contactUpdated = await ContactService.update(body, id);

    return res.status(200).json(contactUpdated);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    await ContactService.delete(id);
    console.log(id);
    
    return res.sendStatus(204);
  }

}

export default new ContactController();
