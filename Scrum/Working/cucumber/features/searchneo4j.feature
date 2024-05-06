Feature: Buscar a un trabajador
  Todo usuario se puede registrar dando sus datos
  Scenario: Usuario busca a un empleado
    Given Necesito a un trabajador en base al trabajo
    When Pido buscarlo con la searchbar
    Then usuario mete en la searchbar tipo de trabajo
    And Despliega un listado de trabajadores con el tipo de trabajo buscado


