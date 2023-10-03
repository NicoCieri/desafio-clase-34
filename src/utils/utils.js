import { dirname } from "path";
import { fileURLToPath } from "url";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import { faker } from "@faker-js/faker";

faker.locale = "es";

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Método que recibe password sin hashear y retorna password hasheada
 * @param {*} password string
 * @returns password hasheada -> string
 * @example
 * createHash('1234')
 */
export const createHash = (password) => hashSync(password, genSaltSync(10));

/**
 * Método que compara password hasheada con password de login
 * @param {*} user
 * @param {*} password string
 * @returns boolean
 */
export const isValidPassword = (password, user) =>
  compareSync(password, user.password);

const isNumberValid = (number) =>
  (typeof number === "number" && number > 0) ||
  (typeof number === "string" && number.trim() !== "" && !isNaN(number));

export const areProductFieldsValid = ({
  title,
  description,
  price,
  category,
  code,
  stock,
}) => {
  if (typeof title !== "string" || !title) return false;
  if (typeof description !== "string" || !description) return false;
  if (typeof code !== "string" || !code) return false;
  if (typeof category !== "string" || !category) return false;
  if (!isNumberValid(price)) return false;
  if (!isNumberValid(stock)) return false;

  return true;
};

export const stringToBoolean = (string) => {
  if (string === "true") return true;
  if (string === "false") return false;
  return null;
};

export const createResponse = (res, statusCode, data) =>
  res.status(statusCode).json({ data });

export const splitITemsByStock = (items) =>
  items.reduce(
    (acc, item) => {
      if (item.quantity <= item.product.stock) acc.available.push(item);
      else acc.unavailable.push(item);

      return acc;
    },
    {
      available: [],
      unavailable: [],
    }
  );

export const formatMoney = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(number);
};

const generateProduct = () => ({
  _id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
  code: faker.datatype.number(),
  stock: faker.datatype.number(),
  status: faker.datatype.boolean(),
  thumbnails: Array.from({ length: 3 }, () => faker.image.imageUrl()),
});

export const generateProducts = (count = 100) =>
  Array.from({ length: count }, generateProduct);

export const throwError = (status = 500, message) => {
  console.log("throwError", status, message);
  const error = new Error(message);
  error.status = status;
  console.log("throwError", error.status);
  throw error;
};
