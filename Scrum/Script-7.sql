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


-- create table Trabajador(
	--DPI varchar(13) primary key,
	--nombre_trabajo
--)


create table Chats(
	IDchat varchar(100) primary key,
	IDreceptor varchar(100),
	IDEmisor varchar(100),
	IDmensaje varchar(100),
	mensaje varchar(100)
)

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
