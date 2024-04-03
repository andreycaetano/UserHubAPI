import { container } from "tsyringe";
import { UserCore } from "../core/user.core";

container.registerSingleton("UserCore",UserCore)