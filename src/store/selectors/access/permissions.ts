import { createDraftSafeSelector } from "@reduxjs/toolkit";
import groupBy from "lodash.groupby";

const selectPermissionsState = (state: State) => state.permissions;

export const selectPermissions = createDraftSafeSelector(
  selectPermissionsState,
  (permissions) => permissions
);

export const selectGroupedPermissions = createDraftSafeSelector(
  selectPermissions,
  (state) => {
    const data = state.permissions?.data ?? [];
    const loading = state.permissions?.loading == true && data.length > 0;

    return {
      permissions: groupBy(state.permissions.data, "model"),
      loading,
      refreshing: loading && data.length > 0,
    };
  }
);

const selectSessionPermissions = createDraftSafeSelector(
  selectPermissions,
  (state) =>
    state.session ?? {
      loading: false,
      data: [],
    }
);

export { selectSessionPermissions };
