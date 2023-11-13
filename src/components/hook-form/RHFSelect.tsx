// form
// @mui
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Iconify from "components/Iconify";
import debounce from "lodash.debounce";
import get from "lodash.get";
import React, { useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
// ----------------------------------------------------------------------

type GetOptionProps = <T extends object = any>(
  option: T,
  index: number
) => Partial<TextFieldProps>;

interface IProps {
  name: string;
  children?: any;
  options?: {
    label: string;
    val: string;
    options: any[];
    getOptionProps?: GetOptionProps;
    default?: {
      label: string;
      value?: any;
    };
  };
}
type Props = IProps & TextFieldProps;

const Option = styled("option")(() => ({}));

function Select({ name, children, options, ...other }: Props) {
  const { control } = useFormContext();
  const isNative = useMemo(
    () => !!other.SelectProps?.native,
    [other.SelectProps?.native]
  );

  const Component = useMemo(() => (isNative ? Option : MenuItem), [isNative]);
  const defaultValue = options?.default?.value ?? "";
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FilterContext.Consumer>
          {({ setFilter, filter }) => (
            <TextField
              {...field}
              defaultValue={defaultValue}
              value={
                typeof field.value === "undefined" || field.value == null
                  ? ""
                  : field.value
              }
              onChange={(e) => {
                field.onChange(e);
              }}
              error={!!error}
              helperText={error?.message}
              fullWidth
              {...other}
              select
              SelectProps={{
                native: isNative,
                ...other.SelectProps,
                onClose() {
                  setTimeout(() => setFilter(""), 400);
                },
              }}
            >
              {!!options && !!options.default && (
                <Component disabled value={defaultValue}>
                  {options.default.label ?? "Select option"}
                </Component>
              )}
              {!isNative && !!options && options?.options?.length > 30 && (
                <Component
                  {...(!isNative && { disableRipple: true })}
                  sx={({ palette }) => ({
                    position: "sticky",
                    top: 0,
                    backgroundColor: `${palette.background.default} !important`,
                    zIndex: 1,
                  })}
                >
                  <OutlinedInput
                    fullWidth
                    size="small"
                    color="secondary"
                    defaultValue={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    onKeyUp={(e) => e.stopPropagation()}
                    placeholder="Type to search..."
                    endAdornment={
                      <InputAdornment position="end">
                        <Iconify
                          icon="eva:search-fill"
                          width={20}
                          height={20}
                          color="grey.500"
                        />
                      </InputAdornment>
                    }
                  />
                </Component>
              )}

              {!!options
                ? options.options?.map((option, index) => {
                    const label = get(option, options.label);
                    const value = get(option, options.val);
                    const hidden =
                      !!filter &&
                      !label?.toLowerCase().includes(filter?.toLowerCase());

                    return (
                      <Component
                        value={value}
                        key={`${label}-${index}`}
                        sx={
                          hidden
                            ? {
                                display: "none",
                              }
                            : {}
                        }
                      >
                        {label}
                      </Component>
                    );
                  })
                : children}
            </TextField>
          )}
        </FilterContext.Consumer>
      )}
    />
  );
}

export default function RHFSelect(props) {
  const [state, setState] = useState({ filter: "" });
  const setFilter = debounce((filter: string) => {
    setState((state) => ({ ...state, filter }));
  }, 600);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setFilter,
      }}
    >
      <Select {...props} />
    </FilterContext.Provider>
  );
}

const FilterContext = React.createContext({
  filter: "",
  setFilter: (value: string) => {
    value;
  },
});
