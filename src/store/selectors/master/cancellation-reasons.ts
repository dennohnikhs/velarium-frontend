import { createDraftSafeSelector } from "@reduxjs/toolkit";

const cancellationReasonsSelector = (state: State) => state.cancellationReasons;

const selectCancellationReasons = createDraftSafeSelector(
  cancellationReasonsSelector,
  (state) => {
    const data = state.cancellation_reasons.data;
    const loading = state.cancellation_reasons.loading;

    return { data, loading: loading === true && !data.length };
  }
);

export { selectCancellationReasons };
