-- Datos de prueba locales. Las contraseñas se guardan como SHA-256 en hex (así las envía el frontend).
-- Usuarios: demo1234   Moderador: admin1234

insert into tipotrabajo(nombre_trabajo, descripcion) values
	('Plomero', 'Instalación y reparación de tuberías'),
	('Electricista', 'Instalaciones eléctricas residenciales'),
	('Carpintero', 'Muebles y trabajos en madera'),
	('Albañil', 'Construcción y remodelación'),
	('Pintor', 'Pintura de interiores y exteriores'),
	('Jardinero', 'Mantenimiento de jardines'),
	('Mecánico', 'Reparación de vehículos');

insert into usuarios(dpi, nombre, apellidos, contrasenia, telefono, email, role, departamento, municipio, imagen, banner, rating, sexo, fecha_nacimiento) values
	('1000000000101', 'Ana', 'López', '0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d', '5555-0101', 'ana@example.com', 'Empleador', 'Guatemala', 'Guatemala', '', '', 0, 'F', '01/01/1995'),
	('1000000000102', 'Carlos', 'Pérez', '0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d', '5555-0102', 'carlos@example.com', 'Empleado', 'Guatemala', 'Mixco', '', '', 4.5, 'M', '15/03/1990'),
	('1000000000103', 'María', 'García', '0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d', '5555-0103', 'maria@example.com', 'Empleado', 'Guatemala', 'Villa Nueva', '', '', 4.0, 'F', '20/07/1992');

insert into trabajador(dpi, nombre_trabajo) values
	('1000000000102', 'Plomero'),
	('1000000000103', 'Electricista');

insert into moderadores(nombre, dpi, password) values
	('Admin', '9000000000001', 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270');
