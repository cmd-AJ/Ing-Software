create table Usuarios(
	DPI varchar(15) primary key,
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
	IDresena serial primary key,
	idtrabajo int,
	calificacion float, 
	descripcion text,
	dpi_trabajador int,
	dpi_empleador int
)



create table trabajoDisponible(
	idTrabajo serial primary key,
	descripcion text ,
	titulo varchar(150),
	estado boolean, --Para esto estado se puede referenciar como disponible y en proceso 
	Municipio varchar(250),
	DPIempleador varchar(15)
)


alter table trabajodisponible  add constraint fkey_dpiempleador_detrabajo
	foreign key (DPIempleador)
	references usuarios(dpi)
	
	
select * from completado
--En completado agregar al event trigger para dar el id reseña


select * from completado


create table completado(
	idTrabajo serial primary key,
	estado varchar(250), --Puede ser el motivo
	idResena int,
	DPItrabajador varchar(15),
	DPIempleador varchar(15)
)




create table threads(
	idthreads serial primary key,
	usuario varchar(20), --Quien creo el thread Tomar nota solo dos o tres iniciales
	descripcion text,
	titulo varchar(100),
	etiquetas text[] -- array de strings, para accesar al array no se prueba con 0
)

alter table threads 
alter column usuario type varchar(20)

insert into threads(usuario, descripcion, titulo, etiquetas)
values( 'AJ3834', 'Creen que Jose e Ving son los mejores trabajadores?', 'Necesito informacion de ellos', Array['trabajador','efieciente'] )


create table mensajethreads(
	idmensaje serial primary key,
	idthread int,
	contenido text,
	DPI_emisor varchar(15),
	usuario varchar(20)
)


alter table mensajethreads  add constraint mensajethread
	foreign key (idthread)
	references threads(idthreads)
	
insert into mensajethreads(idthread, contenido, dpi_emisor, usuario)
values(1, 'No los recomiendo la verdad', '3834 49898 0101', 'AJ3834')



create table moderadores( 
	idmoderador serial primary key,
	nombre varchar(30),
	DPI varchar(15)
)

insert into moderadores (nombre, DPI)
values('Andre Jo','3834 49898 0101')


create table reporte(
	idreporte serial primary key,
	dpireportuser varchar(15),
	dpiemisor varchar(15),
	estado bool, --falso es en proceso de ver y --true si ya se completo el reporte
	contenido text	
)

alter table reporte  add constraint dpiquereporta
	foreign key (dpiemisor)
	references usuarios(dpi)


alter table reporte  add constraint dpireportado
	foreign key (dpireportuser)
	references usuarios(dpi)
	
insert into reporte (dpireportuser, dpiemisor, estado, contenido)
values('3810 35859 0101', '3834 49898 0101', false, 'No me gusto el comentario que hizo en threads' )


create table suspendido(
	idsuspend serial primary key,
	DPI varchar(15),
	fechainicio date,
	unban date,
	estado bool	  
)



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





