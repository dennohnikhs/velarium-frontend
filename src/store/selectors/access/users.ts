import { createDraftSafeSelector } from "@reduxjs/toolkit";

const usersSelector = (state: State) => state.users;

const selectUsers = createDraftSafeSelector(usersSelector, (state) => {
  const data = state.users.data ?? [];
  const loading = state.users.loading;

  return {
    loading: loading === true && !data.length,
    errored: loading === "error" && !data.length,
    data,
    refreshing: loading && data.length > 0,
  };
});

const selectUser = (id: string) => {
  return createDraftSafeSelector(usersSelector, (state) => {
    //console.log(state.users.data.find((user) => user.id === id));
    return state.users.data.find((user) => user.id === id);
  });
};

const selectUsersLoading = createDraftSafeSelector(
  usersSelector,
  (state) => state.users.loading
);

export { selectUser, selectUsers, selectUsersLoading };
