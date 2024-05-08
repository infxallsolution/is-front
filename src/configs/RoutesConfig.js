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
    path: `${APP_PREFIX_PATH}/admin/modules`,
    component: React.lazy(() => import("views/app-views/admin/modules")),
  },
];