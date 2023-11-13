/**
 *
 * param title The title of this route
 * param path Can be an empty string for the root path
 * returns
 */
class RouteChild {
  public path: string;
  public title: string;
  public permissions?: string[];

  constructor(title: string, path: string, permissions: string[] = []) {
    if (path === "/") throw "Please use an empty string instead of a /";
    if (path.startsWith("/"))
      throw "Route child paths should not start with a /";

    this.title = title;
    this.path = path;
    this.permissions = permissions;

    this.get_instance = this.get_instance.bind(this);
  }

  get_instance() {
    return this;
  }
}

const joinPaths = (...paths: (string | number)[]): string => {
  const path = paths.reduce((prev, _current, index) => {
    const current = _current?.toString() ?? "";
    if (index === 0) return `/${normalizeStartEndSlashes(current)}`;

    const path = normalizeStartEndSlashes(current);

    prev += `/${path}`;

    return prev;
  }, "");

  if (path?.toString().endsWith("/")) return path?.toString();
  return `${path}/`;
};

const normalizeStartEndSlashes = (str: string) =>
  str
    .split("/")
    .filter((v) => v !== "")
    .join("/");

export { RouteChild, joinPaths };
