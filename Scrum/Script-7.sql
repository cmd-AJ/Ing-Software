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

	
	
select * from chats

create table mensaje(
	id_mensaje serial primary key,
	id_chat int ,
	contenido text
)

insert into mensaje(id_chat, contenido) 
values(5, 'Hola me llamo Peter')



alter table mensaje add constraint fkey_mensaje
	foreign key (id_chat)
	references chats(IDchat)
	
	
create table Resena(
	IDresena serial primary key,
	idtrabajo int,
	calificacion float, 
	descripcion text,
	dpi_trabajador int,
	dpi_empleador int
)


alter table resena 
alter column dpi_trabajador type varchar(15)

alter table resena 
alter column dpi_empleador type varchar(15)


alter table resena  add constraint fkey_dpitrab
	foreign key (dpi_trabajador)
	references usuarios(dpi)

alter table resena  add constraint fkey_dpiempleador
	foreign key (dpi_empleador)
	references usuarios(dpi)
	

select * from resena

select * from trabajodisponible




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
	


create table moderadores( 
	idmoderador serial primary key,
	nombre varchar(30),
	DPI varchar(15)
)


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
	

create table suspendido(
	idsuspend serial primary key,
	DPI varchar(15),
	fechainicio date,
	unban date,
	estado bool	  
)

--Suspendido? tal vez agregar un event trigger (Posible solucion)

select * from suspendido

alter table suspendido add constraint dpireportado
	foreign key (dpi)
	references usuarios(dpi)

select * from suspendido


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





