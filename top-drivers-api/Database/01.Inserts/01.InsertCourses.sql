USE TopDrivers;

INSERT  IGNORE INTO Course
(Name, Description, Cost, IsPackage, Duration, IsEnabled, IsActive, Created, CreatedBy)
VALUES
('Principiantes 1', CONCAT_WS('\n', 'Para personas que no tienen ningún conocimiento en el manejo y tienen la cita práctica matriculada (Planteles Alajuela o Heredia)'), 0, true, 18, true, true, '2021-09-27 00:38:18', 'admin'),
('Principiantes 2', CONCAT_WS('\n', 'Para personas con conocimientos básicos de la conducción y con cita práctica matriculada (Planteles Alajuela o Heredia)'), 0, true, 12, true, true, '2021-09-27 00:38:18', 'admin'),
('Principiantes 3', CONCAT_WS('\n', 'Para personas sin ninguna experiencia o conocimientos básicos en el manejo, que aún NO matriculan la prueba práctica.'), 0, true, 6, true, true, '2021-09-27 00:38:18', 'admin'),
('Curso nivel intermedio', CONCAT_WS('\n', 'Con enfoque en la prueba práctica de manejo. °Clase de reforzamiento °Prácticas de conos °Rutas de la prueba °Alquiler del vehículo para el examen práctico.'), 0, true, 9, true, true, '2021-09-27 00:38:18', 'admin'),
('Prueba práctica de manejo', CONCAT_WS('\n', 'Paquetes de preparación (conos - rutas) más alquiler de vehículo para el día del examen. (Planteles Alajuela, Heredia y San José)'), 0, true, 0, true, true, '2021-09-27 00:38:18', 'admin'),
('Personas con licencia', CONCAT_WS('\n', 'Que desean retomar la conducción o mejorar su nivel. Tenemos diferentes planes, que adecuaremos a su necesidad.'), 0, true, 0, true, true, '2021-09-27 00:38:18', 'admin'),
('Sin examen teórico aprobado ', CONCAT_WS('\n', 'Pero quieres aprender los conceptos básicos de la conducción, y además te obsequiaremos material de estudio para la prueba teórica.'), 0, true, 4, true, true, '2021-09-27 00:38:18', 'admin')
