import MongoDao from "./mongo.dao.js";
import { TicketModel } from "./models/ticket.model.js";

export default class TicketDao extends MongoDao {
  constructor() {
    super(TicketModel);
  }

  getAll = async () => {
    try {
      const tickets = await TicketModel.find().populate("items.product");
      return tickets;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const ticket = await TicketModel.findById(id).populate("items.product");
      return ticket || false;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
