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
  BarcodeOutlined,
  ToolFilled,
  BoxPlotFilled
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
        path: `${APP_PREFIX_PATH}/administration/users`,
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
      {
        key: "inventory-parameters", // Unique identifier for the submenu item
        title: "Parámetros",
        icon: ToolFilled, // Optional icon for the submenu item
        breadcrumb: false,
        submenu: [
          {
            key: "product-inventory", // Unique identifier for the submenu item
            path: `${APP_PREFIX_PATH}/inventory/parameters/product`,
            title: "Productos",
            icon: ToolFilled, // Optional icon for the submenu item
            breadcrumb: true,
            submenu: [
            ] 
          },
          {
            key: "warehouse-inventory", // Unique identifier for the submenu item
            path: `${APP_PREFIX_PATH}/inventory/parameters/warehouse`,
            title: "Bodegas",
            icon: BoxPlotFilled, // Optional icon for the submenu item
            breadcrumb: false,
            submenu: [
            ] 
          },
        ] 
      },
      
      
      {
        key: "movements-inventory", // Unique identifier for the submenu item
        path: `${APP_PREFIX_PATH}/inventory/movements`,
        title: "Movimientos",
        icon: ToolFilled, // Optional icon for the submenu item
        breadcrumb: true,
        submenu: [
        ] // Nested submenus (if any)
      }
    ]
  },

]


const navigationConfig = navigationTree;

export default navigationConfig;
