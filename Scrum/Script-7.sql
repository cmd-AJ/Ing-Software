create table Usuarios(
	DPI varchar(13) primary key,
	Nombre varchar(30),
	Apellidos varchar(30),
	Contrasena varchar(250),
	Telefono varchar(8),
	Email varchar(250),
	Municipio varchar(250)
)


create table tipotrabajo(
	nombre_trabajo varchar(100) primary key,
	descripcion varchar(300)	
)

insert into tipotrabajo
values ('Carpintero','artesano que trabaja con madera para crear una variedad de objetos, desde muebles y estructuras hasta elementos decorativos y artísticos.' )
select * from usuarios u 

create table Trabajador(
	DPI varchar(15),
	nombre_trabajo varchar(100)
)


alter table trabajador  add constraint forTipotrabajo
	foreign key (nombre_trabajo)
	references tipotrabajo(nombre_trabajo)


create table Chats(
	IDchat Serial primary key,
	DPIreceptor varchar(100),
	DPIemisor varchar(100)
)

insert into chats(DPIreceptor,DPIemisor )
values ('XXXX XXXXX XXXX', 'XXXX XXXXX XXXX')


alter table chats  add constraint fkey_dpiemisor
	foreign key (DPIemisor)
	references usuarios(DPI)
	
alter table chats  add constraint fkey_dpireceptor
	foreign key (DPIreceptor)
	references usuarios(DPI)

	
	
	
	
create table Resena(
	IDresena varchar(100) primary key,
	calificacion int, 
	descripcion varchar(250),
	id_trabajador varchar(100),
	id_empleador varchar(100)
)





create table trabajoDisponible(
	idTrabajo varchar(100) primary key,
	descripcion varchar(250),
	estado varchar(250),
	Municipio varchar(50),
	DPIempleador varchar(13),
)

create table completado(
	idTrabajo varchar(100) primary key,
	estado varchar(250),
	idResena varchar(100),
	DPItrabajador varchar(13),
	DPIempleador varchar(13)
)

create table threads(
	idthreads varchar(100) primary key,
	createdbyuser varchar(100),
	descripcion varchar(250),
	titulo varchar(100),
	etiquetas varchar(100)
)

create table mensajethreads(
	idmensaje varchar(100) primary key,
	idusuario varchar(100),
	contenido varchar(250)
)

create table moderadores( 
	idmoderador varchar(100) primary key,
	nombre varchar(30)
)

create table reporte(
	idreporte varchar(100) primary key,
	reportuser varchar(100),
	emisor varchar(100),
	estado varchar(100),
	contenido(250)	
	
)


create table suspendido(
	idsuspend varchar(100),
	DPI varchar(13),
	fecha date,
	tiempoban date,
	estado varchar(100)
	  
)


select * from usuarios


alter table usuarios 
add municipio varchar(100)

alter table usuarios 
add imagen varchar(255)

alter table usuarios 
add rating float


alter table usuarios 
add sexo varchar(10)


alter table usuarios 
add fecha_nacimiento varchar(10)





