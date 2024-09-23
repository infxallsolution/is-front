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
  InfoCircleOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import ModuleService from "services/ModuleService";



const modulos = []

const getModules = async () => {
  
  const data = await ModuleService.getModuleActiveByClient('23fd6d18-927a-470e-8d71-f2959a174d1')
  let user = JSON.parse(localStorage.getItem("user"))

  if (data) {
    let dashboard = {
      key: "dashboards-default",
      path: `${APP_PREFIX_PATH}/dashboards/default`,
      title: "Dashboard",
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: [],
    }

    let clientes = {
      key: "clients",
      path: `${APP_PREFIX_PATH}/admin/clients/list`,
      title: "Clientes",
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      submenu: [],
    }

    let modules = {
      key: "modules",
      path: `${APP_PREFIX_PATH}/admin/module`,
      title: "Modulos",
      icon: UnorderedListOutlined,
      breadcrumb: false,
      submenu: [],
    }

    let ieconfiguration = {
      key: "ie-configuration",
      path: `${APP_PREFIX_PATH}/payroll/i-e-configuration`,
      title: "Ingreso y retención",
      icon: InfoCircleOutlined,
      breadcrumb: false,
      submenu: [],
    }

    // console.log('user')
    // if (user.user == 'rgomez') {
      modulos.push(clientes)
      modulos.push(modules)
      modulos.push(ieconfiguration)
    // }
    // modulos.push(dashboard)



    // data.map(item => {
    //     let icono = selectIcon(item.module.icon)
    //       let modulo = {
    //         key: `${item.module.name}`,
    //         path: `${APP_PREFIX_PATH}/modules/${item.module.name}`,
    //         title: item.module.description,
    //         icon: icono,
    //         breadcrumb: false,
    //         submenu: [],
    //       }
    //     modulos.push(modulo)
    //   }
    // )
    return modulos
  }

}


const selectIcon = (textIcon) => {
  let icono = CarOutlined

  switch (textIcon) {
    case 'DeploymentUnitOutlined':icono = DeploymentUnitOutlined; break;
    case 'ExperimentOutlined':icono = ExperimentOutlined; break;
    case 'GoldOutlined':icono = GoldOutlined;break;
    case 'IdcardOutlined':icono = IdcardOutlined; break;
    case 'ColumnHeightOutlined':icono = ColumnHeightOutlined ;break;
    case 'CreditCardOutlined':icono = CreditCardOutlined; break;
    case 'HeatMapOutlined':icono = HeatMapOutlined; break;
    case 'CarOutlined':icono = CarOutlined; break;
    default:icono = CarOutlined; break;
  }
  return icono
}



const navigationConfig = await getModules();

export default navigationConfig;
