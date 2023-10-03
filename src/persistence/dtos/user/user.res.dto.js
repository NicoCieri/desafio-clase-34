export default class UserResDTO {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.cart = user.cart;
    this.role = user.role;
  }
}
