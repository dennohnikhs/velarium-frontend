import { joinPaths } from "utils/navigation";

const root = "/auth/" as const;

const authUrls = {
  root: () => root,
  login: () => joinPaths(root, "login"),
  register: () => joinPaths(root, "register"),
  reset: () => joinPaths(root, "reset"),
  forgot: () => joinPaths(root, "forgot"),
} as const;

export { authUrls };
