import { QRPolicyInfo } from "@models/comms/qr";
import { createSlice } from "@reduxjs/toolkit";
import { reduxGetQRPolicyInfo } from "store/actions/comms/qr";

const initialState: QRPolicyInfoState = {
  policy_info: {
    data: {
      risk_id: "",
      status: "",
      policy_date_from: "",
      policy_date_to: "",
      cert_number: "",
    },
    loading: false,
  },
};

const qrPolicyInfo = createSlice({
  name: "qr policy info",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetQRPolicyInfo.fulfilled, (state, action) => {
        state.policy_info = {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(reduxGetQRPolicyInfo.pending, (state) => {
        state.policy_info = {
          ...state.policy_info,
          loading: true,
        };
      })
      .addCase(reduxGetQRPolicyInfo.rejected, (state) => {
        state.policy_info = {
          ...state.policy_info,
          loading: "error",
        };
      });
  },
});

type QRPolicyInfoState = {
  policy_info: {
    data: QRPolicyInfo;
    loading: Loading;
  };
};

export default qrPolicyInfo.reducer;
