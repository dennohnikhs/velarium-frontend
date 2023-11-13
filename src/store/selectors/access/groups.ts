import { createDraftSafeSelector } from "@reduxjs/toolkit";

const groupsSelector = (state: State) => state.groups;

const selectAllGroups = createDraftSafeSelector(groupsSelector, (state) => ({
  data: [],
  loading: false,
  ...state.groups,
}));

const selectGroupById = (id: string) => {
  return createDraftSafeSelector(groupsSelector, (state) => {
    return {
      group: state.groups.data?.find((group) => group.id === id) || null,
      loading: state.groups.loading,
    };
  });
};

export { selectAllGroups, selectGroupById };
