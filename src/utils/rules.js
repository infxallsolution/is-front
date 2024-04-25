const clientRules = {
    identification: [
      {
        required: true,
        message: "Por favor ingrese su identificación!",
      },
    ],
    businessName: [
      {
        required: true,
        message: "Por favor ingresa su razón social!",
      },
    ],
    email: [
      {
        required: true,
        message: "Por favor ingresa su correo electrónico!",
      },
      {
        type: "email",
        message: "Por favor ingresa un correo electrónico valido!",
      },
    ],
    contactNumber: [
      {
        required: true,
        message: "Por favor ingresa su numero de contacto!",
      },
    ],
    address: [
      {
        required: true,
        message: "Por favor ingresa su dirección!",
      },
    ],
    type: [
      {
        required: true,
        message: "Por favor seleccione un tipo de cliente!",
      },
    ],
  };

export { clientRules };