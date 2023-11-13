import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateUserMemberPayload,
  CreateMemberPayload,
} from "@models/api/members/members";
import { BusinessesPayload } from "@models/api/master";
import { EmploymentPayload } from "@models/api/master";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { isRejected, isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import { FormProvider } from "components/hook-form";
import { membersUrls } from "features/members/urls";
import useForm from "hooks/useForm";
import { useRouter } from "next/router";
import { cloneElement, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "store";
import {
  reduxCreateUserMember,
  reduxCreateMember,
} from "store/actions/members/members";

import { reduxCreateEmployment } from "store/actions/master/employment";

import { reduxCreateBusiness } from "store/actions/master/businesses";
import { withId } from "utils/schema";
import { useTranslate } from "utils/useTranslation";
import * as yup from "yup";
import { defaultValues, steps, Values } from "./steps";
import { formatDate } from "utils/formatDate";
import { Member } from "@models/members/members";

//added for payment purposes------------------
import { CreatePaymentPayload } from "@models/api/master";
import { reduxAddPayment } from "store/actions/master/payment";
import InitiateRegDialog from "features/members/members/forms/InitiateRegDialog";

const MembersFormStepper: FunctionComponent<MembersFormProps> = ({
  member,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setuserId] = useState(0);
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

  //add payment modal==========
  const [initiateDialogOpen, setInitiateDialogOpen] = useState(false);
  const handleCloseInitiateDialog = () => {
    setInitiateDialogOpen(false);
  };

  const handleInitiateAction = () => {
    const data: CreatePaymentPayload = {
      member_id: userId,
    };
    const action = reduxAddPayment;

    return dispatch(
      action({
        ...data,
      })
    ).then((payload) => {
      if (isRejected(payload)) {
        if (isRejectedWithValue(payload)) {
          console.log("FORM ERRORS", payload);
        }
      } //else replace(accessUrls.groupListCreate());
    });

    //console.log("Initiating action for user with ID:", selectedUserId);

    handleCloseInitiateDialog();
  };
  //==========================

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
    if (!isLast) return `${translate("members", "dialog.next_button")}`;
    return methods.getValues("id" as any)
      ? `${translate("members", "dialog.update_title")}`
      : `${translate("members", "dialog.add_title")}`;
  }, [isLast, methods]);

  const onSubmit = methods.handleSubmit((values: any) => {
    console.log(values);
    const currentStep = activeStep;

    //if (canGoNext) return goNext();
    if (canGoNext) {
      if (currentStep === 0) {
        const currentTimeStamp = Date.now();
        const data: CreateUserMemberPayload = {
          first_name: values.basicinfo.first_name,
          last_name: values.basicinfo.last_name,
          email: `john-${currentTimeStamp}@gmail.com`,
        };

        const action = reduxCreateUserMember;
        console.log("user data from form", data);

        return dispatch(
          action({
            ...data,
          })
        ).then((response) => {
          if (isRejected(response)) {
            if (isRejectedWithValue(response)) {
              console.log("FORM ERRORS FROM USER CREATE", response);
            }
          } else if (isFulfilled(response)) {
            setuserId(response.payload.id);
            const data: CreateMemberPayload = {
              user_id: response.payload.id,
              sacco_id: "9d875cbe-c397-4488-84ff-fcfdb8a8352b",
              member_location_id: values.basicinfo.member_location_id,
              personal_id: "ttthdcsch",
              phone_no: values.basicinfo.phone_no,
              gender: values.basicinfo.gender,
              marital_status: values.basicinfo.marital_status,
              dob: formatDate(values.basicinfo.dob, {
                format: "yyyy-MM-dd hh:mm:ss",
              }),
              registration_fee_status: "PAID",

              // income_source_id: values.basicinfo.income_source_id,

              //for test
              // user_id: response.payload.id,
              // sacco_id: "0659b1bc-4866-4d4f-aaa7-3eab8c0b6fbb",
              // member_location_id: values.basicinfo.member_location_id,
              // dob: formatDate(values.basicinfo.dob, {
              //   format: "yyyy-MM-dd hh:mm:ss",
              // }),
              // personal_id: "ttthdcsch",
              // tax_id_no: "merry",
              // phone_no: values.basicinfo.phone_no,
              // gender: values.basicinfo.gender,
              // marital_status: values.basicinfo.marital_status,
              // postal_address:"wewrrrr",
              // income_source_id: values.basicinfo.income_source_id,
              // monthly_contribution: "500",
              // remittance_method: "MPESA PAYBILL",
            };
            console.log("==================");
            console.log("member data from form", data);
            console.log("==================");

            const action = reduxCreateMember;

            return dispatch(
              action({
                ...data,
              })
            ).then((response) => {
              if (isRejected(response)) {
                if (isRejectedWithValue(response)) {
                  console.log("FORM ERRORS FROM MEMBER CREATE", response);
                }
              } else if (isFulfilled(response)) {
                goNext(); // Directly go to the next step
              } else replace(membersUrls.memberListCreate());
            });
          } else replace(membersUrls.memberListCreate());
        });
      } else {
        alert("======this is step is=====", activeStep);
      }
    } else {
      const id: any = values.id;
      const data: CreateUserMemberPayload = {
        first_name: values.basicinfo.first_name,
        last_name: values.basicinfo.last_name,
        // email: values.basicinfo.email,
      };
      //const action = id ? reduxUpdateMember : reduxCreateUserMember;

      const action = reduxCreateUserMember;
      console.log("user data from form", data);

      return dispatch(
        action({
          ...data,
          id,
        })
      ).then((response) => {
        if (isRejected(response)) {
          if (isRejectedWithValue(response)) {
            console.log("FORM ERRORS FROM USER CREATE", response);
          }
        } else if (isFulfilled(response)) {
          const data: CreateMemberPayload = {
            user_id: response.payload.id,
            sacco_id: "b7d5b4ac-0e09-45de-a435-c2225f74fabd",
            member_location_id: values.moreinformation.member_location_id,
            dob: formatDate(values.moreinformation.dob, {
              format: "yyyy-MM-dd hh:mm:ss",
            }),
            personal_id: values.moreinformation.personal_id,
            tax_id_no: values.moreinformation.tax_id_no,
            phone_no: values.moreinformation.phone_no,
            gender: values.moreinformation.gender,
            marital_status: values.moreinformation.marital_status,
            postal_address: values.moreinformation.postal_address,
            income_source_id: values.moreinformation.income_source_id,
            monthly_contribution: values.moreinformation.monthly_contribution,
            remittance_method: values.moreinformation.remittance_method,
          };
          console.log("==================");
          console.log("member data from form", data);
          console.log("==================");

          const action = reduxCreateMember;

          return dispatch(
            action({
              ...data,
              id,
            })
          ).then((response) => {
            if (isRejected(response)) {
              if (isRejectedWithValue(response)) {
                console.log("FORM ERRORS FROM MEMBER CREATE", response);
              }
            } else if (isFulfilled(response)) {
              console.log("Busniess");

              //Business payload
              const memberID = response.payload.id;
              const data: BusinessesPayload = {
                member_id: response.payload.id,
                business_name: values.businessinformation.business_name,
                business_address: values.businessinformation.business_address,
                business_sector_id:
                  values.businessinformation.business_sector_id,
                business_location_id:
                  values.businessinformation.business_location_id,
                business_monthly_income:
                  values.businessinformation.monthly_contribution,
              };

              console.log("=================");

              console.log("Business");

              console.log(data);
              console.log("=================");

              const action = reduxCreateBusiness;

              return dispatch(
                action({
                  ...data,
                  id,
                })
              ).then((response) => {
                if (isRejected(response)) {
                  console.log(response);
                  console.log("SUCCESS BUSINESS");
                  if (isRejectedWithValue(response)) {
                    console.log("FORM ERRORS BUSINESS CREATE", response);
                  }
                } else if (isFulfilled(response)) {
                  //Employment payload
                  const data: EmploymentPayload = {
                    member_id: memberID,
                    employer_name: values.employmentinformation.employer_name,
                    employer_address:
                      values.employmentinformation.employer_address,
                    employment_position:
                      values.employmentinformation.employment_position,
                    staff_no: values.employmentinformation.staff_no,
                    date_employed: formatDate(
                      values.employmentinformation.date_employed,
                      {
                        format: "yyyy-MM-dd hh:mm:ss",
                      }
                    ),
                    monthly_income: values.employmentinformation.monthly_income,
                  };
                  const action = reduxCreateEmployment;

                  console.log(data);

                  return dispatch(
                    action({
                      ...data,
                      id,
                    })
                  ).then((response) => {
                    console.log("SUCCESS EMPLOYMENT");
                    if (isRejected(response)) {
                      if (isRejectedWithValue(response)) {
                        console.log(
                          "FORM ERRORS FROM EMPLOYMENT CREATE",
                          response
                        );
                      }
                    } else if (isFulfilled(response)) {
                      //documents upload
                      // TODO: DOC UPLOAD
                      replace(membersUrls.memberListCreate());
                      // const data: EmploymentPayload = {
                      //   member_id: memberID,
                      //   document_name: values.attachments.document_name,
                      //   document_url: values.attachments.document_url,
                      // };
                      // const action = reduxCreateEmployment;

                      // return dispatch(
                      //   action({
                      //     ...data,
                      //     id,
                      //   })
                      // ).then((response) => {
                      //   if (isRejected(response)) {
                      //     if (isRejectedWithValue(response)) {
                      //       console.log("FORM ERRORS DOCUMENTS CREATE", response);
                      //     }
                      //   } else replace(membersUrls.memberListCreate());
                      // });
                    } else replace(membersUrls.memberListCreate());
                  });
                } else replace(membersUrls.memberListCreate());
              });
            } else replace(membersUrls.memberListCreate());
          });
        } else replace(membersUrls.memberListCreate());
      });
    }

    /////
  });

  useEffect(() => {
    if (member) {
      methods.reset({
        // id: member.id,
        info: {
          first_name: "",
          last_name: "",
          email: "",
          // password :member.password
        },
      });
    }
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
            {translate("members", "dialog.back_button")}
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
      <InitiateRegDialog
        open={initiateDialogOpen}
        onClose={handleCloseInitiateDialog}
        onInitiate={handleInitiateAction}
        userId={userId}
      />
    </>
  );
};

export type MembersFormProps = {
  member: Member | null;
};
export { MembersFormStepper };
