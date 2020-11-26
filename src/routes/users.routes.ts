import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import multer from "multer";
import uploadConfig from "../config/upload";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userRetorno = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userRetorno);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      const userRetorno = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        avatar: user.avatar,
      };

      return response.json(userRetorno);
    } catch (err) {
      return response.status(err.statusCode).json({ erro: err.message });
    }
  }
);

export default usersRouter;
