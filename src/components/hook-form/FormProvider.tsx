import {
  BaseSyntheticEvent,
  CSSProperties,
  FormEventHandler,
  ReactNode,
} from "react";
// form
import { FormProvider as Form, UseFormReturn } from "react-hook-form";
// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  onSubmit?: (e: BaseSyntheticEvent<any>) => void;
  style?: CSSProperties | undefined;
};

type NoWrapProps = {
  noWrap?: boolean;
};

type SharedProps<T, T1, T2> = {
  methods: UseFormReturn<T, T1, T2>;
  children: ReactNode;
  onChangeCapture?: FormEventHandler<HTMLFormElement>;
};

export default function FormProvider<
  T extends object = {},
  T1 extends object = any,
  T2 extends object = any
>({
  onChangeCapture,
  ...props
}: (Props | NoWrapProps) & SharedProps<T, T1, T2>) {
  return (
    <Form {...props.methods}>
      {(props as any).noWrap ? (
        props.children
      ) : (
        <form
          onSubmit={(props as any).onSubmit}
          style={(props as any).style}
          onChangeCapture={onChangeCapture}
        >
          {props.children}
        </form>
      )}
    </Form>
  );
}
