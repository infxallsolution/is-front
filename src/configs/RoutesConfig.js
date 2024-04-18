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
        key: 'dashboard.default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard.analytics',
        path: `${APP_PREFIX_PATH}/dashboards/analytics`,
        component: React.lazy(() => import('views/app-views/analytics/index')),
    },
    {
        key: 'pollinitation.farm',
        path: `${APP_PREFIX_PATH}/pollination/farm`,
        component: React.lazy(() => import('views/app-views/pollination/farm')),
    },
    {
        key: 'pollinitation.lot',
        path: `${APP_PREFIX_PATH}/pollination/lot`,
        component: React.lazy(() => import('views/app-views/pollination/lot')),
    },
    {
        key: 'pollinitation.section',
        path: `${APP_PREFIX_PATH}/pollination/section`,
        component: React.lazy(() => import('views/app-views/pollination/section')),
    }
]