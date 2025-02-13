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
    key: "dashboard.analytics",
    path: `${APP_PREFIX_PATH}/dashboards/analytics`,
    component: React.lazy(() => import("views/app-views/analytics/index")),
  },
  {
    key: "clients.register",
    path: `${APP_PREFIX_PATH}/admin/clients/register/:id`,
    component: React.lazy(() =>
      import("views/app-views/admin/clients/register")
    ),
  },
  {
    key: "clients.register",
    path: `${APP_PREFIX_PATH}/admin/clients/register`,
    component: React.lazy(() =>
      import("views/app-views/admin/clients/register")
    ),
  },
  {
    key: "clients.list",
    path: `${APP_PREFIX_PATH}/admin/clients/list`,
    component: React.lazy(() =>
      import("views/app-views/admin/clients/listClients")
    ),
  },
  {
    key: "modules",
    path: `${APP_PREFIX_PATH}/admin/module`,
    component: React.lazy(() => import("views/app-views/admin/module")),
  },
  {
    key: "insert_movement",
    path: `${APP_PREFIX_PATH}/composter/insert_movement`,
    component: React.lazy(() =>
      import("views/app-views/composter/InsertMovement")
    ),
  },
  {
    key: "internal_movement",
    path: `${APP_PREFIX_PATH}/composter/internal_movement`,
    component: React.lazy(() =>
      import("views/app-views/composter/InternalMovement")
    ),
  },
  {
    key: "admin_store",
    path: `${APP_PREFIX_PATH}/composter/admin_store`,
    component: React.lazy(() =>
      import("views/app-views/composter/FormStore")
    ),
  },
  {
    key: "admin_machine",
    path: `${APP_PREFIX_PATH}/composter/admin_machine`,
    component: React.lazy(() =>
      import("views/app-views/composter/FormMachine")
    ),
  },
  {
    key: "admin_products",
    path: `${APP_PREFIX_PATH}/composter/admin_products`,
    component: React.lazy(() =>
      import("views/app-views/composter/FormProduct")
    ),
  },
  {
    key: "create_lots",
    path: `${APP_PREFIX_PATH}/composter/create_lots`,
    component: React.lazy(() =>
      import("views/app-views/composter/FormLot")
    ),
  },
  {
    key: "admin_activity",
    path: `${APP_PREFIX_PATH}/composter/admin_activity`,
    component: React.lazy(() =>
      import("views/app-views/composter/FormActivity")
    ),
  },
  {
    key: "formats",
    path: `${APP_PREFIX_PATH}/composter/formats`,
    component: React.lazy(() =>
      import("views/app-views/composter/formats")
    ),
  },
  {
    key: "transfer",
    path: `${APP_PREFIX_PATH}/composter/transfer`,
    component: React.lazy(() =>
      import("views/app-views/composter/TransferMaterial")
    ),
  },
  {
    key: "dispatch",
    path: `${APP_PREFIX_PATH}/composter/dispatch`,
    component: React.lazy(() =>
      import("views/app-views/composter/Dispatch")
    ),
  },
  {
    key: "report_movements",
    path: `${APP_PREFIX_PATH}/composter/report_movements`,
    component: React.lazy(() =>
      import("views/app-views/composter/ReportMovements")
    ),
  },
  {
    key: "report_movement_details",
    path: `${APP_PREFIX_PATH}/composter/report_movement_details`,
    component: React.lazy(() =>
      import("views/app-views/composter/ReportMovementDetails")
    ),
  },
];