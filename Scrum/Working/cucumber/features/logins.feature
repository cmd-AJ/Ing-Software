Feature: Realize login exitoso
  Todo usuario puede meter sus credenciales pero se debe de dautenticar

  Scenario: login exitoso
    Given Tengo mis credenciales, DPI y password, empleador 
    When Pido iniciar sesion para buscar a alguien
    Then reviso base de datos
    And devuelve estado si existe el usuario
