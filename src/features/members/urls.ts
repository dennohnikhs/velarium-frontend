import { joinPaths } from "utils/navigation";

const root = "/member-information/";
// const members_root = joinPaths(root, "members");

const membersUrls = {
  root: () => root,
  memberListCreate() {
    return root;
  },
  memberDetail(id: string) {
    return joinPaths(root, id);
  },
  editMember(id: string) {
    return joinPaths(root, id, "edit");
  },
  memberPayment(id: string) {
    return joinPaths(root, id, "payment");
  },
  createMember() {
    return joinPaths(root, "create");
  },
};

export { membersUrls };
