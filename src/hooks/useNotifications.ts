import { ProviderContext, useSnackbar } from "notistack";
import { useMemo } from "react";

export default function useNotifications(): ProviderContext {
  const { enqueueSnackbar: _enqueueSnackbar, ...other } = useSnackbar();

  const enqueueSnackbar = useMemo(
    () => (message: any, options: any) => {
      const _default = _enqueueSnackbar(message, {
        persist: false,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        ...options,
      });

      return _default;
    },
    [_enqueueSnackbar]
  ) as unknown as ProviderContext["enqueueSnackbar"];

  return {
    ...other,
    enqueueSnackbar,
  };
}

export type EnqueueSnackbar = ProviderContext["enqueueSnackbar"];
