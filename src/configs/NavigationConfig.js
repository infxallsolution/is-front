import { DashboardOutlined, YuqueOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


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
    key: "pollination",
    path: `${APP_PREFIX_PATH}/pollination`,
    title: "Pollination",
    icon: YuqueOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "Farm",
        path: `${APP_PREFIX_PATH}/pollination/farm`,
        title: "Farm",
        icon: YuqueOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "Lot",
        path: `${APP_PREFIX_PATH}/pollination/lot`,
        title: "Lot",
        icon: YuqueOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "Section",
        path: `${APP_PREFIX_PATH}/pollination/section`,
        title: "Section",
        icon: YuqueOutlined,
        breadcrumb: false,
        submenu: [],
      }
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
