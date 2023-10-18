# Entregable logging y performance Clase 34

Para correr el proyecto es necesario crear el archivo `.env` y setear las credenciales de Mongo Atlas `DB_USER` y `DB_PASSWORD`. También setear `PRIVATE_KEY` con `"1234"`.
Para poder enviar los emails es necesario setear las variables `EMAIL` y `EMAIL_PASSWORD` con las credenciales de una cuenta de gmail.

Para ejecutar el proyecto en modo de desarrollo, se debe setear la variable `NODE_ENV` con el valor `DEV`.

## Comandos

- `npm start`: Levanta el proyecto en el puerto 8080.
- `npm run dev`: Levanta el proyecto y actualiza el servidor con cada cambio guardado.

## Vistas

- [localhost:8080/login](http://localhost:8080/login): Login de usuario.
- [localhost:8080/register](http://localhost:8080/register): Registro de usuario.
- [localhost:8080/products](http://localhost:8080/products): Listado de productos.
- `localhost:8080/cart`: Listado de items del cart perteneciente al usuario logueado.

## Endpoints

### Sessions

- `GET /api/sessions/current`: Retorna el usuario logueado, con DTO para evitar exponer datos sensibles como la contraseña.

### Users

- `POST /api/users/register`: Crea un usuario nuevo.
- `GET /api/users/register-front`: Crea un usuario nuevo y redirecciona a la página de login.
- `POST /api/users/login`: Loguea un usuario existente.
- `POST /api/users/login-front`: Loguea un usuario existente y redirecciona a la página de productos.
- `GET /api/users/logout`: Desloguea al usuario logueado.
- `GET /api/users/logout-front`: Desloguea al usuario logueado y redirecciona a la página de login.

### Products

- `GET /api/products/mockingproducts`: Retorna un listado de 100 productos mockeados. (**NUEVO**)
- `GET /api/products`: Retorna todos los productos paginados. Recibe parámetros opcionales: `limit`, `page`, `sort`, `category` y `available`
- `GET /api/products/:id`: Retorna el producto por id.
- `POST /api/products`: Crea un producto nuevo. Se debe enviar con archivo de imagen. Solo el admin puede acceder a este endpoint.
- `PUT /api/products/:id`: Edita el producto. Se debe enviar con archivo de imagen. Solo el admin puede acceder a este endpoint.
- `DELETE /api/products/:id`: Elimina el producto enviado. Solo el admin puede acceder a este endpoint.

### Cart

- `GET /api/carts`: Retorna todos los carts.
- `GET /api/carts/:id`: Retorna el cart por id.e
- `POST /api/carts`: Crea un cart nuevo.
- `POST /api/carts/product/:productId`: Agrega un producto al cart. Si ya existe, aumenta su cantidad en uno. Valida que tanto el cart como el product existan.
- `DELETE /api/:id/product/:productId`: Elimina el producto seleccionado.
- `PUT /api/:id`: Actualiza los items del cart. Debe recibir en el body un array con este formato:

```
{
  "items": [{
    "product": "64bd3cff240f2bd3d6b69d14",
    "quantity": 2
  }, {
    "product": "64bd408b3c050f9830a8acc9",
    "quantity": 3
  }]
}
```

- `PUT "/:id/product/:productId`: Actualiza la cantidad del producto seleccionado. Por ejemplo:

```
{
  "quantity": 10
}
```

- `DELETE "/id"`: Remover el cart seleccionado.
- `POST "/:id/purchase`: Realiza la compra del cart seleccionado. Compra solo los productos con suficiente stock y los quita del cart. El resto de los productos se quedan en el cart y los retorna en una propiedad `unavailable`. Se envía un mail al usuario con el detalle de la compra.

### Tickets

- `GET /ticket`: Retorna todos los tickets. Solo el admin puede acceder a este endpoint.
- `GET /ticket/:id`: Retorna el ticket por id. Solo el admin puede acceder a este endpoint.
