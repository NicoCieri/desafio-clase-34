import UserRepository from "../persistence/repository/user.repository.js";
import { createResponse } from "../utils/utils.js";

const userRepository = new UserRepository();

export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userRepository.getByIdDTO(id);
    if (!user) return createResponse(res, 404, { error: "User not found" });
    createResponse(res, 200, user);
  } catch (error) {
    console.log(error);
  }
};
