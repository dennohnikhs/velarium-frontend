import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth";
import locations from "./slices/master/locations";
import incomesources from "./slices/master/incomesources";
import businesssectors from "./slices/master/businesssectors";
import members from "./slices/members/members";

import groupMembers from "./slices/access/groupMember";
import groups from "./slices/access/groups";
import permissions from "./slices/access/permissions";
import users from "./slices/access/users";
import entities from "./slices/master/entity";
import entityLineOfBusinesses from "./slices/master/entity-line-of-businesses";
import entityMappings from "./slices/master/entity-mappings";
import entityTypes from "./slices/master/entity-types";
import lineOfBusiness from "./slices/master/line-of-business";
import policyInfo from "./slices/master/policy-information";
import vehicleColors from "./slices/master/vehicle-colors";
import vehicleMakes from "./slices/master/vehicle-makes";
import vehicleModels from "./slices/master/vehicle-model";
import vehiclePaintTypes from "./slices/master/vehicle-paint-types";
import cancellationReasons from "./slices/master/cancellation-reasons";
import qrPolicyInfo from "./slices/comms/qr";
import masterDataSummary from "./slices/master/data-summary";
import historicalPolicies from "./slices/master/historical-policies";

const reducer = combineReducers({
  auth, 
  locations,
  incomesources,
  businesssectors,
  members,

  entities,
  entityTypes,
  entityMappings,
  users,
  groupMembers,
  groups,
  permissions,
  lineOfBusiness,
  vehicleMakes,
  vehicleModels,
  vehicleColors,
  vehiclePaintTypes,
  policyInfo,
  entityLineOfBusinesses,
  cancellationReasons,
  qrPolicyInfo,
  masterDataSummary,
  historicalPolicies
} as const);

const persistConfig: Omit<PersistConfig<State>, "blacklist" | "whitelist"> &
  Partial<Record<"blacklist" | "whitelist", (keyof State)[]>> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig as any, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const useDispatch = () => store.dispatch;

const persistor = persistStore(store);

// types below
export type Dispatch = typeof store.dispatch;
export type State = ReturnType<typeof reducer>;
declare global {
  export type State = ReturnType<typeof reducer>;
}

export { persistor, store, useDispatch };
