import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";

const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }
}
