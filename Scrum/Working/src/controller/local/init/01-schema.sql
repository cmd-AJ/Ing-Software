-- Esquema reconstruido a partir de las consultas en db.js, administration.js y checkrate.js.
-- Scrum/Script-7.sql está desactualizado respecto al código; este archivo es solo para desarrollo local.

create table usuarios(
	dpi varchar(15) primary key,
	nombre varchar(30),
	apellidos varchar(30),
	contrasenia varchar(250),
	telefono varchar(20),
	email varchar(250),
	role varchar(30),
	departamento varchar(100),
	municipio varchar(250),
	imagen text,
	banner text,
	rating float default 0,
	sexo varchar(10),
	fecha_nacimiento varchar(10),
	isworking boolean default false,
	code varchar(50)
);

create table tipotrabajo(
	nombre_trabajo varchar(100) primary key,
	descripcion varchar(300)
);

create table trabajador(
	dpi varchar(15) references usuarios(dpi),
	nombre_trabajo varchar(100) references tipotrabajo(nombre_trabajo) on update cascade on delete cascade
);

create table chats(
	idchat serial primary key,
	dpireceptor varchar(15) references usuarios(dpi),
	dpiemisor varchar(15) references usuarios(dpi),
	hiring boolean default false
);

create table mensaje(
	id_mensaje serial primary key,
	id_chat int references chats(idchat),
	contenido text,
	dpi varchar(15),
	time timestamp default current_timestamp
);

create table resena(
	idresena serial primary key,
	idtrabajo int,
	calificacion float,
	descripcion text,
	dpi_trabajador varchar(15) references usuarios(dpi),
	dpi_empleador varchar(15) references usuarios(dpi)
);

create table trabajodisponible(
	idtrabajo serial primary key,
	descripcion text,
	titulo varchar(150),
	estado boolean,
	municipio varchar(250),
	dpiempleador varchar(15) references usuarios(dpi),
	dpiempleado varchar(15) references usuarios(dpi),
	timestampcita timestamp,
	timestampcontratacion timestamp,
	pago numeric(10, 2),
	avisado boolean default false
);

create table completado(
	idtrabajo serial primary key,
	estado varchar(250),
	idresena int references resena(idresena),
	dpitrabajador varchar(15),
	dpiempleador varchar(15),
	titulo varchar(250),
	imagen text,
	fecha varchar(30),
	fechafin varchar(30),
	pago numeric(10, 2)
);

create table threads(
	idthreads serial primary key,
	dpi_usuario varchar(15) references usuarios(dpi),
	descripcion text,
	post_timestamp timestamp default current_timestamp,
	image text
);

create table mensajethreads(
	idmensaje serial primary key,
	idthread int references threads(idthreads),
	contenido text,
	dpi_emisor varchar(15) references usuarios(dpi),
	mensaje_timestamp timestamp default current_timestamp
);

create table moderadores(
	idmoderador serial primary key,
	nombre varchar(30),
	dpi varchar(15),
	password varchar(250)
);

create table reporte(
	idreporte serial primary key,
	dpireportuser varchar(15) references usuarios(dpi),
	dpiemisor varchar(15) references usuarios(dpi),
	estado boolean default false,
	contenido text,
	fecha timestamp default current_timestamp
);

create table suspendido(
	idsuspend serial primary key,
	dpi varchar(15) references usuarios(dpi),
	fechainicio date,
	unban date,
	estado boolean default false
);

-- Llamado desde /api/pfnework: un trabajador propone un trabajo nuevo.
-- Queda con descripcion null hasta que un admin lo aprueba (/api/gettrabajos, /api/changedescription).
create procedure add_employee(p_trabajo varchar, p_dpi varchar)
language plpgsql as $$
begin
	insert into tipotrabajo(nombre_trabajo, descripcion) values (p_trabajo, null)
	on conflict (nombre_trabajo) do nothing;
	insert into trabajador(dpi, nombre_trabajo) values (p_dpi, p_trabajo);
end;
$$;

-- Llamado desde /api/removework: un admin rechaza la propuesta.
create procedure remove_employee(p_trabajo varchar)
language plpgsql as $$
begin
	delete from trabajador where nombre_trabajo = p_trabajo;
	delete from tipotrabajo where nombre_trabajo = p_trabajo;
end;
$$;

-- El código inserta reseñas sin enlazarlas a completado ni recalcular el rating;
-- el comentario en Script-7.sql indica que eso lo hacía un trigger.
create function on_resena_insert() returns trigger
language plpgsql as $$
begin
	update completado set idresena = new.idresena where idtrabajo = new.idtrabajo;
	update usuarios set rating = (
		select avg(calificacion) from resena where dpi_trabajador = new.dpi_trabajador
	) where dpi = new.dpi_trabajador;
	return new;
end;
$$;

create trigger resena_insert after insert on resena
for each row execute function on_resena_insert();
