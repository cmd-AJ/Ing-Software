// Datos de prueba locales para Neo4j (deben coincidir con init/02-seed.sql)
MERGE (:Trabajo {nombre_trabajo: 'Plomero', descripcion: 'Instalación y reparación de tuberías'});
MERGE (:Trabajo {nombre_trabajo: 'Electricista', descripcion: 'Instalaciones eléctricas residenciales'});
MERGE (:Trabajo {nombre_trabajo: 'Carpintero', descripcion: 'Muebles y trabajos en madera'});
MERGE (:Trabajo {nombre_trabajo: 'Albañil', descripcion: 'Construcción y remodelación'});
MERGE (:Trabajo {nombre_trabajo: 'Pintor', descripcion: 'Pintura de interiores y exteriores'});
MERGE (:Trabajo {nombre_trabajo: 'Jardinero', descripcion: 'Mantenimiento de jardines'});
MERGE (:Trabajo {nombre_trabajo: 'Mecánico', descripcion: 'Reparación de vehículos'});

MERGE (:Usuario {dpi: '1000000000101', nombre: 'Ana', apellidos: 'López', municipio: 'Guatemala', rating: '0', imagen: '', telefono: '5555-0101'});
MERGE (:Usuario {dpi: '1000000000102', nombre: 'Carlos', apellidos: 'Pérez', municipio: 'Mixco', rating: '4.5', imagen: '', telefono: '5555-0102'});
MERGE (:Usuario {dpi: '1000000000103', nombre: 'María', apellidos: 'García', municipio: 'Villa Nueva', rating: '4', imagen: '', telefono: '5555-0103'});

MATCH (u:Usuario {dpi: '1000000000102'}), (t:Trabajo {nombre_trabajo: 'Plomero'}) MERGE (u)-[:trabaja_de]->(t);
MATCH (u:Usuario {dpi: '1000000000103'}), (t:Trabajo {nombre_trabajo: 'Electricista'}) MERGE (u)-[:trabaja_de]->(t);
MATCH (a:Usuario {dpi: '1000000000101'}), (b:Usuario {dpi: '1000000000102'}) MERGE (a)-[:confia_en]->(b);
