import { formatMoney } from "../utils/utils.js";

export const successfulPurchaseTemplate = ({
  amount,
  code,
  items,
  purchase_datetime,
}) => `
  <h1>Thanks for your purchase!</h1>
  <h2>Here is your ticket:</h2>
  <p><b>Code:</b> ${code}</p>
  <p><b>Purchase date:</b> ${purchase_datetime}</p>
  <p><b>Items:</b></p>
  <ul>
    ${items.map(
      (item) => `
        <li>
          <p><b>Product:</b> ${item.product.title}</p>
          <p><b>Quantity:</b> ${item.quantity}</p>
          <p><b>Unit price:</b> ${formatMoney(item.product.price)}</p>
          <p><b>Subtotal:</b> ${formatMoney(
            item.product.price * item.quantity
          )}</p>
        </li>
      `
    )}
  </ul>
  <p>Total amount: <b>${formatMoney(amount)}</b></p>        
`;

export const successfulRegisterTemplate = (name) =>
  `<h1>Wellcome to our store ${name}!</h1>`;
