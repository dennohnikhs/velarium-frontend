import { createDraftSafeSelector } from "@reduxjs/toolkit";

const membersSelector = (state: State) => state.members;

const selectAllMembers = createDraftSafeSelector(membersSelector, (state) => {
  console.log('dddddddddddd',state)

  const data = state.members.data ?? [];
  const loading = state.members.loading;

  return {
    loading: loading === true && !data.length,
    errored: loading === "error" && !data.length,
    data,
    refreshing: loading && data.length > 0,
  };
});

const selectMember = (id: string) => {
  return createDraftSafeSelector(membersSelector, (state) => {
    //console.log(state.users.data.find((user) => user.id === id));
    return state.members.data.find((member) => member.id === id);
  });
};

const selectMembersLoading = createDraftSafeSelector(
  membersSelector,
  (state) => state.members.loading
);

export { selectMember, selectAllMembers, selectMembersLoading };
