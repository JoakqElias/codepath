import { question as q, makeLesson, publishUnits } from './contentFactory.js'

const lesson = (courseId, slug, title, description, content, code, questions) =>
  makeLesson(courseId, `${courseId}-${slug}`, title, description, content, code, questions)
const unit = (courseId, title, description, lessons) => publishUnits(courseId, [{
  id: `${courseId}-fundamentos`, title, description, icon: 'auto_stories', lessons
}])

export const technologyUnits = {
  html: unit('html', 'Tu primera página', 'Estructura, enlaces, imágenes y formularios.', [
    lesson('html', 'estructura', 'Organizá una página con HTML', 'Reconocé títulos, párrafos y recursos.', [
      'HTML describe la estructura del contenido. h1 identifica el encabezado principal y p un párrafo. Las etiquetas delimitan elementos; muchas tienen apertura y cierre.',
      'Un enlace usa a y href para indicar el destino. Una imagen usa img y src para su archivo. alt aporta una alternativa textual para transmitir el contenido de una imagen informativa.'
    ], '<h1>Mi primera página</h1>\n<p>Estoy aprendiendo.</p>\n<a href="/cursos">Ver cursos</a>\n<img src="logo.svg" alt="CodePath">', [
      q('html-lesson-h1', '¿Qué elemento representa el encabezado principal?', ['p', 'h1', 'img'], 1, 'h1 marca el encabezado principal. p sirve para párrafos e img para imágenes.'),
      q('html-lesson-paragraph', '¿Dónde pondrías un párrafo de presentación?', ['Dentro de p', 'Dentro de img', 'En el atributo href'], 0, 'p agrupa un párrafo de texto dentro del documento.'),
      q('html-lesson-link', '¿Qué atributo determina el destino de Ver cursos?', ['src', 'alt', 'href'], 2, 'El atributo href del enlace a contiene la dirección /cursos.'),
      q('html-lesson-alt', '¿Para qué sirve alt en esta imagen?', ['Para agrandarla', 'Para ofrecer una alternativa textual', 'Para convertirla en enlace'], 1, 'alt describe el contenido de la imagen cuando no se ve o se usa un lector de pantalla.')
    ]),
    lesson('html', 'formularios', 'Pedí información con formularios', 'Relacioná etiquetas, campos y botones.', [
      'form agrupa los controles. label describe un campo y su atributo for coincide con el id del input. Esa relación también permite enfocar el campo al pulsar su etiqueta.',
      'type="email" identifica un correo; required exige completar el campo antes de un envío normal del navegador. name es la clave que se envía. Un button con type="submit" solicita enviar el formulario. La validación del navegador no reemplaza la del servidor.'
    ], '<form>\n  <label for="correo">Correo</label>\n  <input id="correo" name="email"\n    type="email" required>\n  <button type="submit">Enviar</button>\n</form>', [
      q('html-form-label', '¿Qué valor debe tener for para asociar la etiqueta al campo?', ['email', 'correo', 'submit'], 1, 'for debe coincidir con id, que aquí vale correo.'),
      q('html-form-email', '¿Qué atributo identifica este campo como correo electrónico?', ['type="email"', 'id="correo"', 'name="email"'], 0, 'type indica al navegador el tipo del control. id y name tienen otras funciones.'),
      q('html-form-required', '¿Qué atributo exige completar el campo?', ['name', 'for', 'required'], 2, 'required activa la comprobación de campo obligatorio en el navegador.'),
      q('html-form-submit', '¿Qué hace el botón con type="submit"?', ['Borra el formulario', 'Solicita enviar el formulario', 'Crea otro input'], 1, 'submit solicita el envío del formulario, sujeto a la validación del navegador.')
    ])
  ]),
  css: unit('css', 'Estilo y distribución', 'Selectores, tipografía, cajas y pantallas pequeñas.', [
    lesson('css', 'estilos', 'Aplicá tus primeros estilos', 'Separá selector, propiedad y valor.', [
      'Una regla CSS tiene un selector y declaraciones entre llaves. Cada declaración combina propiedad y valor. .tarjeta selecciona elementos con class="tarjeta"; sin el punto, un selector como h1 busca etiquetas.',
      'color cambia el texto; background-color cambia el fondo. font-family elige una familia tipográfica y alternativas. font-size fija el tamaño de texto; border-radius redondea las esquinas.'
    ], '.tarjeta {\n  color: #17243D;\n  background-color: white;\n  font-family: Roboto, sans-serif;\n  font-size: 16px;\n  border-radius: 12px;\n}', [
      q('css-selector', '¿Qué selecciona .tarjeta?', ['Etiquetas tarjeta', 'Elementos con class="tarjeta"', 'Solo el primer párrafo'], 1, 'El punto identifica un selector de clase.'),
      q('css-text-color', '¿Qué propiedad cambia el color del texto?', ['color', 'background-color', 'font-family'], 0, 'color controla el color del texto; background-color controla el fondo.'),
      q('css-font-family', '¿Qué propiedad elige la familia tipográfica?', ['font-size', 'border-radius', 'font-family'], 2, 'font-family declara Roboto y sans-serif como alternativa.'),
      q('css-round-corners', '¿Qué propiedad redondea las esquinas?', ['color', 'border-radius', 'font-size'], 1, 'border-radius define el radio de las esquinas de la caja.')
    ]),
    lesson('css', 'adaptable', 'Distribuí cajas en distintas pantallas', 'Diferenciá padding, margin y reglas adaptables.', [
      'El modelo de caja incluye contenido, padding, borde y margin. padding separa el contenido del borde; margin separa una caja de otras. Con box-sizing: border-box, el ancho declarado incluye padding y borde.',
      'display: flex distribuye elementos hijos; gap deja espacio entre ellos. flex-wrap: wrap permite nuevas filas. Una media query aplica reglas según una condición: max-width: 600px se cumple si la ventana mide 600 píxeles o menos.'
    ], '.tarjeta {\n  box-sizing: border-box;\n  padding: 16px;\n  margin: 8px;\n}\n.lista { display: flex; gap: 12px; }\n@media (max-width: 600px) {\n  .lista { flex-wrap: wrap; }\n}', [
      q('css-padding', '¿Qué propiedad agrega espacio dentro del borde?', ['margin', 'gap', 'padding'], 2, 'padding agrega separación interna; margin agrega separación externa.'),
      q('css-border-box', 'Con border-box, ¿qué incluye el ancho declarado?', ['Contenido, padding y borde', 'Solo contenido', 'También todos los márgenes'], 0, 'border-box incluye contenido, padding y borde; margin queda fuera.'),
      q('css-gap', '¿Qué propiedad separa los hijos de .lista?', ['font-family', 'gap', 'color'], 1, 'gap crea espacios entre los elementos distribuidos por flex.'),
      q('css-media', '¿A qué ancho se aplica la media query del ejemplo?', ['Solo a 800px', 'Solo por encima de 600px', 'A 600px o menos'], 2, 'max-width incluye el límite: con 600px o menos se habilita flex-wrap: wrap.')
    ])
  ]),
  vue: unit('vue', 'Componentes e interacción', 'Plantillas, directivas, reactividad y eventos con Vue.', [
    lesson('vue', 'plantillas', 'Mostrá datos en un componente', 'Leé una plantilla y usá directivas.', [
      'Un componente Vue reúne una parte reutilizable de la interfaz. En un archivo .vue, script setup declara datos y template describe lo que se muestra. {{ nombre }} interpola el valor de nombre como texto.',
      'v-if incluye un elemento cuando la expresión es verdadera. v-for repite elementos de una lista; :key aporta una identidad estable. :src es la abreviatura de v-bind:src y toma el valor de una expresión.'
    ], '<script setup>\nconst nombre = "Luz";\nconst mostrar = true;\nconst temas = ["HTML", "CSS"];\n</script>\n<template>\n  <h1>Hola, {{ nombre }}</h1>\n  <ul v-if="mostrar">\n    <li v-for="tema in temas" :key="tema">\n      {{ tema }}\n    </li>\n  </ul>\n</template>', [
      q('vue-interpolation', '¿Qué texto muestra el h1?', ['Hola, nombre', 'Hola, Luz', 'Hola, true'], 1, 'La interpolación evalúa nombre y muestra Luz.'),
      q('vue-if-false', 'Si mostrar fuera false, ¿qué pasaría con ul?', ['No se incluiría', 'Se duplicaría', 'Mostraría false'], 0, 'v-if controla si ese bloque está presente según una condición.'),
      q('vue-for-list', '¿Cuántos elementos li genera v-for?', ['Uno', 'Tres', 'Dos'], 2, 'temas contiene dos entradas: HTML y CSS.'),
      q('vue-key-identity', '¿Para qué sirve :key en la lista?', ['Para cambiar el color', 'Para identificar de forma estable cada elemento', 'Para ocultar los textos'], 1, 'Una clave estable ayuda a Vue a reconocer los elementos entre actualizaciones.')
    ]),
    lesson('vue', 'reactividad', 'Respondé a eventos con datos reactivos', 'Usá ref, funciones y @click.', [
      'ref crea un valor reactivo. Dentro del script se lee o modifica con .value. Vue detecta el cambio y actualiza la vista; en la plantilla se puede usar el nombre del ref directamente, sin .value.',
      '@click registra qué función se ejecuta al pulsar un botón. v-model vincula un control con un dato reactivo: escribir en el input actualiza ese valor.'
    ], '<script setup>\nimport { ref } from "vue";\nconst puntos = ref(0);\nconst nombre = ref("");\nfunction sumar() { puntos.value++; }\n</script>\n<template>\n  <input v-model="nombre">\n  <button @click="sumar">{{ puntos }}</button>\n</template>', [
      q('vue-ref-start', '¿Cuánto vale puntos al comenzar?', ['1', 'null', '0'], 2, 'ref(0) inicializa el valor reactivo con cero.'),
      q('vue-event-click', '¿Qué función se ejecuta al pulsar el botón?', ['sumar', 'ref', 'nombre'], 0, '@click="sumar" conecta el evento con la función sumar.'),
      q('vue-value-script', '¿Cómo se modifica puntos dentro del script?', ['puntos = 1', 'puntos.value++', 'puntos.text++'], 1, 'El valor de un ref se modifica mediante .value en el script.'),
      q('vue-model-input', '¿Qué dato cambia al escribir en el input?', ['puntos', 'sumar', 'nombre'], 2, 'v-model="nombre" vincula el texto ingresado con el ref nombre.')
    ])
  ]),
  react: unit('react', 'Primeros componentes', 'JSX, propiedades, estado e interacción.', [
    lesson('react', 'componentes', 'Componé una interfaz con JSX', 'Pasá información con propiedades.', [
      'Un componente React puede ser una función que devuelve JSX, una sintaxis para describir la interfaz. Los nombres de componentes comienzan con mayúscula, como Saludo. Los elementos HTML usan minúscula.',
      'Las llaves dentro de JSX permiten insertar expresiones de JavaScript. Las propiedades o props llevan datos del padre al hijo; el hijo debe tratarlas como información de solo lectura. En JSX se usa className para una clase CSS.'
    ], 'function Saludo({ nombre }) {\n  return <h1 className="titulo">Hola, {nombre}</h1>;\n}\n\nexport default function App() {\n  return <Saludo nombre="Luz" />;\n}', [
      q('react-component-name', '¿Cuál es un componente definido en el ejemplo?', ['h1', 'Saludo', 'className'], 1, 'Saludo es una función usada como componente y su nombre comienza con mayúscula.'),
      q('react-prop-output', '¿Qué texto muestra Saludo?', ['Hola, Luz', 'Hola, nombre', 'Hola, App'], 0, 'App pasa nombre="Luz" y el componente interpola esa propiedad.'),
      q('react-css-class', '¿Qué atributo JSX asigna la clase CSS?', ['class', 'css', 'className'], 2, 'En JSX, className expresa la clase CSS del elemento.'),
      q('react-readonly-props', '¿Cómo debe tratar Saludo la prop nombre?', ['Debe borrarla', 'Como información de solo lectura', 'Como una ruta del servidor'], 1, 'El hijo recibe props del padre y no debe modificarlas directamente.')
    ]),
    lesson('react', 'estado', 'Actualizá la pantalla con estado', 'Usá useState y eventos.', [
      'useState agrega estado al componente y devuelve el valor actual junto con una función para actualizarlo. Se llama en el nivel superior del componente, no dentro de condiciones. Su argumento define el valor inicial.',
      'onClick recibe una función que se ejecuta al hacer clic. Para calcular a partir del estado anterior se puede usar una actualización funcional: setPuntos(actual => actual + 1). React vuelve a renderizar para mostrar el nuevo estado.'
    ], 'import { useState } from "react";\n\nexport default function Contador() {\n  const [puntos, setPuntos] = useState(0);\n  return (\n    <button onClick={() => setPuntos(n => n + 1)}>\n      Puntos: {puntos}\n    </button>\n  );\n}', [
      q('react-state-start', '¿Qué muestra el contador inicialmente?', ['Puntos: 1', 'Puntos: null', 'Puntos: 0'], 2, 'useState(0) establece cero como estado inicial.'),
      q('react-setter', '¿Qué función actualiza el estado?', ['setPuntos', 'puntos', 'Contador'], 0, 'El segundo valor devuelto por useState es la función de actualización.'),
      q('react-click-two', 'Después de dos clics, ¿cuántos puntos se muestran?', ['1', '2', '0'], 1, 'Cada actualización suma uno al estado anterior: de 0 a 1 y luego a 2.'),
      q('react-handler', '¿Por qué onClick recibe una función?', ['Para repetir el render sin parar', 'Para cambiar las props', 'Para ejecutarla cuando ocurra el clic'], 2, 'La función es el manejador del evento; se invoca cuando el usuario pulsa el botón.')
    ])
  ]),
  sql: unit('sql', 'Consultá y modificá datos', 'Tablas, consultas, filtros y operaciones básicas.', [
    lesson('sql', 'consultas', 'Leé información de una tabla', 'Seleccioná columnas, filtrá y ordená.', [
      'Una tabla organiza registros en filas y atributos en columnas. SELECT indica qué columnas consultar; FROM indica la tabla. SELECT * solicita todas las columnas.',
      'WHERE filtra filas según una condición. ORDER BY ordena el resultado; ASC indica orden ascendente y DESC descendente. Consultar con SELECT no modifica los datos almacenados.'
    ], '-- Tabla alumnos: nombre y puntos\n-- Ana: 8; Luz: 3; Leo: 6\nSELECT nombre, puntos\nFROM alumnos\nWHERE puntos >= 6\nORDER BY puntos DESC;', [
      q('sql-from-table', '¿Qué tabla consulta el ejemplo?', ['puntos', 'alumnos', 'nombre'], 1, 'FROM alumnos indica la tabla de origen.'),
      q('sql-where-filter', '¿Qué personas cumplen el filtro?', ['Ana y Leo', 'Solo Luz', 'Las tres'], 0, 'Ana tiene 8 y Leo 6; ambos cumplen puntos >= 6. Luz tiene 3.'),
      q('sql-desc-order', '¿Quién aparece primero al ordenar por puntos DESC?', ['Luz', 'Leo', 'Ana'], 2, 'DESC ordena de mayor a menor: Ana, con 8, precede a Leo, con 6.'),
      q('sql-select-safe', '¿Qué hace esta consulta con los datos guardados?', ['Los elimina', 'Los lee sin modificarlos', 'Cambia todos los puntos a 6'], 1, 'SELECT devuelve información; no realiza INSERT, UPDATE ni DELETE.')
    ]),
    lesson('sql', 'operaciones', 'Creá registros y actualizalos', 'Conocé claves y cambios controlados.', [
      'CREATE TABLE define una tabla y los tipos de sus columnas. INTEGER guarda enteros y VARCHAR texto de longitud limitada. PRIMARY KEY identifica cada fila de forma única y no admite NULL. NOT NULL exige un valor.',
      'INSERT agrega filas; UPDATE cambia valores; DELETE elimina filas. WHERE limita las filas afectadas por UPDATE y DELETE. Sin WHERE esas dos operaciones alcanzan todas las filas; comprobá siempre el filtro antes de ejecutarlas.'
    ], 'CREATE TABLE tareas (\n  id INTEGER PRIMARY KEY,\n  titulo VARCHAR(80) NOT NULL\n);\nINSERT INTO tareas (id, titulo)\nVALUES (1, \'Leer HTML\');\nUPDATE tareas SET titulo = \'Leer CSS\'\nWHERE id = 1;\nDELETE FROM tareas WHERE id = 1;', [
      q('sql-primary-key', '¿Qué columna identifica de forma única cada tarea?', ['titulo', 'tareas', 'id'], 2, 'id está declarada PRIMARY KEY: debe ser única y no nula.'),
      q('sql-insert-row', '¿Qué instrucción agrega una tarea?', ['INSERT', 'SELECT', 'ORDER BY'], 0, 'INSERT INTO agrega un registro a la tabla indicada.'),
      q('sql-update-title', 'Justo después del UPDATE, ¿qué título tiene la tarea 1?', ['Leer HTML', 'Leer CSS', 'titulo'], 1, 'UPDATE asigna Leer CSS a la fila cuyo id es 1.'),
      q('sql-delete-where', '¿Qué ocurriría con DELETE FROM tareas sin WHERE?', ['Solo lee las tareas', 'Borra la tabla y su definición', 'Elimina todas las filas de la tabla'], 2, 'DELETE sin filtro elimina todas las filas, pero conserva la tabla. El ejemplo sí usa un filtro.')
    ])
  ]),
  php: unit('php', 'Primeros pasos en el servidor', 'Variables, decisiones y recepción de formularios.', [
    lesson('php', 'sintaxis', 'Trabajá con variables en PHP', 'Leé expresiones y condiciones.', [
      'PHP ejecuta instrucciones en el servidor. El bloque empieza con <?php. Las variables llevan $ delante del nombre y las instrucciones habituales terminan con punto y coma. echo escribe una salida.',
      'El operador . concatena textos, mientras que + suma números. if ejecuta un bloque si la condición es verdadera; else ofrece la alternativa. El operador >= incluye la igualdad.'
    ], '<?php\n$nombre = "Luz";\n$puntos = 2 + 3;\nif ($puntos >= 5) {\n  echo "Hola, " . $nombre;\n} else {\n  echo "A practicar";\n}', [
      q('php-variable-prefix', '¿Cuál es un nombre de variable válido en el ejemplo?', ['nombre$', '$nombre', '#nombre'], 1, 'Las variables de PHP comienzan con $.'),
      q('php-sum-value', '¿Cuánto vale $puntos?', ['5', '23', '2'], 0, 'Ambos operandos son números: 2 + 3 = 5.'),
      q('php-concat-op', '¿Qué operador une los textos en echo?', ['+', '>=', '.'], 2, 'El punto concatena "Hola, " con el contenido de $nombre.'),
      q('php-if-output', '¿Qué salida produce este ejemplo?', ['A practicar', 'Hola, Luz', 'Los dos mensajes'], 1, '5 >= 5 es verdadero, por lo que se ejecuta el primer bloque.')
    ]),
    lesson('php', 'formularios', 'Recibí un formulario', 'Relacioná POST, name y validación del servidor.', [
      'Un formulario con method="post" envía campos al servidor. action indica el destino. El atributo name del campo se usa como clave en $_POST. PHP recibe datos; el navegador no ejecuta este código PHP.',
      '$_SERVER["REQUEST_METHOD"] permite consultar el método de la petición. isset comprueba que una entrada exista y no sea NULL; no valida su contenido. Los datos del formulario deben validarse en el servidor. Si se muestran en HTML, también se deben escapar: este ejemplo solo muestra un mensaje fijo.'
    ], '<!-- formulario.html -->\n<form action="recibir.php" method="post">\n  <input name="correo" type="email" required>\n  <button>Enviar</button>\n</form>\n\n// recibir.php, dentro de <?php\nif ($_SERVER["REQUEST_METHOD"] === "POST"\n    && isset($_POST["correo"])) {\n  echo "Formulario recibido";\n}', [
      q('php-post-key', '¿Con qué clave se recibe el campo de correo?', ['email', 'recibir.php', 'correo'], 2, 'La clave se toma de name="correo", por eso se usa $_POST["correo"].'),
      q('php-form-action', '¿Qué archivo recibe el formulario?', ['recibir.php', 'formulario.html', 'correo'], 0, 'action="recibir.php" señala el destino del envío.'),
      q('php-isset-check', '¿Qué comprueba isset($_POST["correo"])?', ['Que sea un correo válido', 'Que exista la entrada y no sea NULL', 'Que el usuario tenga una cuenta'], 1, 'isset solo verifica presencia y ausencia de NULL; no valida que el texto sea un correo.'),
      q('php-server-validation', '¿Dónde se deben validar los datos recibidos?', ['Solo en el CSS', 'Solo en el navegador', 'También en el servidor'], 2, 'La validación del navegador puede omitirse. El servidor debe validar lo recibido antes de usarlo.')
    ])
  ]),
  java: unit('java', 'Variables, métodos y clases', 'Valores tipados y primeros objetos.', [
    lesson('java', 'valores', 'Calculá y tomá decisiones', 'Reconocé tipos y llamadas a métodos.', [
      'Java declara tipos: int representa enteros, String texto y boolean valores true o false. System.out.println muestra una línea de salida. if elige un bloque según una condición y else una alternativa.',
      'Un método agrupa instrucciones. Sus parámetros reciben argumentos; return devuelve el resultado. En este ejemplo static permite llamar a doble desde main sin crear un objeto de la clase.'
    ], 'class Inicio {\n  static int doble(int numero) {\n    return numero * 2;\n  }\n  public static void main(String[] args) {\n    int puntos = doble(3);\n    if (puntos >= 5) {\n      System.out.println("Meta");\n    } else {\n      System.out.println("Seguir");\n    }\n  }\n}', [
      q('java-int-type', '¿Qué tipo tiene puntos?', ['String', 'int', 'boolean'], 1, 'int puntos declara una variable entera.'),
      q('java-method-result', '¿Qué devuelve doble(3)?', ['6', '3', '2'], 0, 'El método devuelve numero * 2: con 3 produce 6.'),
      q('java-if-message', '¿Qué línea muestra el programa?', ['Seguir', 'Las dos', 'Meta'], 2, 'puntos vale 6 y cumple puntos >= 5.'),
      q('java-parameter', '¿Cuál es el parámetro del método doble?', ['puntos', 'numero', 'Inicio'], 1, 'numero es el parámetro declarado como int en la firma del método.')
    ]),
    lesson('java', 'objetos', 'Creá objetos a partir de una clase', 'Distinguí clase, constructor e instancia.', [
      'Una clase define datos y comportamientos. Un objeto es una instancia creada con new. Cada objeto tiene sus propios campos de instancia. El constructor se llama como la clase y prepara el nuevo objeto.',
      'this se refiere al objeto actual; this.nombre distingue el campo del parámetro nombre. Un método de instancia se invoca sobre un objeto, como alumna.saludar(). Diferentes objetos pueden tener nombres distintos.'
    ], 'class Alumno {\n  String nombre;\n  Alumno(String nombre) {\n    this.nombre = nombre;\n  }\n  String saludar() {\n    return "Hola, " + nombre;\n  }\n}\n// Dentro de un método:\nAlumno alumna = new Alumno("Luz");\nSystem.out.println(alumna.saludar());', [
      q('java-class-object', '¿Cuál es la clase del ejemplo?', ['alumna', 'nombre', 'Alumno'], 2, 'Alumno es la clase; alumna es una variable que referencia una instancia.'),
      q('java-new-instance', '¿Qué hace new Alumno("Luz")?', ['Crea un objeto e invoca su constructor', 'Cambia todas las clases', 'Solo imprime Luz'], 0, 'new crea una instancia y el constructor inicializa su campo nombre.'),
      q('java-this-field', '¿Qué identifica this.nombre?', ['Una variable global', 'El campo nombre del objeto actual', 'El nombre de la clase'], 1, 'this señala el objeto cuya construcción o método se está ejecutando.'),
      q('java-instance-greeting', '¿Qué devuelve alumna.saludar()?', ['Hola, Alumno', 'nombre', 'Hola, Luz'], 2, 'El objeto guarda Luz en nombre, por lo que el método devuelve Hola, Luz.')
    ])
  ]),
  node: unit('node', 'JavaScript fuera del navegador', 'Módulos y un primer servidor HTTP.', [
    lesson('node', 'modulos', 'Ejecutá y compartí funciones', 'Usá Node.js con módulos ES.', [
      'Node.js ejecuta JavaScript fuera del navegador, por ejemplo en un servidor o en la terminal. node archivo.mjs ejecuta un archivo. .mjs identifica un módulo ES en este ejemplo.',
      'export permite ofrecer una función a otros módulos; import la incorpora. Una ruta relativa como ./saludo.mjs busca un archivo desde el módulo actual. console.log muestra la salida en la terminal, no en una página.'
    ], '// saludo.mjs\nexport function saludar(nombre) {\n  return "Hola, " + nombre;\n}\n\n// app.mjs\nimport { saludar } from "./saludo.mjs";\nconsole.log(saludar("Luz"));\n\n// En la terminal: node app.mjs', [
      q('node-run-command', '¿Qué comando ejecuta el ejemplo?', ['npm saludo', 'node app.mjs', 'open app.mjs'], 1, 'node app.mjs inicia la ejecución del archivo con Node.js.'),
      q('node-export-function', '¿Qué palabra ofrece saludar a otros módulos?', ['export', 'return', 'console'], 0, 'export hace que la función pueda importarse desde otro módulo.'),
      q('node-module-path', '¿Qué indica ./saludo.mjs?', ['Una dirección de internet', 'Un elemento HTML', 'Un archivo relativo al módulo actual'], 2, './ indica una ruta relativa al archivo que realiza la importación.'),
      q('node-console-output', '¿Dónde aparece Hola, Luz al ejecutar app.mjs?', ['En el CSS', 'En la terminal', 'En un formulario'], 1, 'En este programa Node.js, console.log escribe en la salida de la terminal.')
    ]),
    lesson('node', 'rutas', 'Respondé una petición HTTP', 'Distinguí ruta, respuesta y puerto.', [
      'El módulo integrado node:http permite crear un servidor con createServer. La función recibe req (petición) y res (respuesta). req.url contiene la URL solicitada, incluida su consulta si existe.',
      'Este ejemplo compara exactamente req.url con "/": solo esa dirección recibe Hola. res.statusCode define un estado HTTP; 404 indica que no se encontró el recurso. res.end envía el contenido y finaliza la respuesta. listen(3000) escucha en el puerto 3000. Es una ruta didáctica, no un servidor de producción.'
    ], 'import { createServer } from "node:http";\nconst servidor = createServer((req, res) => {\n  if (req.url === "/") {\n    res.end("Hola");\n  } else {\n    res.statusCode = 404;\n    res.end("No encontrado");\n  }\n});\nservidor.listen(3000);', [
      q('node-http-module', '¿Qué módulo se usa para crear el servidor?', ['node:css', 'vue', 'node:http'], 2, 'node:http es un módulo integrado de Node.js para trabajar con HTTP.'),
      q('node-root-route', '¿Qué devuelve una petición cuya req.url es exactamente /?', ['Hola', 'No encontrado', '3000'], 0, 'La comparación con "/" es verdadera y se ejecuta res.end("Hola").'),
      q('node-missing-route', '¿Qué estado recibe /cursos en este ejemplo?', ['200', '404', '3000'], 1, 'Esa ruta entra en el else y el servidor asigna statusCode = 404.'),
      q('node-end-response', '¿Qué hace res.end?', ['Abre el navegador', 'Declara el puerto', 'Envía contenido y finaliza la respuesta'], 2, 'res.end termina la respuesta HTTP y puede incluir su cuerpo de texto.')
    ])
  ])
}
