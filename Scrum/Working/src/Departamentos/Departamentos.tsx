type Municipios = Record<string, string>;
type Municipio = string[]

function Departamentos(dpi: string) {

    const dep : string = dpi.replace(/\s+/g, '').substring(9,11)

    let depsMap : Record<string, string> = {
        '01': 'Guatemala',
        '02': 'El Progreso',
        '03': 'Sacatepequez',
        '04': 'Chimaltenango',
        '05': 'Escuintla',
        '06': 'Santa Rosa',
        '07': 'Solola',
        '08': 'Totonicapan',
        '09': 'Quetzaltenango',
        '10': 'Suchitepequez',
        '11': 'Retalhuleu',
        '12': 'San Marcos',
        '13': 'Huehuetenango',
        '14': 'El Quiche',
        '15': 'Baja Verapaz',
        '16': 'Alta Verapaz',
        '17': 'El Peten',
        '18': 'Izabal',
        '19': 'Zacapa',
        '20': 'Chiquimula',
        '21': 'Jalapa',
        '22': 'Jutiapa'
    }

    return depsMap[dep]
}

function Municipios(dpi: string) {
    const departamento = Departamentos(dpi)
    const muni : string = dpi.replace(/\s+/g, '').substring(11,14)

    const municipios1: Municipios = {
        '01': 'Guatemala',
        '02': 'Santa Catarina Pinula',
        '03': 'San José Pinula',
        '04': 'San José del Golfo',
        '05': 'Palencia',
        '06': 'Chinautla',
        '07': 'San Pedro Ayampuc',
        '08': 'Mixco',
        '09': 'San Pedro Sacatepequez',
        '10': 'San Juan Sacatepequez',
        '11': 'San Raymundo',
        '12': 'Chuarrancho',
        '13': 'Fraijanes',
        '14': 'Amatitlan',
        '15': 'Villa Nueva',
        '16': 'Villa Canales',
        '17': 'San Miguel Petapa',
    }

    const municipios2: Municipios = {
        '01': 'Guastatoya',
        '02': 'Morazan',
        '03': 'San Agustin Acasaguastlan',
        '04': 'San Cristobal Acasaguastlan',
        '05': 'El Jicaro',
        '06': 'Sansare',
        '07': 'Sanarate',
        '08': 'San Antonio La Paz',
    }

    const municipios3: Municipios = {
        '01': 'Antigua',
        '02': 'Jocotenango',
        '03': 'Pastores',
        '04': 'Sumpango',
        '05': 'Santo Domingo Xenacoj',
        '06': 'Santiago Sacatepequez',
        '07': 'San Bartolome Milpas Altas',
        '08': 'San Lucas Sacatepequez',
        '09': 'Santa Lucia Milpas Altas',
        '10': 'Magdalena Milpas Altas',
        '11': 'Santa Maria de Jesus',
        '12': 'Ciudad Vieja',
        '13': 'San Miguel Duenas',
        '14': 'Alotenango',
        '15': 'San Antonio Aguas Calientes',
        '16': 'Santa Catarina Barahona',
    }

    const municipios4: Municipios = {
        '01': 'Chimaltenango',
        '02': 'San José Poaquil',
        '03': 'San Martín Jilotepeque',
        '04': 'San Juan Comalapa',
        '05': 'Santa Apolonia',
        '06': 'Tecpan Guatemala',
        '07': 'Patzun',
        '08': 'San Miguel Pochuta',
        '09': 'Patzicia',
        '10': 'Santa cruz Balanya',
        '11': 'Acatenango',
        '12': 'San Pedro Yepocapa',
        '13': 'San Andrés Itzapa',
        '14': 'Parramos',
        '15': 'Zaragoza',
        '16': 'El Tejar',
    }

    const municipios5: Municipios = {
        '01': 'Escuintla',
        '02': 'Santa Lucia Cotzumalguapa',
        '03': 'La Democracia',
        '04': 'Siquinala',
        '05': 'Masagua',
        '06': 'Tiquisate',
        '07': 'La Gomera',
        '08': 'Guanagazapa',
        '09': 'San José',
        '10': 'Iztapa',
        '11': 'Palín',
        '12': 'San Vicente Pacaya',
        '13': 'Nueva Concepción',
    }


    const municipios6: Municipios = {
        '01': 'Cuilapa',
        '02': 'Barberena',
        '03': 'Santa Rosa de Lima',
        '04': 'Casillas',
        '05': 'San Rafael Las Flores',
        '06': 'Oratorio',
        '07': 'San Juan Tecuaco',
        '08': 'Chiquimulilla',
        '09': 'Taxisco',
        '10': 'Santa María Ixhuatan',
        '11': 'Guazacapan',
        '12': 'Santa Cruz Naranjo',
        '13': 'Pueblo ',
        '14': 'Nueva Santa Rosa',
    }

    const municipios7: Municipios = {
        '01': 'Solola',
        '02': 'San José Chacaya',
        '03': 'Santa María Visitación',
        '04': 'Santa Lucia Utatlan',
        '05': 'Nahuala',
        '06': 'Santa Catarina Ixtahuacan',
        '07': 'Santa Clara La Laguna',
        '08': 'Concepción',
        '09': 'San Andrés Semetabaj',
        '10': 'Panajachel',
        '11': 'Santa Catarina Palopó',
        '12': 'San Antonio Palopó',
        '13': 'San Lucas Tolimán',
        '14': 'Santa cruz La Laguna',
        '15': 'San Pablo La Laguna',
        '16': 'San Marcos La Laguna',
        '17': 'San Juan La Laguna',
        '18': 'San Pedro La Laguna',
        '19': 'Santiago Atitlán',
    }

    const municipios8: Municipios = {
        '01': 'Totonicapan',
        '02': 'San Cristobal Totonicapan',
        '03': 'San Francisco El Alto',
        '04': 'San Andrés Xecul',
        '05': 'Momostenango',
        '06': 'Santa María Chiquimula',
        '07': 'Santa Lucia La Reforma',
        '08': 'San Bartolo Aguas Calientes',
    }

    const municipios9: Municipios = {
        '01': 'Quetzaltenango',
        '02': 'Salcaja',
        '03': 'Olintepeque',
        '04': 'San Carlos Sija',
        '05': 'Sibilia',
        '06': 'Cabrican',
        '07': 'Cajola',
        '08': 'San Miguel Siguila',
        '09': 'San Juan Ostuncalco',
        '10': 'San Mateo',
        '11': 'Concepción Chiquirichapa',
        '12': 'San Martín Sacatepequez',
        '13': 'Almolonga',
        '14': 'Cantel',
        '15': 'Huitán',
        '16': 'Zunil',
        '17': 'Colomba Costa Cuca',
        '18': 'San Francisco La Unión',
        '19': 'El Palmar',
        '20': 'Coatepeque',
        '21': 'Genova Costa Cuca',
        '22': 'Flores Costa Cuca',
        '23': 'La Esperanza',
        '24': 'Palestina de los Altos',
    }

    const municipios10: Municipios = {
        '01': 'Mazatenango',
        '02': 'Cuyotenango',
        '03': 'San Francisco Zapotitlan',
        '04': 'San Bernardino',
        '05': 'San José El Ídolo',
        '06': 'Santo Domingo Suchitepequez',
        '07': 'San Lorenzo',
        '08': 'Samayac',
        '09': 'San Pablo Jocopilas',
        '10': 'San Antonio Suchitepequez',
        '11': 'San Miguel PAnam',
        '12': 'San Gabriel',
        '13': 'Chicacao',
        '14': 'Patulul',
        '15': 'Santa Barbara',
        '16': 'San Juan Bautista',
        '17': 'Santo Tomás La Unión',
        '18': 'Zunilito',
        '19': 'Pueblo Nuevo',
        '20': 'Río Bravo',
    }

    const municipios11: Municipios = {
        '01': 'Retalhuleu',
        '02': 'san Sebastian',
        '03': 'Santa Cruz Mulua',
        '04': 'San Martín Zopotitlan',
        '05': 'San Felipe',
        '06': 'San Andrés Villa Seca',
        '07': 'Champerico',
        '08': 'Nuevo San Carlos',
        '09': 'El Asintal',
    }

    const municipios12: Municipios = {
        '01': 'San MArcos',
        '02': 'San Pedro Sacatepequez',
        '03': 'San Antonio Sacatepequez',
        '04': 'Comitancillo',
        '05': 'San Miguel Ixtahuacan',
        '06': 'Concepción Tutuapa',
        '07': 'Tacana',
        '08': 'Sibinal',
        '09': 'Tajumulco',
        '10': 'Tejutla',
        '11': 'San Rafael Pie de la Cuesta',
        '12': 'Nuevo Progreso',
        '13': 'El Tumbador',
        '14': 'San José El Rodeo',
        '15': 'Malacatan',
        '16': 'Catarina',
        '17': 'Ayutla (Tecun Uman)',
        '18': 'Ocos',
        '19': 'San Pablo',
        '20': 'El Quetzal',
        '21': 'La Reforma',
        '22': 'Pajapita',
        '23': 'Ixchiguan',
        '24': 'San José Ojetenan',
        '25': 'san Cristobal Cucho',
        '26': 'Sipacapa',
        '27': 'Esquipulas Palo Gordo',
        '28': 'Río Blanco',
        '29': 'San Lorenzo',
    }

    const municipios13: Municipios = {
        '01': 'Huehuetenango',
        '02': 'Chiantla',
        '03': 'Malacatancito',
        '04': 'Cuilco',
        '05': 'Nenton',
        '06': 'San Pedro Necta',
        '07': 'Jacaltenango',
        '08': 'San Pedro Solomá',
        '09': 'San Ildefonso Ixtahuacán',
        '10': 'Santa Barbara',
        '11': 'La Libertad',
        '12': 'La Democracia',
        '13': 'San Miguel Acatán',
        '14': 'San Rafael La Independencia',
        '15': 'Todos santo Cuchumatán',
        '16': 'San Juan Atitán',
        '17': 'Santa Eulalia',
        '18': 'San MAteo Ixtatán',
        '19': 'Colotenango',
        '20': 'San Sebastián Huehuetenango',
        '21': 'Tectitán',
        '22': 'Concepción Huista',
        '23': 'San Juan Ixcoy',
        '24': 'San Antonio Huista',
        '25': 'San Sebastián Coatán',
        '26': 'Santa Cruz Barillas',
        '27': 'Aguacatán',
        '28': 'San Rafael Petzal',
        '29': 'San Gaspar Ixchil',
        '30': 'Santiago Chimaltenango',
        '31': 'Santa Ana Huista',
        '32': 'Unión Cantinil',
    }

    const municipios14: Municipios = {
        '01': 'Santa Cruz del Quiche',
        '02': 'Chiche',
        '03': 'Chinique',
        '04': 'Zacualpa',
        '05': 'Chajul',
        '06': 'Santo Tomás Chichicastenango',
        '07': 'Patzite',
        '08': 'San Antonio Ilotenango',
        '09': 'San Pedro Jocopilas',
        '10': 'Cunen',
        '11': 'San Juan Cotzal',
        '12': 'Joyabaj',
        '13': 'Nebaj',
        '14': 'San Andrés Sajcabaja',
        '15': 'San Miguel Uspantán',
        '16': 'Sacapulas',
        '17': 'San Bartolomé Jocotenango',
        '18': 'Canilla',
        '19': 'Chicamán',
        '20': 'Ixcan',
        '21': 'Pachalún',
        '22': 'Playa Grande',
    }

    const municipios15: Municipios = {
        '01': 'Salama',
        '02': 'San Miguel Chicaj',
        '03': 'Rabinal',
        '04': 'Cubulco',
        '05': 'Granados',
        '06': 'Santa Cruz El Chol',
        '07': 'San Jerónimo',
        '08': 'Purulha',
    }
    
    const municipios16: Municipios = {
        '01': 'Cobán',
        '02': 'Santa Cruz Verapaz',
        '03': 'San Cristobal Verapaz',
        '04': 'Tactic',
        '05': 'Tamahu',
        '06': 'San Miguel Tucuru',
        '07': 'Panzos',
        '08': 'Senahu',
        '09': 'San Pedro Carcha',
        '10': 'San Juan Chamelco',
        '11': 'Lanquín',
        '12': 'Santa María Cahabon',
        '13': 'Chisec',
        '14': 'Chahal',
        '15': 'Fray Bartolomé de las Casas',
        '16': 'La Tinta',
        '17': 'Raxruhá',
    }

    const municipios17: Municipios = {
        '01': 'Flores',
        '02': 'San José',
        '03': 'San Benito',
        '04': 'San Andres',
        '05': 'La Libertad',
        '06': 'San Francisco',
        '07': 'Santa Ana',
        '08': 'Dolores',
        '09': 'San Luis',
        '10': 'Sayaxche',
        '11': 'Melchor de Mencos',
        '12': 'Poptun',
    }

    const municipios18: Municipios = {
        '01': 'Puerto Barrios',
        '02': 'Livingston',
        '03': 'El Estor',
        '04': 'Morales',
        '05': 'Los Amates',
    }

    const municipios19: Municipios = {
        '01': 'Zacapa',
        '02': 'Estanzuela',
        '03': 'Río hondo',
        '04': 'Gualan',
        '05': 'Teculutan',
        '06': 'Usumatlan',
        '07': 'Cabanas',
        '08': 'San Diego',
        '09': 'La Unión',
        '10': 'Huite',
    }

    const municipios20: Municipios = {
        '01': 'Chiquimula',
        '02': 'San José La Arada',
        '03': 'San Juan La Ermita',
        '04': 'Jocotán',
        '05': 'Camotán',
        '06': 'Olopa',
        '07': 'Esquipulas',
        '08': 'Concepción Las Minas',
        '09': 'Quezaltepeque',
        '10': 'San Jacinto',
        '11': 'Ipala',
    }

    const municipios21: Municipios = {
        '01': 'Jalapa',
        '02': 'San Pedro Pinula',
        '03': 'San Luis Jilotepeque',
        '04': 'San Manuel Chaparrón',
        '05': 'San Carlos Alzatate',
        '06': 'Monjas',
        '07': 'Mataquescuintla',
    }

    const municipios22: Municipios = {
        '01': 'Jutiapa',
        '02': 'El Progreso',
        '03': 'Santa Catarina Mita',
        '04': 'Agua Blanca',
        '05': 'Asunción Mita',
        '06': 'Yupiltepeque',
        '07': 'Atescatempa',
        '08': 'Jerez',
        '09': 'El Adelanto',
        '10': 'Zapotitlan',
        '11': 'Comapa',
        '12': 'Jalpatagua',
        '13': 'Conguaco',
        '14': 'moyuta',
        '15': 'Pasaco',
        '16': 'San José Acatempa',
        '17': 'Quesada',
    }

    const municipios: Record<string, Municipios> = {
        'Guatemala': municipios1,
        'El Progreso': municipios2,
        'Sacatepequez': municipios3,
        'Chimaltenango': municipios4,
        'Escuintla': municipios5,
        'Santa Rosa': municipios6,
        'Solola': municipios7,
        'Totonicapan': municipios8,
        'Quetzaltenango': municipios9,
        'Suchitepequez': municipios10,
        'Retalhuleu': municipios11,
        'San Marcos': municipios12,
        'Huehuetenango': municipios13,
        'El Quiche': municipios14,
        'Baja Verapaz': municipios15,
        'Alta Verapaz': municipios16,
        'El Peten': municipios17,
        'Izabal': municipios18,
        'Zacapa': municipios19,
        'Chiquimula': municipios20,
        'Jalapa': municipios21,
        'Jutiapa': municipios22
    }
   
    return municipios[departamento][muni]
}

