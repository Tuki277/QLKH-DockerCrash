import { Express, Request, Response } from "express";
import { loginController } from "./controllers/login.controller";
import { createPostController, deletePostController, deliveredProductController, filterPostController, findPostByIdController, finishProductController, getPostController, rejectProductController, searchController, updatePostController } from "./controllers/product.controller";
import { createUserController, getCurrentUserController } from "./controllers/user.controller";
import { requiresUser } from "./middleware";
import validateRequest from "./middleware/validateRequest";
import { loginSchema, registerSchema } from "./schema/login.schema";
import { createProductSchema, deleteProductSchema, findProductByIdSchema, finishProductSchema, rejectProductSchema, updateProductSchema } from "./schema/product.schema";

export default function (app: Express) {
    // Test
    app.get("/test", (req: Request, res: Response) => res.send("Hello"));
    app.get("/testjwt", requiresUser, (req: Request, res: Response) => res.send("Hello"));
    // ===========================================================

    //Register user
    //api/register
    app.post("/api/register", validateRequest(registerSchema), createUserController);

    //Login
    //api/login
    app.post("/api/login", validateRequest(loginSchema), loginController)

    app.post("/api/product", [requiresUser, validateRequest(createProductSchema)], createPostController)
    app.get("/api/product", requiresUser, getPostController)
    app.post("/api/product/filter", requiresUser, filterPostController)
    app.patch("/api/product/:id", [requiresUser, validateRequest(updateProductSchema)], updatePostController)
    app.delete("/api/product/:id", [requiresUser, validateRequest(deleteProductSchema)], deletePostController)
    app.patch("/api/product/action=finish/:id", [requiresUser, validateRequest(finishProductSchema)], finishProductController)
    app.patch("/api/product/action=reject/:id", [requiresUser, validateRequest(rejectProductSchema)], rejectProductController)
    app.patch("/api/product/action=delivered/:id", [requiresUser, validateRequest(rejectProductSchema)], deliveredProductController)
    app.get("/api/product/:id", [requiresUser, validateRequest(findProductByIdSchema)], findPostByIdController)
    app.post("/api/search", requiresUser, searchController)
    app.get("/api/currentUser", requiresUser, getCurrentUserController)

}