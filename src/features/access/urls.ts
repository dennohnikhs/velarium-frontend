import { joinPaths } from "utils/navigation";

const root = "/access/";
const groups_root = joinPaths(root, "groups");

const accessUrls = {
  root: () => root,
  groupListCreate() {
    return groups_root;
  },
  groupDetail(id: string) {
    return joinPaths(groups_root, id);
  },
  editGroup(id: string) {
    return joinPaths(groups_root, id, "edit");
  },
  createGroup() {
    return joinPaths(groups_root, "create");
  },
};

export { accessUrls };
