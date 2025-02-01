import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
  {
    key: "dashboard.default",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    component: React.lazy(() => import("views/app-views/dashboards/default")),
  },
  {
    key: "users.admin",
    path: `${APP_PREFIX_PATH}/administration/users`,
    component: React.lazy(() => import("views/app-views/admin/users/user")),
  },
  {
    key: "users.list.admin",
    path: `${APP_PREFIX_PATH}/administration/userList`,
    component: React.lazy(() => import("views/app-views/admin/users/userList")),
  },
  {
    key: "thirdpart.admin",
    path: `${APP_PREFIX_PATH}/administration/thirdparty`,
    component: React.lazy(() => import("views/app-views/admin/thirdparty/thirdparty")),
  },
  {
    key: "document-type.inventory",
    path: `${APP_PREFIX_PATH}/inventory/parameters/document-type`,
    component: React.lazy(() => import("views/app-views/inventory/parameters/inventoryDocument")),
  },
  {
    key: "supplier.inventory",
    path: `${APP_PREFIX_PATH}/inventory/parameters/supplier`,
    component: React.lazy(() => import("views/app-views/inventory/parameters/supplier")),
  },
  {
    key: "product.inventory",
    path: `${APP_PREFIX_PATH}/inventory/parameters/product`,
    component: React.lazy(() => import("views/app-views/inventory/parameters/product")),
  },
  {
    key: "warehouse.inventory",
    path: `${APP_PREFIX_PATH}/inventory/parameters/warehouse`,
    component: React.lazy(() => import("views/app-views/inventory/parameters/warehouse")),
  },
  {
    key: "movements.inventory",
    path: `${APP_PREFIX_PATH}/inventory/movements`,
    component: React.lazy(() => import("views/app-views/inventory/movements/movements")),
  },
  // {
  //   key: "dashboard.analytics",
  //   path: `${APP_PREFIX_PATH}/dashboards/analytics`,
  //   component: React.lazy(() => import("views/app-views/analytics/index")),
  // },
  // {
  //   key: "clients.register",
  //   path: `${APP_PREFIX_PATH}/admin/clients/register/:id`,
  //   component: React.lazy(() =>
  //     import("views/app-views/admin/clients/register")
  //   ),
  // },
  // {
  //   key: "clients.register",
  //   path: `${APP_PREFIX_PATH}/admin/clients/register`,
  //   component: React.lazy(() =>
  //     import("views/app-views/admin/clients/register")
  //   ),
  // },
  // {
  //   key: "clients.list",
  //   path: `${APP_PREFIX_PATH}/admin/clients/list`,
  //   component: React.lazy(() =>
  //     import("views/app-views/admin/clients/listClients")
  //   ),
  // },
  // {
  //   key: "modules",
  //   path: `${APP_PREFIX_PATH}/admin/module`,
  //   component: React.lazy(() => import("views/app-views/admin/module")),
  // },
  // {
  //   key: "modules.admin",
  //   path: `${APP_PREFIX_PATH}/modules/administracion`,
  // },
  // {
  //   key: "modules.bascule",
  //   path: `${APP_PREFIX_PATH}/modules/bascula`,
  // },
  // {
  //   key: "modules.porteria",
  //   path: `${APP_PREFIX_PATH}/modules/reception`,
  // }
];