function getMunicipios(departamento: string) {

    if (departamento === '') {
        return ['']
    }


    const municipios1: Municipio = [
        'Guatemala', 'Santa Catarina Pinula', 'San José Pinula', 'San José del Golfo', 'Palencia',
        'Chinautla', 'San Pedro Ayampuc', 'Mixco', 'San Pedro Sacatepéquez', 'San Juan Sacatepéquez',
        'San Raymundo', 'Chuarrancho', 'Fraijanes', 'Amatitlán', 'Villa Nueva', 'Villa Canales',
        'San Miguel Petapa'
    ]

    const municipios2: Municipio = [
        'Guastatoya', 'Morazán', 'San Agustín Acasaguastlán', 'San Cristóbal Acasaguastlán',
        'El Jícaro', 'Sansare', 'Sanarate', 'San Antonio La Paz'
    ]

    const municipios3: Municipio = [
        'Antigua Guatemala', 'Jocotenango', 'Pastores', 'Sumpango', 'Santo Domingo Xenacoj',
        'Santiago Sacatepéquez', 'San Bartolomé Milpas Altas', 'San Lucas Sacatepéquez',
        'Santa Lucía Milpas Altas', 'Magdalena Milpas Altas', 'Santa María de Jesús',
        'Ciudad Vieja', 'San Miguel Dueñas', 'Alotenango', 'Santa Catarina Barahona'
    ]

    const municipios4: Municipio = [
        'Chimaltenango', 'San José Poaquil', 'San Martín Jilotepeque', 'Comalapa', 'Santa Apolonia',
        'Tecpán Guatemala', 'Patzún', 'Pochuta', 'Patzicía', 'Santa Cruz Balanyá', 'Acatenango',
        'San Pedro Yepocapa', 'San Andrés Itzapa', 'Parramos', 'Zaragoza', 'El Tejar'
    ]

    const municipios5: Municipio = [
        'Escuintla', 'Santa Lucía Cotzumalguapa', 'La Democracia', 'Siquinalá', 'Masagua',
        'Tiquisate', 'La Gomera', 'Guanagazapa', 'San José', 'Iztapa', 'Palín', 'San Vicente Pacaya',
        'Nueva Concepción'
    ]


    const municipios6: Municipio = [
        'Cuilapa', 'Barberena', 'Santa Rosa de Lima', 'Casillas', 'San Rafael Las Flores', 
        'Oratorio', 'San Juan Tecuaco', 'Chiquimulilla', 'Taxisco', 'Santa María Ixhuatán', 
        'Guazacapán', 'Santa Cruz Naranjo', 'Pueblo Nuevo Viñas', 'Nueva Santa Rosa'
    ]

    const municipios7: Municipio = [
        'Sololá', 'San José Chacayá', 'Santa María Visitación', 'Santa Lucía Utatlán', 
        'Nahualá', 'Santa Catarina Ixtahuacán', 'Santa Clara La Laguna', 'Concepción', 
        'San Andrés Semetabaj', 'Panajachel', 'Santa Catarina Palopó', 'San Antonio Palopó', 
        'San Lucas Tolimán', 'Santa Cruz La Laguna', 'San Pablo La Laguna', 'San Marcos La Laguna', 
        'San Juan La Laguna', 'San Pedro La Laguna', 'Santiago Atitlán'
    ]

    const municipios8: Municipio = [
        'Totonicapán', 'San Cristóbal Totonicapán', 'San Francisco El Alto', 'San Andrés Xecul', 
        'Momostenango', 'Santa María Chiquimula', 'Santa Lucía La Reforma', 'San Bartolo'
    ]

    const municipios9: Municipio = [
        'Quetzaltenango', 'Salcajá', 'Olintepeque', 'San Carlos Sija', 'Sibilia', 'Cabricán', 
        'Cajolá', 'San Miguel Sigüilá', 'Ostuncalco', 'San Mateo', 'Concepción Chiquirichapa', 
        'San Martín Sacatepéquez', 'Almolonga', 'Cantel', 'Huitán', 'Zunil', 'Colomba', 
        'San Francisco La Unión', 'El Palmar', 'Coatepeque', 'Génova', 'Flores Costa Cuca', 'La Esperanza'
    ]

    const municipios10: Municipio = [
        'Mazatenango', 'Cuyotenango', 'San Francisco Zapotitlán', 'San Bernardino', 'San José El Ídolo', 
        'Santo Domingo Suchitepéquez', 'San Lorenzo', 'Samayac', 'San Pablo Jocopilas', 
        'San Antonio Suchitepéquez', 'San Miguel Panán', 'San Gabriel', 'Chicacao', 'Patulul', 
        'Santa Bárbara', 'San Juan Bautista', 'Santo Tomás La Unión', 'Zunilito', 'Pueblo Nuevo', 'Río Bravo'
    ]

    const municipios11: Municipio = [
        'Retalhuleu', 'San Sebastián', 'Santa Cruz Muluá', 'San Martín Zapotitlán', 
        'San Felipe Retalhuleu', 'San Andrés Villa Seca', 'Champerico', 'Nuevo San Carlos', 'El Asintal'
    ]

    const municipios12: Municipio = [
        'San Marcos', 'San Pedro Sacatepéquez', 'San Antonio Sacatepéquez', 'Comitancillo', 
        'San Miguel Ixtahuacán', 'Concepción Tutuapa', 'Tacaná', 'Sibinal', 'Tajumulco', 'Tejutla', 
        'San Rafael Pie de la Cuesta', 'Nuevo Progreso', 'El Tumbador', 'El Rodeo', 'Malacatán', 
        'Catarina', 'Ayutla', 'Ocós', 'San Pablo', 'El Quetzal', 'La Reforma', 'Pajapita', 
        'Ixchiguán', 'San José Ojetenam', 'San Cristóbal Cucho', 'Sipacapa', 'Esquipulas Palo Gordo', 
        'Río Blanco', 'San Lorenzo'
    ]

    const municipios13: Municipio = [
        'Huehuetenango', 'Chiantla', 'Malacatancito', 'Cuilco', 'Nentón', 'San Pedro Necta', 
        'Jacaltenango', 'San Pedro Soloma', 'San Ildefonso Ixtahuacán', 'Santa Bárbara', 'La Libertad', 
        'La Democracia', 'San Miguel Acatán', 'San Rafael La Independencia', 'Todos Santos Cuchumatán', 
        'San Juan Atitán', 'Santa Eulalia', 'San Mateo Ixtatán', 'Colotenango', 'San Sebastián Huehuetenango', 
        'Tectitán', 'Concepción Huista', 'San Juan Ixcoy', 'San Antonio Huista', 'San Sebastián Coatán', 
        'Barillas', 'Aguacatán', 'San Rafael Petzal', 'San Gaspar Ixchil', 'Santiago Chimaltenango', 
        'Santa Cruz Barillas'
    ]

    const municipios14: Municipio = [
        'Santa Cruz del Quiché', 'Chiché', 'Chinique', 'Zacualpa', 'Chajul', 'Chichicastenango', 
        'Patzité', 'San Antonio Ilotenango', 'San Pedro Jocopilas', 'Cunén', 'San Juan Cotzal', 
        'Joyabaj', 'Nebaj', 'San Andrés Sajcabajá', 'Uspantán', 'Sacapulas', 'San Bartolomé Jocotenango', 
        'Canillá', 'Chicamán', 'Ixcan', 'Pachalum','Playa Grande',
    ]

    const municipios15: Municipio = [
        'Salamá', 'San Miguel Chicaj', 'Rabinal', 'Cubulco', 'Granados', 'El Chol', 'Purulhá'
    ]
    
    const municipios16: Municipio = [
        'Cobán', 'Santa Cruz Verapaz', 'San Cristóbal Verapaz', 'Tactic', 'Tamahú', 'Tucurú', 'Panzós', 'Senahú', 
        'San Pedro Carchá', 'San Juan Chamelco', 'Lanquín', 'Cahabón', 'Chisec', 'Chahal', 'Fray Bartolomé de Las Casas',
        'Santa María Cahabón', 'Raxruhá'
    ]

    const municipios17: Municipio = [
        'Flores', 'San Benito', 'San Andrés', 'La Libertad', 'San Francisco', 'Santa Ana', 'Dolores', 'San Luis', 
        'Sayaxché', 'Melchor de Mencos', 'Poptún'
    ]

    const municipios18: Municipio = [
        'Puerto Barrios', 'Livingston', 'El Estor', 'Morales', 'Los Amates'
    ]

    const municipios19: Municipio = [
        'Zacapa', 'Estanzuela', 'Río Hondo', 'Gualán', 'Teculután', 'Usumatlán', 'Cabañas', 'Huité', 'La Unión', 
        'San Diego'
    ]

    const municipios20: Municipio = [
        'Chiquimula',
        'San José La Arada',
        'San Juan La Ermita',
        'Jocotán',
        'Camotán',
        'Olopa',
        'Esquipulas',
        'Concepción Las Minas',
        'Quezaltepeque',
        'San Jacinto',
        'Ipala',
    ]

    const municipios21: Municipio = [
        'Jalapa',
        'San Pedro Pinula',
        'San Luis Jilotepeque',
        'San Manuel Chaparrón',
        'San Carlos Alzatate',
        'Monjas',
        'Mataquescuintla',
    ]

    const municipios22: Municipio = [
        'Jutiapa',
        'El Progreso',
        'Santa Catarina Mita',
        'Agua Blanca',
        'Asunción Mita',
        'Yupiltepeque',
        'Atescatempa',
        'Jerez',
        'El Adelanto',
        'Zapotitlán',
        'Comapa',
        'Jalpatagua',
        'Conguaco',
        'Moyuta',
        'Pasaco',
        'San José Acatempa',
        'Quesada',
    ]

    const municipios: Record<string, Municipio> = {
        'Guatemala': municipios1,
        'El Progreso': municipios2,
        'Sacatepequez': municipios3,
        'Chimaltenango': municipios4,
        'Escuintla': municipios5,
        'Santa Rosa': municipios6,
        'Solola': municipios7,
        'Totonicapan': municipios8,
        'Quetzaltenango': municipios9,
        'Suchitepequez': municipios10,
        'Retalhuleu': municipios11,
        'San Marcos': municipios12,
        'Huehuetenango': municipios13,
        'El Quiche': municipios14,
        'Baja Verapaz': municipios15,
        'Alta Verapaz': municipios16,
        'El Peten': municipios17,
        'Izabal': municipios18,
        'Zacapa': municipios19,
        'Chiquimula': municipios20,
        'Jalapa': municipios21,
        'Jutiapa': municipios22
    }
   
    return municipios[departamento]
}

function getDepartamentos() {

    let depsList : string[] = [
        'Guatemala',
        'El Progreso',
        'Sacatepequez',
        'Chimaltenango',
        'Escuintla',
        'Santa Rosa',
        'Solola',
        'Totonicapan',
        'Quetzaltenango',
        'Suchitepequez',
        'Retalhuleu',
        'San Marcos',
        'Huehuetenango',
        'El Quiche',
        'Baja Verapaz',
        'Alta Verapaz',
        'El Peten',
        'Izabal',
        'Zacapa',
        'Chiquimula',
        'Jalapa',
        'Jutiapa'
    ]

    return depsList
}

export {
    Departamentos,
    Municipios,
    getDepartamentos,
    getMunicipios  
} 