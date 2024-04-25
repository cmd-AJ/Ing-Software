Feature: Editar usuario
  Todo usuario puede cambiar sus datos ya sea municipalidad, sexo u otro
  Scenario: Editar usuario en modal
    Given Tengo una imagen
    And vivo en otra municipalidad
    When pido cambiar mis datos
    Then se edita en el modal para agregar imagenes y municipalidad