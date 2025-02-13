import {
  DashboardOutlined,
  SettingOutlined ,
  InboxOutlined,
  ImportOutlined,
  UnorderedListOutlined,
  ColumnHeightOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  CheckSquareOutlined ,
  ExperimentOutlined,
  DeploymentUnitOutlined,
  ShopOutlined,
  HomeOutlined ,
  InteractionOutlined,
  ExportOutlined, 
  ShoppingCartOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import ModuleService from "services/ModuleService";







const navigationConfigDos = [
  {
				key: 'settings',
				path: '',
				title: 'Configuracion',
				icon: SettingOutlined,
				submenu: [
          
					{
						key: 'admin_activity',
						path: `${APP_PREFIX_PATH}/composter/admin_activity`,
						title: 'Administrar actividades',
						icon: SettingOutlined,
						submenu: []
					},
					{
						key: 'admin_store',
						path: `${APP_PREFIX_PATH}/composter/admin_store`,
						title: 'Administrar bodegas',
						icon: SettingOutlined,
						submenu: []
					},
					{
						key: 'admin_machine',
						path: `${APP_PREFIX_PATH}/composter/admin_machine`,
						title: 'Administrar maquinas',
						icon: SettingOutlined,
						submenu: []
					},
					{
						key: 'admin_products',
						path: `${APP_PREFIX_PATH}/composter/admin_products`,
						title: 'Administrar productos',
						icon: SettingOutlined,
						submenu: []
					},
		]
	},
  {
    key: 'create_lots',
    path: `${APP_PREFIX_PATH}/composter/create_lots`,
    title: 'Lotes productivos',
    icon: InboxOutlined,
    submenu: []
  },
  {
    key: 'internal_movement',
    path: `${APP_PREFIX_PATH}/composter/internal_movement`,
    title: 'Movimiento interno',
    icon: ImportOutlined,
    submenu: []
  },
  {
    key: 'transfer',
    path: `${APP_PREFIX_PATH}/composter/transfer`,
    title: 'Traslados',
    icon: ExportOutlined,
    submenu: []
  },
  {
    key: 'dispatch',
    path: `${APP_PREFIX_PATH}/composter/dispatch`,
    title: 'Despachos',
    icon: ShoppingCartOutlined,
    submenu: []
  },
  {
    key: 'report_movements',
    path: `${APP_PREFIX_PATH}/composter/report_movements`,
    title: 'Reporte de movimientos',
    icon: UnorderedListOutlined,
    submenu: []
  },
  {
    key: 'report_movement_details',
    path: `${APP_PREFIX_PATH}/composter/report_movement_details`,
    title: 'Reporte de actividades',
    icon: UnorderedListOutlined,
    submenu: []
  }
]



/*
const modulos = []

const getModules = async () => {
  
  const data = await ModuleService.getModuleActiveByClient('438c053b-cd32-4bb7-a2bf-70ddb1e07c7c')
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
      icon: CheckSquareOutlined ,
      breadcrumb: false,
      submenu: [],
    }

    

    let modules = {
      key: "modules",
      path: `${APP_PREFIX_PATH}/admin/module`,
      title: "Modulos",
      icon: CheckSquareOutlined ,
      breadcrumb: false,
      submenu: [],
    }

    if (user.user == 'jpineda') {
       modulos.push(clientes)
       modulos.push(modules)
    }

///trae los modulos registrados en la BASE DE DATOS
    data.map(item => {
        let icono = selectIcon(item.module.icon)
          let modulo = {
            key: `${item.module.name}`,
            path: `${APP_PREFIX_PATH}/composter/${item.module.name}`,
            title: item.module.description,
            icon: icono,
            breadcrumb: false,
            submenu: [],
          }
        modulos.push(modulo)
      }
    )
    return modulos
  }

}


const selectIcon = (textIcon) => {
  let icono = CarOutlined

console.log(textIcon)
  switch (textIcon) {
    case 'DeploymentUnitOutlined':icono = DeploymentUnitOutlined; break;
    case 'ExperimentOutlined':icono = ExperimentOutlined; break;
    case 'UnorderedListOutlined':icono = UnorderedListOutlined;break;
    case 'IdcardOutlined':icono = IdcardOutlined; break;
    case 'ColumnHeightOutlined':icono = ColumnHeightOutlined ;break;
    case 'InboxOutlined':icono = InboxOutlined; break;
    case 'HomeOutlined':icono = HomeOutlined ; break;
    case 'SettingOutlined':icono = SettingOutlined ; break;
    case 'ExportOutlined':icono = ExportOutlined ; break;
    case 'ImportOutlined':icono = ImportOutlined ; break;    
    default:icono = CheckSquareOutlined; break;
  }
  return icono
}



const navigationConfig = await getModules();*/

export default navigationConfigDos;
