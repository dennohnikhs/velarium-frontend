import Iconify from "components/Iconify";
import { usePermissionsContextProvider } from "contexts/PermissionsContext";
import { TOptions } from "i18next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { joinPaths, RouteChild } from "utils/navigation";
import { useTranslate } from "utils/useTranslation";
import { NamespacesObj } from "../../translations";

const useNavConfig = () => {
  const { permissionsSet } = usePermissionsContextProvider();

  const { asPath } = useRouter();
  const translate = useTranslate();
  const menus = _menus(translate);

  const filteredMenus = useMemo(() => {
    return menus
      .map((menu) => {
        if (menu.permissions) {
          const hasParentPermission = menu.permissions.every((permission) =>
            permissionsSet.has(permission)
          );

          if (!hasParentPermission) {
            return null; // Skip the menu if the parent doesn't have required permissions
          }
        }

        let filteredChildren: NavConfigChild[];

        if (menu.children) {
          filteredChildren = (menu.children || []).filter((child) => {
            if (child.permissions) {
              return child.permissions.every((permission) =>
                permissionsSet.has(permission)
              );
            }
            return true;
          });

          if (filteredChildren.length === 0) {
            return null; // Skip the menu if no child has required permissions
          }
        }

        return {
          ...menu,
          children: filteredChildren,
        };
      })
      .filter(Boolean);
  }, [menus, permissionsSet]);

  const current = useMemo(() => {
    return menus.find(
      (menu) => menu.path.includes(asPath) || asPath.includes(menu.path)
    );
  }, [asPath, menus]);

  const currentChild = useMemo(() => {
    if (!current || !current.children?.length) return null;

    return current.children.find((child) => {
      const paths = [current.path, child.path];
      const path = joinPaths(...paths);

      return asPath === path;
    });
  }, [current, asPath]);

  return { menus: filteredMenus, current, currentChild };
};

const NavIcon: FunctionComponent<React.ComponentProps<typeof Iconify>> = (
  props
) => <Iconify {...props} />;

const _menus = (translate: Translate): NavConfig[] => {
  return [
    {
      title: translate("common", "dashboard.title"),
      path: "/dashboard",
      icon: <NavIcon icon="eva:grid-outline" />,
    },
    {
      title: translate("common", "member_data.title"),
      path: "member-information",
      icon: <NavIcon icon="ion:people" />,
      permissions: ["view_policy_information"],
    },
     {
      title: translate("common", "account_data.title"),
      path: "account-information",
      icon: <NavIcon icon="mdi:book" />,
      permissions: ["view_policy_information"],
    },
    {
      title: translate("common", "uam.title"),
      path: "/access/",
      icon: <NavIcon icon="ion:people" />,
      children: [
        new RouteChild(translate("common", "uam.items.users"), "users", [
          "view_users",
        ]),
        new RouteChild(translate("common", "uam.items.groups"), "groups", [
          "view_groups",
        ]),
      ],
    },
   
    // {
    //   title: translate("common", "master_data.items.policy_info"),
    //   path: "policy-information",
    //   icon: <NavIcon icon="ic:sharp-policy" />,
    //   permissions: ["view_policy_information"],
    // },
    // {
    //   title: translate("common", "master_data.title"),
    //   path: "/master/",
    //   icon: <NavIcon icon="ri:database-2-fill" />,
    //   children: [
    //     new RouteChild(
    //       translate("common", "master_data.items.make"),
    //       "vehicle-make",
    //       ["view_vehicle_make"]
    //     ),
    //     new RouteChild(
    //       translate("common", "master_data.items.model"),
    //       "vehicle-model",
    //       ["view_vehicle_model"]
    //     ),
    //     new RouteChild(
    //       translate("common", "master_data.items.lof"),
    //       "line-of-business",
    //       ["view_lines_of_business"]
    //     ),
    //     new RouteChild(
    //       translate("common", "master_data.items.entity_type"),
    //       "entity-types",
    //       ["view_entity_type"]
    //     ),
    //     new RouteChild(
    //       translate("common", "master_data.items.entity"),
    //       "entities",
    //       ["view_insurances"]
    //     ),
    //     new RouteChild(
    //       translate("common", "master_data.items.entity_mappings"),
    //       "entity-mappings",
    //       ["view_entity_mapping"]
    //     ),
    //   ],
    // },
    {
      title: translate("common", "reports.title"),
      path: "/report/",
      icon: <NavIcon icon="ion:book-sharp" />,
      children: [
        new RouteChild(
          translate("common", "reports.items.deposits"),
          "historical-policies",
          ["list_historical_policies"]
        ),
      ],
    },
  ];
};

export type NavConfigs = NavConfig[];
export type NavConfig = {
  title: string;
  path: string;
  icon: React.ReactElement;
  children?: NavConfigChild[];
  permissions?: string[];
};

export type PermissionsSet = Set<string>;

export type NavConfigChild = {
  title: string;
  path: string;
  permissions?: string[];
};

type Translate = <T extends keyof NamespacesObj>(
  namespace: T,
  text: Join<DotNotation<NamespacesObj[T]>, ".">,
  options?: TOptions
) => string;

export default useNavConfig;
