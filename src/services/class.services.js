export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return items;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      return item ?? false;
    } catch (error) {
      console.log("getById service");
      throw new Error(error.message);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      return newItem ?? false;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      return await this.dao.update(id, obj);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      return await this.dao.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
