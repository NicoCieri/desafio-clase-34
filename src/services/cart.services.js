import ProductDaoMongoDB from "../persistence/daos/mongodb/product.dao.js";
import factory from "../persistence/daos/factory.js";

const { cartDao } = factory;

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
  try {
    const response = await cartDao.getAll();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    return cart || false;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const create = async () => {
  try {
    const newCart = await cartDao.create();
    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const cart = await cartDao.getById(id);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const newCart = await cartDao.addProductToCart(id, productId);
    return newCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeProductFromCart = async (id, productId) => {
  try {
    const cart = await cartDao.getById(id);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.removeProductFromCart(id, productId);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCartItems = async (id, items) => {
  try {
    // validate products exist
    const products = await productDao.getAll();
    const productsIds = products.map((product) => product._id.toString());
    const itemsIds = items.map((item) => item.product.toString());
    const productsExist = itemsIds.every((id) => productsIds.includes(id));
    if (!productsExist) throw new Error("Product not found");

    // validate items format
    const itemsFormat = items.every(
      (item) => item.product && item.quantity >= 0
    );
    if (!itemsFormat) throw new Error("Invalid items format");

    const updatedCart = await cartDao.updateCartItems(id, items);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductQuantity = async (id, productId, quantity) => {
  try {
    const cart = await cartDao.getById(id);
    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.updateProductQuantity(
      id,
      productId,
      quantity
    );
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeProducts = async (id) => {
  try {
    const cart = await cartDao.getById(id);

    if (!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.removeProducts(id);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};
