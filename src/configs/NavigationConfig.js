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
  CarOutlined
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
        title: "Indicadores",
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
        path: `${APP_PREFIX_PATH}/admin/clients/list`,
        title: "Clientes",
        icon: UsergroupAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules",
        path: `${APP_PREFIX_PATH}/admin/module`,
        title: "Modulos",
        icon: UnorderedListOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
  {
    key: "Modules",
    path: `${APP_PREFIX_PATH}/modules`,
    title: "Modulos",
    icon: YuqueOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "modules.admin",
        path: `${APP_PREFIX_PATH}/modules/administracion`,
        title: "Administracion",
        icon: IdcardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.bascule",
        path: `${APP_PREFIX_PATH}/modules/bascula`,
        title: "Bascula",
        icon: ColumnHeightOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.frontDesk",
        path: `${APP_PREFIX_PATH}/modules/reception`,
        title: "Porteria",
        icon: CarOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.payroll",
        path: `${APP_PREFIX_PATH}/modules/nomina`,
        title: "Nomina",
        icon: CreditCardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.commercial",
        path: `${APP_PREFIX_PATH}/modules/commercial`,
        title: "Comercial",
        icon: GoldOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.laboratory",
        path: `${APP_PREFIX_PATH}/modules/laboratorio`,
        title: "Laboratorio",
        icon: ExperimentOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.production",
        path: `${APP_PREFIX_PATH}/modules/produccion`,
        title: "Produccion",
        icon: DeploymentUnitOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "modules.equipment",
        path: `${APP_PREFIX_PATH}/modules/equipment`,
        title: "Equipos",
        icon: DesktopOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ]
  }
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
