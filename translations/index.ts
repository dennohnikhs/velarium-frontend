// @ts-check

import clc from "cli-color";
import { config } from "dotenv";
config();

import { processLocale, sortLocales } from "./helpers";
import { AuthNamespace } from "./namespaces/auth";
import { CommonNamespace } from "./namespaces/common";
import { MembersNamespace } from "./namespaces/members";


import { VehicleMakeNameSpace } from "./namespaces/vehicle-make";
import { ModelsNameSpace } from "./namespaces/models";
import { BusinessNameSpace } from "./namespaces/business";
import { EntityTypeNameSpace } from "./namespaces/entity-type";
import { UsersNameSpace } from "./namespaces/users";
import { GroupsNameSpace } from "./namespaces/groups";
import { PolicyNamespace } from "./namespaces/policy";
import { AccountNamespace } from "./namespaces/account";
import { EntityNameSpace } from "./namespaces/entity";
import { MappingsNameSpace } from "./namespaces/entity-mappings";
import { QRPolicyNamespace } from "./namespaces/qr-policy";

const { locales: _locales, defaultLocale } =
  require("../next-i18next.config").i18n;

const locales = sortLocales(_locales, defaultLocale);

const main = async () => {
  console.log(clc.bold("Starting translations handler...\n"));

  let localeIndex = 0;
  while (localeIndex !== locales.length) {
    const activeLocale = locales[localeIndex];

    await processLocale(activeLocale, defaultLocale);
    localeIndex += 1;
  }
};

export type NamespacesObj = {
  auth: AuthNamespace;
  common: CommonNamespace;
  members: MembersNamespace;


  "vehicle-make": VehicleMakeNameSpace;
  models: ModelsNameSpace;
  business: BusinessNameSpace;
  "entity-type": EntityTypeNameSpace;
  users: UsersNameSpace;
  groups: GroupsNameSpace;
  policy: PolicyNamespace;
  account: AccountNamespace;  
  entity: EntityNameSpace;
  "entity-mappings": MappingsNameSpace;
  "qr-policy": QRPolicyNamespace;
};

export type Namespaces = keyof NamespacesObj;
export type Locales = "sw" | "en" | "pt";

main();
