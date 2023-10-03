import ProductService from "../services/product.services.js";
import * as cartService from "../services/cart.services.js";

const productService = new ProductService();

export const productsView = async (req, res) => {
  try {
    const { user } = req;
    const { page } = req.query;
    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
    } = await productService.getAllPaginated({ page, limit: 2 });

    const plainProducts = products.map((product) => product.toObject());

    res.render("products", {
      ...(user && { user: user.toObject() }),
      products: plainProducts,
      totalPages,
      currentPage,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink: `/products?page=${prevPage}`,
      nextLink: `/products?page=${nextPage}`,
    });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
};

export const cartView = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = user.cart;
    const cart = await cartService.getById(_id);
    const plainItems = cart.items.map((item) => ({
      ...item.toObject(),
      totalPrice: item.product.price * item.quantity,
    }));
    res.render("cart", {
      items: plainItems,
      id: cart._id,
      ...(user && { user: user.toObject() }),
    });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
};

export const registerView = (req, res) => {
  res.render("register");
};

export const errorRegisterView = (req, res) => {
  res.render("errorRegister");
};

export const loginView = (req, res) => {
  res.render("login");
};

export const errorLoginView = (req, res) => {
  res.render("errorLogin");
};
