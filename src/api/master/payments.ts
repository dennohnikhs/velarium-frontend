import { CreatePaymentPayload } from "@models/api/master";
import { Payments } from "@models/master";
import api from "api/api";

export const apiAddPayment = (data: CreatePaymentPayload) =>
  api.post("/dough/pay-reg-fee", data).then((a) => a.data);