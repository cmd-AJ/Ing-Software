Feature: Registrar tus datos exitosamente
  Todo usuario se puede registrar dando sus datos
  Scenario: Registro exitoso exitoso
    Given Tengo mis credenciales, DPI y password, nombres y fecha_nacimiento
    When Quiero registrarme a SABTE
    Then Le pido en la interfaz sus credenciales
    And revisar base de datos si no hay usuario existente
    And luego agregar datos a la base


