import * as yup from "yup";
const withId = <T extends object = yup.AnyObject>(schema: T) => {
  return {
    id: yup
      .string()
      .nullable()
      .when({
        is: (value: T) => !!value,
        then(schema) {
          return schema.required();
        },
      }),
    ...schema,
  };
};

const withOpen = (schema: yup.ObjectShape) => ({
  open: yup.boolean().default(false).strip(),
  ...schema,
});

export { withId, withOpen };
