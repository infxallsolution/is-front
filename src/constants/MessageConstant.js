import { message } from "antd"


const errosMessages = [
    {
        errorId: "ERROR-GENERAL",
        message: "Ups! Intetelo mas tarde o comuniquese a soporte"
    },
    {
        errorId: "EXITO-GENERAL-CREADO",
        message:"Su registro ha sido creado con exito"
    },
    {
        errorId: "EXITO-GENERAL-ACTUALIZADO",
        message:"Su registro ha sido actualizado con exito"
    },
    {
        errorId: "INFO-NOMBRE-USUARIO",
        message: "Verifique si el usuario no esta creado"
    },
    {
        errorId: "EXITO-GENERAL-ELIMINADO",
        message:"Su registro ha sido eliminado con exito"
    },
]

class MessageConstant {

    static get = (error) => {
        return errosMessages.filter(x => x.errorId == error)[0].message
    }
}

export default MessageConstant

