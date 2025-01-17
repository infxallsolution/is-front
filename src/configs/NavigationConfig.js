import {
  DashboardOutlined,
  YuqueOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  ColumnHeightOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  DeploymentUnitOutlined,
  GoldOutlined,
  CarOutlined,
  HeatMapOutlined,
  UserSwitchOutlined,
  ToolOutlined,
  BarcodeOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import ModuleService from "services/ModuleService";


let navigationTree = [
  {
    key: "dashboard-default",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    title: "Dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "administration",
    title: "Administración",
    icon: ToolOutlined,
    breadcrumb: false,
    submenu: [ // Array of submenu items
      {
        key: "user-administration", // Unique identifier for the submenu item
        path: `${APP_PREFIX_PATH}/users`,
        title: "Usuarios",
        icon: UserSwitchOutlined, // Optional icon for the submenu item
        breadcrumb: true,
        submenu: [
        ] // Nested submenus (if any)
      }
    ]
  },
  {
    key: "inventory",
    title: "Inventarios",
    icon: BarcodeOutlined,
    breadcrumb: false,
    submenu: [ // Array of submenu items
    ]
  },

]


const navigationConfig = navigationTree;

export default navigationConfig;
