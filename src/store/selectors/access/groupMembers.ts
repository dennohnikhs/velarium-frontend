import { createDraftSafeSelector } from "@reduxjs/toolkit";

const groupMembersSelector = (state: State) => state.groupMembers;

const selectGroupMembers = createDraftSafeSelector(
  groupMembersSelector,
  (state) => {
    const data = state.groupMembers.data ?? [];

    return {
      data,
    };
  }
);
const selectGroupMember = (id: string) => {
  return createDraftSafeSelector(groupMembersSelector, (state) => {
    return state.groupMembers.data.find(
      (groupMembers) => groupMembers.id === id
    );
  });
};

const selectGroupMemberLoading = createDraftSafeSelector(
  groupMembersSelector,
  (state) => state.groupMembers.loading
);

export { selectGroupMember, selectGroupMembers, selectGroupMemberLoading };
