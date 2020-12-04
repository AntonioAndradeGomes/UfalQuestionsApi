import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import multer from "multer";
import uploadConfig from "../config/upload";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {

    //console.log(request.body);
    const { nome, email, password, cursoId } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      nome,
      email,
      password,
      cursoId
    });

    const userRetorno = {
      id: user.id,
      name: user.nome,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      curso: user.curso
    };

    return response.json(userRetorno);

});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userRetorno = {
      id: user.id,
      name: user.nome,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar,
      curso: user.curso
    };

    return response.json(userRetorno);
  }
);

export default usersRouter;
