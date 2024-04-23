import {
  DashboardOutlined,
  YuqueOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "sidenav.dashboard.default",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "Admin",
    path: `${APP_PREFIX_PATH}/admin`,
    title: "Administracion",
    icon: UsergroupAddOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "clients",
        path: `${APP_PREFIX_PATH}/admin/clients`,
        title: "Clientes",
        icon: UsergroupAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules",
        path: `${APP_PREFIX_PATH}/admin/modules`,
        title: "Modulos",
        icon: UnorderedListOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
