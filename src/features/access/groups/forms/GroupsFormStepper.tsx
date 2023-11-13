/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import { Group } from "@models/access/groups";
import { CreateUserGroupPayload } from "@models/api/access/groups";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { FormProvider } from "components/hook-form";
import { accessUrls } from "features/access/urls";
import useForm from "hooks/useForm";
import { useRouter } from "next/router";
import { cloneElement, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "store";
import {
  reduxCreateUserGroup,
  reduxUpdateUserGroup,
} from "store/actions/access/groups";
import { withId } from "utils/schema";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";
import { defaultValues, steps, Values } from "./steps";

const GroupsFormStepper: FunctionComponent<GroupsFormProps> = ({ group }) => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const translate = useTranslate();

  const { canGoNext, canGoBack, isLast } = useMemo(() => {
    const canGoNext = activeStep < steps.length - 1;
    const canGoBack = activeStep > 0;
    const isLast = activeStep === steps.length - 1;

    return {
      canGoBack,
      canGoNext,
      isLast,
    };
  }, [activeStep]);

  const schema = useMemo(() => {
    const shape = steps.reduce((prev, current, index) => {
      if (index <= activeStep)
        return {
          ...prev,
          [current.key]: current.schema,
        };
      return prev;
    }, {});

    return yup.object().shape(withId(shape));
  }, [activeStep]);

  const goBack = useCallback(
    () => setActiveStep((step) => (canGoBack ? step - 1 : step)),
    [canGoBack]
  );

  const goNext = useCallback(
    () => setActiveStep((step) => (canGoNext ? step + 1 : step)),
    [canGoNext]
  );

  const methods = useForm<Values, any, Values>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const buttonLabel = useMemo(() => {
    if (!isLast) return `${translate("groups", "dialog.next_button")}`;
    return methods.getValues("id" as any)
      ? `${translate("groups", "dialog.update_title")}`
      : `${translate("groups", "dialog.add_title")}`;
  }, [isLast, methods]);

  const onSubmit = methods.handleSubmit((values) => {
    if (canGoNext) return goNext();
    const permission_ids = values.permissions?.permission_ids ?? {};
    const id = values.id;

    const data: CreateUserGroupPayload = {
      name: values.info.name,
      description: values.info.description,
      permission_ids: Object.entries(permission_ids).reduce(
        (prev, [key, value]) => {
          if (!value) return prev;
          prev.push(key);
          return prev;
        },
        []
      ),
    };

    const action = id ? reduxUpdateUserGroup : reduxCreateUserGroup;

    console.log(data, values);

    return dispatch(
      action({
        ...data,
        id,
      })
    ).then((payload) => {
      if (isRejected(payload)) {
        if (isRejectedWithValue(payload)) {
          console.log("FORM ERRORS", payload);
        }
      } else replace(accessUrls.groupListCreate());
    });
  });

  useEffect(() => {
    if (group) {
      methods.reset({
        id: group.id,
        info: {
          name: group.name,
          description: group.description,
        },
        permissions: {
          permission_ids: (group.permission_ids ?? []).reduce(
            (prev, current) => ({
              ...prev,
              [current]: true,
            }),
            {}
          ),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stepper {...{ activeStep }} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.key} title={step.key}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormProvider {...{ methods, onSubmit }}>
        {steps.map((step, index) => {
          if (index !== activeStep) return null;

          return (
            <Box key={step.key} pt={4}>
              {cloneElement(step.component, {
                prefix: step.key,
              })}
            </Box>
          );
        })}

        <Stack direction="row" mt={5}>
          <Button
            disabled={!canGoBack}
            type="button"
            variant="textContained"
            disableElevation
            onClick={goBack}
          >
            {translate("groups", "dialog.back_button")}
          </Button>
          <div style={{ flexGrow: 1 }} />

          <LoadingButton
            loading={methods.formState.isSubmitting}
            type="submit"
            variant="contained"
          >
            {buttonLabel}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
};

export type GroupsFormProps = {
  group: Group | null;
};
export { GroupsFormStepper };
