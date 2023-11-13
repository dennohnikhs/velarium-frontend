import { ValidatePolicyInfoRes } from "@models/api/master";
import { PolicyInfo, PolicyInfoSummary } from "@models/master";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxAddPolicyInfo,
  reduxGetAllPolicyInfo,
  reduxGetPolicyInfoSummary,
  reduxUpdatePolicyInfo,
  reduxValidatePolicyInfo,
} from "store/actions/master/policy-information";

const initialState: PolicyInfoState = {
  policy_info: {
    data: [],
    loading: false,
    validated: {
      valid: false,
    },
  },
};

const policyInfo = createSlice({
  name: "policy-information",
  initialState,
  reducers: {
    resetValidationState: (state) => {
      state.policy_info.validated.valid = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all policy info
      .addCase(reduxGetAllPolicyInfo.fulfilled, (state, action) => {
        state.policy_info = {
          ...state.policy_info,
          data: [...action.payload],
          loading: false,
        };
      })
      .addCase(reduxGetAllPolicyInfo.pending, (state) => {
        state.policy_info = {
          ...state.policy_info,
          data: [...state.policy_info.data],
          loading: true,
        };
      })
      .addCase(reduxGetAllPolicyInfo.rejected, (state) => {
        state.policy_info = {
          ...state.policy_info,
          data: [...state.policy_info.data],
          loading: "error",
        };
      })
      //validate policy
      .addCase(reduxValidatePolicyInfo.fulfilled, (state, { payload }) => {
        state.policy_info = {
          ...state.policy_info,
          validated: payload,
          loading: false,
        };
      })
      // add policy info
      .addCase(reduxAddPolicyInfo.fulfilled, (state, { payload }) => {
        state.policy_info = {
          ...state.policy_info,
          data: [...state.policy_info.data, payload],
          loading: false,
        };
      })
      // update policy info
      .addCase(reduxUpdatePolicyInfo.fulfilled, (state, action) => {
        state.policy_info = {
          ...state.policy_info,
          loading: false,
          data: [
            ...state.policy_info.data.map((policy) =>
              policy.id !== action.payload?.id
                ? policy
                : action.payload ?? policy
            ),
          ],
        };
      })
      // get all policy info summary
      .addCase(reduxGetPolicyInfoSummary.fulfilled, (state, action) => {
        state.policy_info = {
          ...state.policy_info,
          summary: action.payload,
          loading: false,
        };
      });
  },
});

type PolicyInfoState = {
  policy_info: {
    data: PolicyInfo[];
    loading: Loading;
    summary?: PolicyInfoSummary;
    validated: ValidatePolicyInfoRes;
  };
};

export const { resetValidationState } = policyInfo.actions;

export default policyInfo.reducer;
