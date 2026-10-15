-- Generado con npm run db:seed:generate. Carga inicial, no sobrescribe ediciones del equipo.
begin;

insert into public.courses (id, name, description, category, visual_label, visual_caption, position, publication_status) values
('html', 'HTML', 'Construí la estructura de una página con etiquetas, enlaces, imágenes y formularios.', 'Desarrollo web', 'HTML', 'La estructura de la web', 1, 'published'),
('css', 'CSS', 'Dale estilo a tus páginas con colores, tipografías, modelo de caja y diseño adaptable.', 'Desarrollo web', 'CSS', 'Ideas que toman forma', 2, 'published'),
('javascript', 'JavaScript', 'Conocé variables, operadores, condiciones, bucles y funciones para dar tus primeros pasos.', 'Programación', 'JS', 'Tu primera interacción', 3, 'published'),
('vue', 'Tutorial de Vue.js', 'Descubrí componentes, directivas, reactividad y eventos para crear interfaces.', 'Interfaces', 'Vue', 'Interfaces por componentes', 4, 'published'),
('react', 'Tutorial de React', 'Explorá componentes, JSX, propiedades y estado para construir interfaces.', 'Interfaces', 'React', 'Piezas que se conectan', 5, 'published'),
('sql', 'SQL', 'Organizá datos en tablas y aprendé consultas, filtros y operaciones básicas.', 'Datos', 'SQL', 'Preguntas para tus datos', 6, 'published'),
('php', 'PHP', 'Aprendé sintaxis, variables y formularios para introducirte al desarrollo del lado del servidor.', 'Servidor', 'PHP', 'Detrás de cada página', 7, 'published'),
('java', 'Java', 'Empezá con variables, estructuras de control, métodos y clases.', 'Programación', 'Java', 'Bases para construir', 8, 'published'),
('node', 'Node.js', 'Ejecutá JavaScript en el servidor y conocé módulos y primeras rutas.', 'Servidor', 'Node', 'JavaScript en el servidor', 9, 'published')
on conflict do nothing;

insert into public.units (id, course_id, title, description, icon, position, is_available, publication_status) values
('html-fundamentos', 'html', 'Tu primera página', 'Estructura, enlaces, imágenes y formularios.', 'auto_stories', 1, true, 'published'),
('css-fundamentos', 'css', 'Estilo y distribución', 'Selectores, tipografía, cajas y pantallas pequeñas.', 'auto_stories', 1, true, 'published'),
('variables', 'javascript', 'Variables y tipos de datos', 'Guardá información y distinguí números, textos y valores lógicos.', 'inventory_2', 1, true, 'published'),
('operadores', 'javascript', 'Operadores y expresiones', 'Calculá resultados y compará valores para formar condiciones.', 'calculate', 2, false, 'published'),
('condicionales', 'javascript', 'Condicionales', 'Elegí qué instrucciones ejecutar según lo que ocurra.', 'call_split', 3, false, 'published'),
('bucles', 'javascript', 'Bucles', 'Repetí instrucciones con un contador y una condición de salida.', 'repeat', 4, false, 'published'),
('funciones', 'javascript', 'Funciones', 'Organizá instrucciones reutilizables con parámetros y retornos.', 'functions', 5, false, 'published'),
('vue-fundamentos', 'vue', 'Componentes e interacción', 'Plantillas, directivas, reactividad y eventos con Vue.', 'auto_stories', 1, true, 'published'),
('react-fundamentos', 'react', 'Primeros componentes', 'JSX, propiedades, estado e interacción.', 'auto_stories', 1, true, 'published'),
('sql-fundamentos', 'sql', 'Consultá y modificá datos', 'Tablas, consultas, filtros y operaciones básicas.', 'auto_stories', 1, true, 'published'),
('php-fundamentos', 'php', 'Primeros pasos en el servidor', 'Variables, decisiones y recepción de formularios.', 'auto_stories', 1, true, 'published'),
('java-fundamentos', 'java', 'Variables, métodos y clases', 'Valores tipados y primeros objetos.', 'auto_stories', 1, true, 'published'),
('node-fundamentos', 'node', 'JavaScript fuera del navegador', 'Módulos y un primer servidor HTTP.', 'auto_stories', 1, true, 'published')
on conflict do nothing;

insert into public.lessons (id, unit_id, title, description, content, code, position, publication_status) values
('html-estructura', 'html-fundamentos', 'Organizá una página con HTML', 'Reconocé títulos, párrafos y recursos.', array['HTML describe la estructura del contenido. h1 identifica el encabezado principal y p un párrafo. Las etiquetas delimitan elementos; muchas tienen apertura y cierre.', 'Un enlace usa a y href para indicar el destino. Una imagen usa img y src para su archivo. alt aporta una alternativa textual para transmitir el contenido de una imagen informativa.']::text[], '<h1>Mi primera página</h1>
<p>Estoy aprendiendo.</p>
<a href="/cursos">Ver cursos</a>
<img src="logo.svg" alt="CodePath">', 1, 'published'),
('html-formularios', 'html-fundamentos', 'Pedí información con formularios', 'Relacioná etiquetas, campos y botones.', array['form agrupa los controles. label describe un campo y su atributo for coincide con el id del input. Esa relación también permite enfocar el campo al pulsar su etiqueta.', 'type="email" identifica un correo; required exige completar el campo antes de un envío normal del navegador. name es la clave que se envía. Un button con type="submit" solicita enviar el formulario. La validación del navegador no reemplaza la del servidor.']::text[], '<form>
  <label for="correo">Correo</label>
  <input id="correo" name="email"
    type="email" required>
  <button type="submit">Enviar</button>
</form>', 2, 'published'),
('css-estilos', 'css-fundamentos', 'Aplicá tus primeros estilos', 'Separá selector, propiedad y valor.', array['Una regla CSS tiene un selector y declaraciones entre llaves. Cada declaración combina propiedad y valor. .tarjeta selecciona elementos con class="tarjeta"; sin el punto, un selector como h1 busca etiquetas.', 'color cambia el texto; background-color cambia el fondo. font-family elige una familia tipográfica y alternativas. font-size fija el tamaño de texto; border-radius redondea las esquinas.']::text[], '.tarjeta {
  color: #17243D;
  background-color: white;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  border-radius: 12px;
}', 1, 'published'),
('css-adaptable', 'css-fundamentos', 'Distribuí cajas en distintas pantallas', 'Diferenciá padding, margin y reglas adaptables.', array['El modelo de caja incluye contenido, padding, borde y margin. padding separa el contenido del borde; margin separa una caja de otras. Con box-sizing: border-box, el ancho declarado incluye padding y borde.', 'display: flex distribuye elementos hijos; gap deja espacio entre ellos. flex-wrap: wrap permite nuevas filas. Una media query aplica reglas según una condición: max-width: 600px se cumple si la ventana mide 600 píxeles o menos.']::text[], '.tarjeta {
  box-sizing: border-box;
  padding: 16px;
  margin: 8px;
}
.lista { display: flex; gap: 12px; }
@media (max-width: 600px) {
  .lista { flex-wrap: wrap; }
}', 2, 'published'),
('guardar-valores', 'variables', 'Guardá tus primeros valores', 'Conocé let y const.', array['JavaScript permite escribir instrucciones para trabajar con información. Una variable tiene un nombre y un valor.', 'let permite reasignar el valor; const impide reasignarlo. Usamos console.log para mostrarlo. Las instrucciones de estos ejemplos se leen de arriba hacia abajo.']::text[], 'let puntos = 1;
puntos = 3;
const nombre = "Ana";
console.log(puntos);', 1, 'published'),
('tipos-datos', 'variables', 'Números, textos y booleanos', 'Reconocé el tipo de cada valor.', array['Los números se escriben sin comillas. Las cadenas de texto usan comillas y los booleanos son true o false.', 'typeof permite consultar el tipo de un valor. Un número entre comillas es texto, aunque se vea como una cantidad.']::text[], 'const edad = 18;
const nombre = "Luz";
const activo = true;
console.log(typeof edad);', 2, 'published'),
('calculos', 'operadores', 'Hacé tus primeros cálculos', 'Sumá, multiplicá y agrupá operaciones.', array['Los operadores +, -, * y / permiten sumar, restar, multiplicar y dividir números.', 'La multiplicación se resuelve antes que la suma. Los paréntesis permiten cambiar el orden de las operaciones.']::text[], 'const total = 2 + 3 * 4;
const agrupado = (2 + 3) * 4;', 1, 'draft'),
('comparaciones', 'operadores', 'Compará y combiná condiciones', 'Usá ===, >= y &&.', array['=== comprueba igualdad de valor y tipo. >= pregunta si un valor es mayor o igual que otro.', '&& devuelve true si ambas condiciones booleanas son verdaderas. || lo hace si al menos una lo es; ! invierte un booleano.']::text[], 'const edad = 18;
const tieneEntrada = true;
const puedeEntrar = edad >= 18 && tieneEntrada;', 2, 'draft'),
('if-else', 'condicionales', 'Elegí entre dos caminos', 'Tomá decisiones con if y else.', array['if ejecuta un bloque cuando la condición es verdadera. else ofrece una alternativa si es falsa.', 'En este ejemplo se ejecuta solo uno de los dos bloques. Comparar un valor no lo modifica.']::text[], 'const puntos = 3;
if (puntos >= 5) {
  console.log("Meta alcanzada");
} else {
  console.log("Seguí practicando");
}', 1, 'draft'),
('else-if', 'condicionales', 'Evaluá varias alternativas', 'Ordená decisiones con else if.', array['else if agrega otra condición cuando la anterior fue falsa. La cadena se evalúa de arriba hacia abajo.', 'Se ejecuta únicamente el primer bloque cuya condición se cumple. Si ninguna se cumple, se usa el else final.']::text[], 'const nota = 7;
if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 6) {
  console.log("Aprobado");
} else {
  console.log("A repasar");
}', 2, 'draft'),
('bucle-for', 'bucles', 'Repetí con for', 'Controlá el inicio, la condición y el incremento.', array['for agrupa un inicio, una condición y una actualización. Antes de cada vuelta comprueba la condición.', 'i++ aumenta el contador en uno al terminar la vuelta. En i < 3, el valor 3 queda fuera del recorrido.']::text[], 'for (let i = 0; i < 3; i++) {
  console.log(i);
}', 1, 'draft'),
('bucle-while', 'bucles', 'Repetí mientras se cumpla una condición', 'Reconocé cuándo se detiene un while.', array['while comprueba la condición antes de cada vuelta. Si es falsa desde el principio, no ejecuta el cuerpo.', 'Hay que actualizar los valores que permiten terminar. Si la condición nunca deja de ser verdadera, el bucle puede continuar indefinidamente.']::text[], 'let intentos = 0;
while (intentos < 2) {
  intentos++;
}
console.log(intentos);', 2, 'draft'),
('parametros', 'funciones', 'Pasá información a una función', 'Definí parámetros y llamá a una función.', array['Una función agrupa instrucciones con un nombre. Declararla prepara ese bloque; una llamada lo ejecuta.', 'Los parámetros reciben los argumentos de cada llamada. return entrega un valor al código que llamó a la función.']::text[], 'function doble(numero) {
  return numero * 2;
}
const resultado = doble(4);', 1, 'draft'),
('retornos', 'funciones', 'Usá el resultado de una función', 'Diferenciá return de mostrar un mensaje.', array['return devuelve un valor y termina esa llamada a la función. console.log muestra un mensaje, pero no sustituye a return.', 'Podés guardar el resultado de una llamada y usarlo en otra expresión. Cada llamada puede recibir argumentos diferentes.']::text[], 'function sumar(a, b) {
  return a + b;
}
const total = sumar(2, 3) + 1;', 2, 'draft'),
('vue-plantillas', 'vue-fundamentos', 'Mostrá datos en un componente', 'Leé una plantilla y usá directivas.', array['Un componente Vue reúne una parte reutilizable de la interfaz. En un archivo .vue, script setup declara datos y template describe lo que se muestra. {{ nombre }} interpola el valor de nombre como texto.', 'v-if incluye un elemento cuando la expresión es verdadera. v-for repite elementos de una lista; :key aporta una identidad estable. :src es la abreviatura de v-bind:src y toma el valor de una expresión.']::text[], '<script setup>
const nombre = "Luz";
const mostrar = true;
const temas = ["HTML", "CSS"];
</script>
<template>
  <h1>Hola, {{ nombre }}</h1>
  <ul v-if="mostrar">
    <li v-for="tema in temas" :key="tema">
      {{ tema }}
    </li>
  </ul>
</template>', 1, 'published'),
('vue-reactividad', 'vue-fundamentos', 'Respondé a eventos con datos reactivos', 'Usá ref, funciones y @click.', array['ref crea un valor reactivo. Dentro del script se lee o modifica con .value. Vue detecta el cambio y actualiza la vista; en la plantilla se puede usar el nombre del ref directamente, sin .value.', '@click registra qué función se ejecuta al pulsar un botón. v-model vincula un control con un dato reactivo: escribir en el input actualiza ese valor.']::text[], '<script setup>
import { ref } from "vue";
const puntos = ref(0);
const nombre = ref("");
function sumar() { puntos.value++; }
</script>
<template>
  <input v-model="nombre">
  <button @click="sumar">{{ puntos }}</button>
</template>', 2, 'published'),
('react-componentes', 'react-fundamentos', 'Componé una interfaz con JSX', 'Pasá información con propiedades.', array['Un componente React puede ser una función que devuelve JSX, una sintaxis para describir la interfaz. Los nombres de componentes comienzan con mayúscula, como Saludo. Los elementos HTML usan minúscula.', 'Las llaves dentro de JSX permiten insertar expresiones de JavaScript. Las propiedades o props llevan datos del padre al hijo; el hijo debe tratarlas como información de solo lectura. En JSX se usa className para una clase CSS.']::text[], 'function Saludo({ nombre }) {
  return <h1 className="titulo">Hola, {nombre}</h1>;
}

export default function App() {
  return <Saludo nombre="Luz" />;
}', 1, 'published'),
('react-estado', 'react-fundamentos', 'Actualizá la pantalla con estado', 'Usá useState y eventos.', array['useState agrega estado al componente y devuelve el valor actual junto con una función para actualizarlo. Se llama en el nivel superior del componente, no dentro de condiciones. Su argumento define el valor inicial.', 'onClick recibe una función que se ejecuta al hacer clic. Para calcular a partir del estado anterior se puede usar una actualización funcional: setPuntos(actual => actual + 1). React vuelve a renderizar para mostrar el nuevo estado.']::text[], 'import { useState } from "react";

export default function Contador() {
  const [puntos, setPuntos] = useState(0);
  return (
    <button onClick={() => setPuntos(n => n + 1)}>
      Puntos: {puntos}
    </button>
  );
}', 2, 'published'),
('sql-consultas', 'sql-fundamentos', 'Leé información de una tabla', 'Seleccioná columnas, filtrá y ordená.', array['Una tabla organiza registros en filas y atributos en columnas. SELECT indica qué columnas consultar; FROM indica la tabla. SELECT * solicita todas las columnas.', 'WHERE filtra filas según una condición. ORDER BY ordena el resultado; ASC indica orden ascendente y DESC descendente. Consultar con SELECT no modifica los datos almacenados.']::text[], '-- Tabla alumnos: nombre y puntos
-- Ana: 8; Luz: 3; Leo: 6
SELECT nombre, puntos
FROM alumnos
WHERE puntos >= 6
ORDER BY puntos DESC;', 1, 'published'),
('sql-operaciones', 'sql-fundamentos', 'Creá registros y actualizalos', 'Conocé claves y cambios controlados.', array['CREATE TABLE define una tabla y los tipos de sus columnas. INTEGER guarda enteros y VARCHAR texto de longitud limitada. PRIMARY KEY identifica cada fila de forma única y no admite NULL. NOT NULL exige un valor.', 'INSERT agrega filas; UPDATE cambia valores; DELETE elimina filas. WHERE limita las filas afectadas por UPDATE y DELETE. Sin WHERE esas dos operaciones alcanzan todas las filas; comprobá siempre el filtro antes de ejecutarlas.']::text[], 'CREATE TABLE tareas (
  id INTEGER PRIMARY KEY,
  titulo VARCHAR(80) NOT NULL
);
INSERT INTO tareas (id, titulo)
VALUES (1, ''Leer HTML'');
UPDATE tareas SET titulo = ''Leer CSS''
WHERE id = 1;
DELETE FROM tareas WHERE id = 1;', 2, 'published'),
('php-sintaxis', 'php-fundamentos', 'Trabajá con variables en PHP', 'Leé expresiones y condiciones.', array['PHP ejecuta instrucciones en el servidor. El bloque empieza con <?php. Las variables llevan $ delante del nombre y las instrucciones habituales terminan con punto y coma. echo escribe una salida.', 'El operador . concatena textos, mientras que + suma números. if ejecuta un bloque si la condición es verdadera; else ofrece la alternativa. El operador >= incluye la igualdad.']::text[], '<?php
$nombre = "Luz";
$puntos = 2 + 3;
if ($puntos >= 5) {
  echo "Hola, " . $nombre;
} else {
  echo "A practicar";
}', 1, 'published'),
('php-formularios', 'php-fundamentos', 'Recibí un formulario', 'Relacioná POST, name y validación del servidor.', array['Un formulario con method="post" envía campos al servidor. action indica el destino. El atributo name del campo se usa como clave en $_POST. PHP recibe datos; el navegador no ejecuta este código PHP.', '$_SERVER["REQUEST_METHOD"] permite consultar el método de la petición. isset comprueba que una entrada exista y no sea NULL; no valida su contenido. Los datos del formulario deben validarse en el servidor. Si se muestran en HTML, también se deben escapar: este ejemplo solo muestra un mensaje fijo.']::text[], '<!-- formulario.html -->
<form action="recibir.php" method="post">
  <input name="correo" type="email" required>
  <button>Enviar</button>
</form>

// recibir.php, dentro de <?php
if ($_SERVER["REQUEST_METHOD"] === "POST"
    && isset($_POST["correo"])) {
  echo "Formulario recibido";
}', 2, 'published'),
('java-valores', 'java-fundamentos', 'Calculá y tomá decisiones', 'Reconocé tipos y llamadas a métodos.', array['Java declara tipos: int representa enteros, String texto y boolean valores true o false. System.out.println muestra una línea de salida. if elige un bloque según una condición y else una alternativa.', 'Un método agrupa instrucciones. Sus parámetros reciben argumentos; return devuelve el resultado. En este ejemplo static permite llamar a doble desde main sin crear un objeto de la clase.']::text[], 'class Inicio {
  static int doble(int numero) {
    return numero * 2;
  }
  public static void main(String[] args) {
    int puntos = doble(3);
    if (puntos >= 5) {
      System.out.println("Meta");
    } else {
      System.out.println("Seguir");
    }
  }
}', 1, 'published'),
('java-objetos', 'java-fundamentos', 'Creá objetos a partir de una clase', 'Distinguí clase, constructor e instancia.', array['Una clase define datos y comportamientos. Un objeto es una instancia creada con new. Cada objeto tiene sus propios campos de instancia. El constructor se llama como la clase y prepara el nuevo objeto.', 'this se refiere al objeto actual; this.nombre distingue el campo del parámetro nombre. Un método de instancia se invoca sobre un objeto, como alumna.saludar(). Diferentes objetos pueden tener nombres distintos.']::text[], 'class Alumno {
  String nombre;
  Alumno(String nombre) {
    this.nombre = nombre;
  }
  String saludar() {
    return "Hola, " + nombre;
  }
}
// Dentro de un método:
Alumno alumna = new Alumno("Luz");
System.out.println(alumna.saludar());', 2, 'published'),
('node-modulos', 'node-fundamentos', 'Ejecutá y compartí funciones', 'Usá Node.js con módulos ES.', array['Node.js ejecuta JavaScript fuera del navegador, por ejemplo en un servidor o en la terminal. node archivo.mjs ejecuta un archivo. .mjs identifica un módulo ES en este ejemplo.', 'export permite ofrecer una función a otros módulos; import la incorpora. Una ruta relativa como ./saludo.mjs busca un archivo desde el módulo actual. console.log muestra la salida en la terminal, no en una página.']::text[], '// saludo.mjs
export function saludar(nombre) {
  return "Hola, " + nombre;
}

// app.mjs
import { saludar } from "./saludo.mjs";
console.log(saludar("Luz"));

// En la terminal: node app.mjs', 1, 'published'),
('node-rutas', 'node-fundamentos', 'Respondé una petición HTTP', 'Distinguí ruta, respuesta y puerto.', array['El módulo integrado node:http permite crear un servidor con createServer. La función recibe req (petición) y res (respuesta). req.url contiene la URL solicitada, incluida su consulta si existe.', 'Este ejemplo compara exactamente req.url con "/": solo esa dirección recibe Hola. res.statusCode define un estado HTTP; 404 indica que no se encontró el recurso. res.end envía el contenido y finaliza la respuesta. listen(3000) escucha en el puerto 3000. Es una ruta didáctica, no un servidor de producción.']::text[], 'import { createServer } from "node:http";
const servidor = createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hola");
  } else {
    res.statusCode = 404;
    res.end("No encontrado");
  }
});
servidor.listen(3000);', 2, 'published')
on conflict do nothing;

insert into public.questions (id, lesson_id, intro_course_id, title, prompt, concept, code, position, publication_status) values
('html-lesson-h1', 'html-estructura', null, null, '¿Qué elemento representa el encabezado principal?', null, null, 1, 'published'),
('html-lesson-paragraph', 'html-estructura', null, null, '¿Dónde pondrías un párrafo de presentación?', null, null, 2, 'published'),
('html-lesson-link', 'html-estructura', null, null, '¿Qué atributo determina el destino de Ver cursos?', null, null, 3, 'published'),
('html-lesson-alt', 'html-estructura', null, null, '¿Para qué sirve alt en esta imagen?', null, null, 4, 'published'),
('html-form-label', 'html-formularios', null, null, '¿Qué valor debe tener for para asociar la etiqueta al campo?', null, null, 1, 'published'),
('html-form-email', 'html-formularios', null, null, '¿Qué atributo identifica este campo como correo electrónico?', null, null, 2, 'published'),
('html-form-required', 'html-formularios', null, null, '¿Qué atributo exige completar el campo?', null, null, 3, 'published'),
('html-form-submit', 'html-formularios', null, null, '¿Qué hace el botón con type="submit"?', null, null, 4, 'published'),
('html-heading', null, 'html', 'Una página con estructura', '¿Qué etiqueta representa el encabezado principal?', 'HTML describe la estructura del contenido. La etiqueta h1 representa el encabezado principal; p representa un párrafo.', '<h1>Mi primera página</h1>
<p>Estoy aprendiendo HTML.</p>', 1, 'published'),
('html-link', null, 'html', 'Conectá tus páginas', '¿Qué atributo indica a dónde lleva el enlace?', 'Un enlace usa la etiqueta a y el atributo href para indicar su destino. Una imagen usa img y src para indicar el archivo.', '<a href="/cursos">Explorar cursos</a>', 2, 'published'),
('html-form', null, 'html', 'Tu primer formulario', '¿Qué valor de type se usa para un campo de correo?', 'form agrupa campos. label nombra un campo y se asocia a su id mediante for. Un input de tipo email permite ingresar una dirección de correo.', '<form>
  <label for="correo">Correo</label>
  <input id="correo" type="email">
</form>', 3, 'published'),
('css-selector', 'css-estilos', null, null, '¿Qué selecciona .tarjeta?', null, null, 1, 'published'),
('css-text-color', 'css-estilos', null, null, '¿Qué propiedad cambia el color del texto?', null, null, 2, 'published'),
('css-font-family', 'css-estilos', null, null, '¿Qué propiedad elige la familia tipográfica?', null, null, 3, 'published'),
('css-round-corners', 'css-estilos', null, null, '¿Qué propiedad redondea las esquinas?', null, null, 4, 'published'),
('css-padding', 'css-adaptable', null, null, '¿Qué propiedad agrega espacio dentro del borde?', null, null, 1, 'published'),
('css-border-box', 'css-adaptable', null, null, 'Con border-box, ¿qué incluye el ancho declarado?', null, null, 2, 'published'),
('css-gap', 'css-adaptable', null, null, '¿Qué propiedad separa los hijos de .lista?', null, null, 3, 'published'),
('css-media', 'css-adaptable', null, null, '¿A qué ancho se aplica la media query del ejemplo?', null, null, 4, 'published'),
('css-color', null, 'css', 'Un poco de color', '¿Qué cambia esta regla?', 'CSS cambia la presentación. color modifica el texto y background-color modifica el fondo.', 'h1 {
  color: #5B4BDB;
}', 1, 'published'),
('css-box', null, 'css', 'Entendé la caja', '¿Qué propiedad agrega espacio entre el contenido y su borde?', 'Cada elemento tiene contenido, relleno (padding), borde y margen. padding separa el contenido del borde; margin separa la caja de otros elementos.', '.tarjeta {
  padding: 16px;
  margin: 24px;
}', 2, 'published'),
('css-responsive', null, 'css', 'Diseño que se adapta', '¿Cuándo se aplica esta regla?', 'Una media query aplica reglas si se cumple una condición. max-width: 600px significa un ancho de ventana menor o igual a 600 píxeles CSS.', '@media (max-width: 600px) {
  .cursos { grid-template-columns: 1fr; }
}', 3, 'published'),
('js-let', 'guardar-valores', null, null, '¿Qué valor muestra console.log(puntos)?', null, null, 1, 'published'),
('js-const', 'guardar-valores', null, null, '¿Qué declaración elegirías para un valor que no vas a reasignar?', null, null, 2, 'published'),
('js-log-name', 'guardar-valores', null, null, '¿Qué instrucción muestra el valor guardado en nombre?', null, null, 3, 'published'),
('js-reassign', 'guardar-valores', null, null, '¿Qué declaración permite cambiar su valor después?', null, null, 4, 'published'),
('js-type-number', 'tipos-datos', null, null, '¿Qué devuelve typeof edad?', null, null, 1, 'published'),
('js-type-boolean', 'tipos-datos', null, null, '¿Cuál de estos valores es booleano?', null, null, 2, 'published'),
('js-type-string', 'tipos-datos', null, null, '¿Qué devuelve typeof "18"?', null, null, 3, 'published'),
('js-type-name', 'tipos-datos', null, null, '¿Qué devuelve typeof nombre en el ejemplo?', null, null, 4, 'published'),
('js-priority', 'calculos', null, null, '¿Cuánto vale total?', null, null, 1, 'draft'),
('js-parentheses', 'calculos', null, null, '¿Cuánto vale agrupado?', null, null, 2, 'draft'),
('js-subtract', 'calculos', null, null, '¿Cuánto da 8 - 3?', null, 'const diferencia = 8 - 3;', 3, 'draft'),
('js-divide', 'calculos', null, null, '¿Cuánto da 12 / 4?', null, 'const partes = 12 / 4;', 4, 'draft'),
('js-and', 'comparaciones', null, null, '¿Cuánto vale puedeEntrar?', null, null, 1, 'draft'),
('js-strict', 'comparaciones', null, null, '¿Qué resultado da 5 === "5"?', null, null, 2, 'draft'),
('js-or', 'comparaciones', null, null, '¿Qué devuelve false || true?', null, null, 3, 'draft'),
('js-not', 'comparaciones', null, null, '¿Qué devuelve !true?', null, null, 4, 'draft'),
('js-else', 'if-else', null, null, '¿Qué mensaje se muestra con puntos = 3?', null, null, 1, 'draft'),
('js-boundary', 'if-else', null, null, 'Si puntos fuera 5, ¿qué mensaje se mostraría?', null, null, 2, 'draft'),
('js-if-high', 'if-else', null, null, 'Con puntos = 8, ¿qué bloque se ejecuta?', null, null, 3, 'draft'),
('js-if-value', 'if-else', null, null, 'Después de comparar puntos >= 5, ¿cambia el valor de puntos?', null, null, 4, 'draft'),
('js-else-if', 'else-if', null, null, '¿Qué texto se muestra con nota = 7?', null, null, 1, 'draft'),
('js-first-branch', 'else-if', null, null, 'Con nota = 10, ¿cuántos mensajes se muestran?', null, null, 2, 'draft'),
('js-low-grade', 'else-if', null, null, '¿Qué se muestra si nota vale 4?', null, null, 3, 'draft'),
('js-grade-six', 'else-if', null, null, '¿Qué se muestra con nota = 6?', null, null, 4, 'draft'),
('js-for-count', 'bucle-for', null, null, '¿Cuántas veces se ejecuta console.log?', null, null, 1, 'draft'),
('js-for-last', 'bucle-for', null, null, '¿Cuál es el último número que se muestra?', null, null, 2, 'draft'),
('js-for-first', 'bucle-for', null, null, '¿Cuál es el primer valor que se muestra?', null, null, 3, 'draft'),
('js-for-increment', 'bucle-for', null, null, '¿Qué hace i++ al terminar una vuelta?', null, null, 4, 'draft'),
('js-while-end', 'bucle-while', null, null, '¿Qué valor tiene intentos al terminar?', null, null, 1, 'draft'),
('js-while-infinite', 'bucle-while', null, null, '¿Qué pasaría si se quitara intentos++ de este ejemplo?', null, null, 2, 'draft'),
('js-while-zero', 'bucle-while', null, null, 'Si intentos empezara en 2, ¿cuántas vueltas daría?', null, null, 3, 'draft'),
('js-while-one', 'bucle-while', null, null, 'Si intentos empezara en 1, ¿cuántas vueltas daría?', null, null, 4, 'draft'),
('js-parameter-name', 'parametros', null, null, '¿Cuál es el parámetro de doble?', null, null, 1, 'draft'),
('js-call-result', 'parametros', null, null, '¿Cuánto vale resultado?', null, null, 2, 'draft'),
('js-argument', 'parametros', null, null, 'En doble(4), ¿cuál es el argumento?', null, null, 3, 'draft'),
('js-double-six', 'parametros', null, null, '¿Qué devuelve doble(6)?', null, null, 4, 'draft'),
('js-return', 'retornos', null, null, '¿Cuánto vale total?', null, null, 1, 'draft'),
('js-return-purpose', 'retornos', null, null, '¿Para qué se usa return en este ejemplo?', null, null, 2, 'draft'),
('js-return-call', 'retornos', null, null, '¿Qué devuelve sumar(4, 2)?', null, null, 3, 'draft'),
('js-return-end', 'retornos', null, null, '¿Qué pasa al ejecutar return en una función?', null, null, 4, 'draft'),
('javascript-variable', null, 'javascript', 'Guardá un valor', '¿Qué número muestra console.log?', 'Una variable permite guardar un valor. let permite cambiarlo y el operador + suma números.', 'let puntos = 2;
puntos = puntos + 3;
console.log(puntos);', 1, 'published'),
('javascript-condition', null, 'javascript', 'Tomá una decisión', '¿Qué ocurre al ejecutar este código?', 'if ejecuta un bloque cuando su condición es verdadera. El operador >= compara si el valor de la izquierda es mayor o igual al de la derecha.', 'const edad = 18;
if (edad >= 18) {
  console.log("Puede ingresar");
}', 2, 'published'),
('javascript-function', null, 'javascript', 'Reutilizá una idea', '¿Qué valor devuelve doble(4)?', 'Una función agrupa instrucciones. Sus parámetros reciben valores y return devuelve el resultado de la llamada.', 'function doble(numero) {
  return numero * 2;
}
console.log(doble(4));', 3, 'published'),
('vue-interpolation', 'vue-plantillas', null, null, '¿Qué texto muestra el h1?', null, null, 1, 'published'),
('vue-if-false', 'vue-plantillas', null, null, 'Si mostrar fuera false, ¿qué pasaría con ul?', null, null, 2, 'published'),
('vue-for-list', 'vue-plantillas', null, null, '¿Cuántos elementos li genera v-for?', null, null, 3, 'published'),
('vue-key-identity', 'vue-plantillas', null, null, '¿Para qué sirve :key en la lista?', null, null, 4, 'published'),
('vue-ref-start', 'vue-reactividad', null, null, '¿Cuánto vale puntos al comenzar?', null, null, 1, 'published'),
('vue-event-click', 'vue-reactividad', null, null, '¿Qué función se ejecuta al pulsar el botón?', null, null, 2, 'published'),
('vue-value-script', 'vue-reactividad', null, null, '¿Cómo se modifica puntos dentro del script?', null, null, 3, 'published'),
('vue-model-input', 'vue-reactividad', null, null, '¿Qué dato cambia al escribir en el input?', null, null, 4, 'published'),
('vue-directive', null, 'vue', 'Mostrá contenido', '¿Qué directiva permite mostrar este párrafo de forma condicional?', 'Vue permite construir interfaces con componentes. Sus directivas agregan comportamiento al HTML. v-if muestra un bloque solo cuando su condición es verdadera.', '<p v-if="hayCursos">Hay cursos para explorar</p>', 1, 'published'),
('vue-event', null, 'vue', 'Respondé a un clic', '¿Cuándo se llama a saludar?', 'En Vue, @ es la forma breve de v-on para escuchar eventos. @click conecta un clic con una función del componente.', '<button @click="saludar">Saludar</button>', 2, 'published'),
('vue-reactivity', null, 'vue', 'Una interfaz reactiva', '¿Cuánto vale contador.value después del incremento?', 'ref crea un valor reactivo. En JavaScript se lee y modifica mediante .value. Vue actualiza las partes de la interfaz que dependen de él.', 'import { ref } from "vue";
const contador = ref(0);
contador.value++;', 3, 'published'),
('react-component-name', 'react-componentes', null, null, '¿Cuál es un componente definido en el ejemplo?', null, null, 1, 'published'),
('react-prop-output', 'react-componentes', null, null, '¿Qué texto muestra Saludo?', null, null, 2, 'published'),
('react-css-class', 'react-componentes', null, null, '¿Qué atributo JSX asigna la clase CSS?', null, null, 3, 'published'),
('react-readonly-props', 'react-componentes', null, null, '¿Cómo debe tratar Saludo la prop nombre?', null, null, 4, 'published'),
('react-state-start', 'react-estado', null, null, '¿Qué muestra el contador inicialmente?', null, null, 1, 'published'),
('react-setter', 'react-estado', null, null, '¿Qué función actualiza el estado?', null, null, 2, 'published'),
('react-click-two', 'react-estado', null, null, 'Después de dos clics, ¿cuántos puntos se muestran?', null, null, 3, 'published'),
('react-handler', 'react-estado', null, null, '¿Por qué onClick recibe una función?', null, null, 4, 'published'),
('react-jsx', null, 'react', 'Tu primer componente', '¿Qué describe el JSX que devuelve Saludo?', 'Un componente de React puede ser una función que devuelve JSX. JSX permite describir la interfaz con una sintaxis similar a HTML.', 'function Saludo() {
  return <h1>Hola</h1>;
}', 1, 'published'),
('react-props', null, 'react', 'Pasá información', '¿Qué texto muestra ese uso de Saludo?', 'Las propiedades (props) llevan información de un componente padre a uno hijo. En JSX, las llaves permiten usar una expresión de JavaScript.', 'function Saludo({ nombre }) {
  return <p>Hola, {nombre}</p>;
}
// Uso: <Saludo nombre="Ana" />', 2, 'published'),
('react-state', null, 'react', 'Recordá un valor', '¿Cuál es la función para actualizar puntos?', 'useState crea estado en un componente. Devuelve el valor actual y una función para solicitar su actualización.', 'const [puntos, setPuntos] = useState(0);', 3, 'published'),
('sql-from-table', 'sql-consultas', null, null, '¿Qué tabla consulta el ejemplo?', null, null, 1, 'published'),
('sql-where-filter', 'sql-consultas', null, null, '¿Qué personas cumplen el filtro?', null, null, 2, 'published'),
('sql-desc-order', 'sql-consultas', null, null, '¿Quién aparece primero al ordenar por puntos DESC?', null, null, 3, 'published'),
('sql-select-safe', 'sql-consultas', null, null, '¿Qué hace esta consulta con los datos guardados?', null, null, 4, 'published'),
('sql-primary-key', 'sql-operaciones', null, null, '¿Qué columna identifica de forma única cada tarea?', null, null, 1, 'published'),
('sql-insert-row', 'sql-operaciones', null, null, '¿Qué instrucción agrega una tarea?', null, null, 2, 'published'),
('sql-update-title', 'sql-operaciones', null, null, 'Justo después del UPDATE, ¿qué título tiene la tarea 1?', null, null, 3, 'published'),
('sql-delete-where', 'sql-operaciones', null, null, '¿Qué ocurriría con DELETE FROM tareas sin WHERE?', null, null, 4, 'published'),
('sql-select', null, 'sql', 'Consultá una tabla', '¿Qué información pide esta consulta?', 'Una tabla organiza datos en filas y columnas. SELECT elige qué columnas consultar y FROM indica la tabla.', 'SELECT nombre FROM estudiantes;', 1, 'published'),
('sql-filter', null, 'sql', 'Elegí las filas', '¿Qué estudiantes incluye el resultado?', 'WHERE filtra las filas según una condición. El operador > significa mayor que.', 'SELECT nombre FROM estudiantes
WHERE edad > 18;', 2, 'published'),
('sql-insert', null, 'sql', 'Agregá datos', '¿Qué hace esta instrucción?', 'INSERT INTO agrega filas a una tabla. La lista de columnas y VALUES indican dónde y qué guardar.', 'INSERT INTO estudiantes (nombre)
VALUES (''Luz'');', 3, 'published'),
('php-variable-prefix', 'php-sintaxis', null, null, '¿Cuál es un nombre de variable válido en el ejemplo?', null, null, 1, 'published'),
('php-sum-value', 'php-sintaxis', null, null, '¿Cuánto vale $puntos?', null, null, 2, 'published'),
('php-concat-op', 'php-sintaxis', null, null, '¿Qué operador une los textos en echo?', null, null, 3, 'published'),
('php-if-output', 'php-sintaxis', null, null, '¿Qué salida produce este ejemplo?', null, null, 4, 'published'),
('php-post-key', 'php-formularios', null, null, '¿Con qué clave se recibe el campo de correo?', null, null, 1, 'published'),
('php-form-action', 'php-formularios', null, null, '¿Qué archivo recibe el formulario?', null, null, 2, 'published'),
('php-isset-check', 'php-formularios', null, null, '¿Qué comprueba isset($_POST["correo"])?', null, null, 3, 'published'),
('php-server-validation', 'php-formularios', null, null, '¿Dónde se deben validar los datos recibidos?', null, null, 4, 'published'),
('php-variable', null, 'php', 'Variables del servidor', '¿Qué muestra echo en este ejemplo?', 'PHP puede generar contenido en el servidor. Sus variables comienzan con $ y echo produce una salida.', '<?php
$nombre = "Luz";
echo $nombre;', 1, 'published'),
('php-form', null, 'php', 'Recibí un formulario', '¿Qué expresión consulta el campo nombre enviado por POST?', 'En un formulario enviado con el método POST, PHP permite consultar los campos recibidos en $_POST usando su nombre.', '<form method="post">
  <input name="nombre">
</form>', 2, 'published'),
('php-condition', null, 'php', 'Elegí una respuesta', '¿Qué texto se muestra?', 'if evalúa una condición y else ejecuta la alternativa cuando es falsa. En PHP, >= compara si un número es mayor o igual que otro.', '<?php
$puntos = 3;
if ($puntos >= 5) {
  echo "Meta";
} else {
  echo "Seguí practicando";
}', 3, 'published'),
('java-int-type', 'java-valores', null, null, '¿Qué tipo tiene puntos?', null, null, 1, 'published'),
('java-method-result', 'java-valores', null, null, '¿Qué devuelve doble(3)?', null, null, 2, 'published'),
('java-if-message', 'java-valores', null, null, '¿Qué línea muestra el programa?', null, null, 3, 'published'),
('java-parameter', 'java-valores', null, null, '¿Cuál es el parámetro del método doble?', null, null, 4, 'published'),
('java-class-object', 'java-objetos', null, null, '¿Cuál es la clase del ejemplo?', null, null, 1, 'published'),
('java-new-instance', 'java-objetos', null, null, '¿Qué hace new Alumno("Luz")?', null, null, 2, 'published'),
('java-this-field', 'java-objetos', null, null, '¿Qué identifica this.nombre?', null, null, 3, 'published'),
('java-instance-greeting', 'java-objetos', null, null, '¿Qué devuelve alumna.saludar()?', null, null, 4, 'published'),
('java-variable', null, 'java', 'Datos con tipo', '¿Qué número se imprime?', 'Java usa tipos para sus variables. int representa números enteros, y + suma valores numéricos.', 'int puntos = 2;
puntos = puntos + 1;
System.out.println(puntos);', 1, 'published'),
('java-loop', null, 'java', 'Repetí instrucciones', '¿Cuántas veces se ejecuta println?', 'Un bucle for tiene un inicio, una condición y una actualización. Repite su cuerpo mientras la condición sea verdadera.', 'for (int i = 0; i < 3; i++) {
  System.out.println(i);
}', 2, 'published'),
('java-class', null, 'java', 'Agrupá comportamientos', '¿Cuál es el nombre del método definido?', 'Una clase agrupa datos y métodos. Un método define un comportamiento y puede devolver un resultado mediante return.', 'class Saludo {
  String mensaje() {
    return "Hola";
  }
}', 3, 'published'),
('node-run-command', 'node-modulos', null, null, '¿Qué comando ejecuta el ejemplo?', null, null, 1, 'published'),
('node-export-function', 'node-modulos', null, null, '¿Qué palabra ofrece saludar a otros módulos?', null, null, 2, 'published'),
('node-module-path', 'node-modulos', null, null, '¿Qué indica ./saludo.mjs?', null, null, 3, 'published'),
('node-console-output', 'node-modulos', null, null, '¿Dónde aparece Hola, Luz al ejecutar app.mjs?', null, null, 4, 'published'),
('node-http-module', 'node-rutas', null, null, '¿Qué módulo se usa para crear el servidor?', null, null, 1, 'published'),
('node-root-route', 'node-rutas', null, null, '¿Qué devuelve una petición cuya req.url es exactamente /?', null, null, 2, 'published'),
('node-missing-route', 'node-rutas', null, null, '¿Qué estado recibe /cursos en este ejemplo?', null, null, 3, 'published'),
('node-end-response', 'node-rutas', null, null, '¿Qué hace res.end?', null, null, 4, 'published'),
('node-runtime', null, 'node', 'JavaScript fuera del navegador', '¿Qué permite hacer Node.js?', 'Node.js es un entorno que ejecuta JavaScript fuera del navegador. Puede usarse para herramientas y servidores.', '// archivo saludo.js
console.log("Hola desde Node.js");

// En la terminal: node saludo.js', 1, 'published'),
('node-module', null, 'node', 'Separá tu código', '¿Qué palabra importa la función desde otro módulo?', 'Los módulos permiten organizar código en archivos. En un proyecto con módulos ES, export comparte una función e import permite usarla.', '// saludo.js
export const saludar = () => "Hola";

// app.js
import { saludar } from "./saludo.js";', 2, 'published'),
('node-route', null, 'node', 'Una primera ruta', '¿Qué ruta devuelve el texto Hola?', 'El módulo integrado node:http puede crear un servidor. req.url contiene la ruta solicitada en estos ejemplos sin parámetros y res.end envía y termina la respuesta.', 'import { createServer } from "node:http";
createServer((req, res) => {
  if (req.url === "/hola") {
    res.end("Hola");
  } else {
    res.statusCode = 404;
    res.end("No encontrado");
  }
}).listen(3000);', 3, 'published')
on conflict do nothing;

insert into public.answer_options (id, question_id, label, position) values
('html-lesson-h1-op-1', 'html-lesson-h1', 'p', 1),
('html-lesson-h1-op-2', 'html-lesson-h1', 'h1', 2),
('html-lesson-h1-op-3', 'html-lesson-h1', 'img', 3),
('html-lesson-paragraph-op-1', 'html-lesson-paragraph', 'Dentro de p', 1),
('html-lesson-paragraph-op-2', 'html-lesson-paragraph', 'Dentro de img', 2),
('html-lesson-paragraph-op-3', 'html-lesson-paragraph', 'En el atributo href', 3),
('html-lesson-link-op-1', 'html-lesson-link', 'src', 1),
('html-lesson-link-op-2', 'html-lesson-link', 'alt', 2),
('html-lesson-link-op-3', 'html-lesson-link', 'href', 3),
('html-lesson-alt-op-1', 'html-lesson-alt', 'Para agrandarla', 1),
('html-lesson-alt-op-2', 'html-lesson-alt', 'Para ofrecer una alternativa textual', 2),
('html-lesson-alt-op-3', 'html-lesson-alt', 'Para convertirla en enlace', 3),
('html-form-label-op-1', 'html-form-label', 'email', 1),
('html-form-label-op-2', 'html-form-label', 'correo', 2),
('html-form-label-op-3', 'html-form-label', 'submit', 3),
('html-form-email-op-1', 'html-form-email', 'type="email"', 1),
('html-form-email-op-2', 'html-form-email', 'id="correo"', 2),
('html-form-email-op-3', 'html-form-email', 'name="email"', 3),
('html-form-required-op-1', 'html-form-required', 'name', 1),
('html-form-required-op-2', 'html-form-required', 'for', 2),
('html-form-required-op-3', 'html-form-required', 'required', 3),
('html-form-submit-op-1', 'html-form-submit', 'Borra el formulario', 1),
('html-form-submit-op-2', 'html-form-submit', 'Solicita enviar el formulario', 2),
('html-form-submit-op-3', 'html-form-submit', 'Crea otro input', 3),
('html-heading-op-1', 'html-heading', '<p>', 1),
('html-heading-op-2', 'html-heading', '<h1>', 2),
('html-heading-op-3', 'html-heading', '<img>', 3),
('html-link-op-1', 'html-link', 'href', 1),
('html-link-op-2', 'html-link', 'src', 2),
('html-link-op-3', 'html-link', 'alt', 3),
('html-form-op-1', 'html-form', 'image', 1),
('html-form-op-2', 'html-form', 'password', 2),
('html-form-op-3', 'html-form', 'email', 3),
('css-selector-op-1', 'css-selector', 'Etiquetas tarjeta', 1),
('css-selector-op-2', 'css-selector', 'Elementos con class="tarjeta"', 2),
('css-selector-op-3', 'css-selector', 'Solo el primer párrafo', 3),
('css-text-color-op-1', 'css-text-color', 'color', 1),
('css-text-color-op-2', 'css-text-color', 'background-color', 2),
('css-text-color-op-3', 'css-text-color', 'font-family', 3),
('css-font-family-op-1', 'css-font-family', 'font-size', 1),
('css-font-family-op-2', 'css-font-family', 'border-radius', 2),
('css-font-family-op-3', 'css-font-family', 'font-family', 3),
('css-round-corners-op-1', 'css-round-corners', 'color', 1),
('css-round-corners-op-2', 'css-round-corners', 'border-radius', 2),
('css-round-corners-op-3', 'css-round-corners', 'font-size', 3),
('css-padding-op-1', 'css-padding', 'margin', 1),
('css-padding-op-2', 'css-padding', 'gap', 2),
('css-padding-op-3', 'css-padding', 'padding', 3),
('css-border-box-op-1', 'css-border-box', 'Contenido, padding y borde', 1),
('css-border-box-op-2', 'css-border-box', 'Solo contenido', 2),
('css-border-box-op-3', 'css-border-box', 'También todos los márgenes', 3),
('css-gap-op-1', 'css-gap', 'font-family', 1),
('css-gap-op-2', 'css-gap', 'gap', 2),
('css-gap-op-3', 'css-gap', 'color', 3),
('css-media-op-1', 'css-media', 'Solo a 800px', 1),
('css-media-op-2', 'css-media', 'Solo por encima de 600px', 2),
('css-media-op-3', 'css-media', 'A 600px o menos', 3),
('css-color-op-1', 'css-color', 'El color del texto de los h1', 1),
('css-color-op-2', 'css-color', 'El fondo de toda la página', 2),
('css-color-op-3', 'css-color', 'El tamaño de las imágenes', 3),
('css-box-op-1', 'css-box', 'margin', 1),
('css-box-op-2', 'css-box', 'padding', 2),
('css-box-op-3', 'css-box', 'color', 3),
('css-responsive-op-1', 'css-responsive', 'Solo a partir de 1200px', 1),
('css-responsive-op-2', 'css-responsive', 'Solo al imprimir', 2),
('css-responsive-op-3', 'css-responsive', 'Cuando la ventana mide hasta 600px de ancho', 3),
('js-let-op-1', 'js-let', '1', 1),
('js-let-op-2', 'js-let', '3', 2),
('js-let-op-3', 'js-let', 'Ana', 3),
('js-const-op-1', 'js-const', 'const', 1),
('js-const-op-2', 'js-const', 'let', 2),
('js-const-op-3', 'js-const', 'console.log', 3),
('js-log-name-op-1', 'js-log-name', 'console.log(nombre);', 1),
('js-log-name-op-2', 'js-log-name', 'let nombre;', 2),
('js-log-name-op-3', 'js-log-name', 'console.log(puntos);', 3),
('js-reassign-op-1', 'js-reassign', 'const', 1),
('js-reassign-op-2', 'js-reassign', 'let', 2),
('js-reassign-op-3', 'js-reassign', 'console.log', 3),
('js-type-number-op-1', 'js-type-number', '"string"', 1),
('js-type-number-op-2', 'js-type-number', '"boolean"', 2),
('js-type-number-op-3', 'js-type-number', '"number"', 3),
('js-type-boolean-op-1', 'js-type-boolean', '"true"', 1),
('js-type-boolean-op-2', 'js-type-boolean', 'true', 2),
('js-type-boolean-op-3', 'js-type-boolean', '18', 3),
('js-type-string-op-1', 'js-type-string', '"number"', 1),
('js-type-string-op-2', 'js-type-string', '"string"', 2),
('js-type-string-op-3', 'js-type-string', '"boolean"', 3),
('js-type-name-op-1', 'js-type-name', '"string"', 1),
('js-type-name-op-2', 'js-type-name', '"number"', 2),
('js-type-name-op-3', 'js-type-name', '"boolean"', 3),
('js-priority-op-1', 'js-priority', '20', 1),
('js-priority-op-2', 'js-priority', '14', 2),
('js-priority-op-3', 'js-priority', '24', 3),
('js-parentheses-op-1', 'js-parentheses', '14', 1),
('js-parentheses-op-2', 'js-parentheses', '9', 2),
('js-parentheses-op-3', 'js-parentheses', '20', 3),
('js-subtract-op-1', 'js-subtract', '11', 1),
('js-subtract-op-2', 'js-subtract', '24', 2),
('js-subtract-op-3', 'js-subtract', '5', 3),
('js-divide-op-1', 'js-divide', '3', 1),
('js-divide-op-2', 'js-divide', '8', 2),
('js-divide-op-3', 'js-divide', '48', 3),
('js-and-op-1', 'js-and', 'true', 1),
('js-and-op-2', 'js-and', 'false', 2),
('js-and-op-3', 'js-and', '18', 3),
('js-strict-op-1', 'js-strict', 'true', 1),
('js-strict-op-2', 'js-strict', 'false', 2),
('js-strict-op-3', 'js-strict', '10', 3),
('js-or-op-1', 'js-or', 'false', 1),
('js-or-op-2', 'js-or', 'true', 2),
('js-or-op-3', 'js-or', '0', 3),
('js-not-op-1', 'js-not', 'true', 1),
('js-not-op-2', 'js-not', '1', 2),
('js-not-op-3', 'js-not', 'false', 3),
('js-else-op-1', 'js-else', 'Meta alcanzada', 1),
('js-else-op-2', 'js-else', 'Los dos mensajes', 2),
('js-else-op-3', 'js-else', 'Seguí practicando', 3),
('js-boundary-op-1', 'js-boundary', 'Meta alcanzada', 1),
('js-boundary-op-2', 'js-boundary', 'Seguí practicando', 2),
('js-boundary-op-3', 'js-boundary', 'Ninguno', 3),
('js-if-high-op-1', 'js-if-high', 'if', 1),
('js-if-high-op-2', 'js-if-high', 'else', 2),
('js-if-high-op-3', 'js-if-high', 'Ambos', 3),
('js-if-value-op-1', 'js-if-value', 'Pasa a 5', 1),
('js-if-value-op-2', 'js-if-value', 'No, comparar no lo modifica', 2),
('js-if-value-op-3', 'js-if-value', 'Pasa a true', 3),
('js-else-if-op-1', 'js-else-if', 'Excelente', 1),
('js-else-if-op-2', 'js-else-if', 'Aprobado', 2),
('js-else-if-op-3', 'js-else-if', 'A repasar', 3),
('js-first-branch-op-1', 'js-first-branch', 'Tres', 1),
('js-first-branch-op-2', 'js-first-branch', 'Dos', 2),
('js-first-branch-op-3', 'js-first-branch', 'Uno', 3),
('js-low-grade-op-1', 'js-low-grade', 'Excelente', 1),
('js-low-grade-op-2', 'js-low-grade', 'Aprobado', 2),
('js-low-grade-op-3', 'js-low-grade', 'A repasar', 3),
('js-grade-six-op-1', 'js-grade-six', 'Excelente', 1),
('js-grade-six-op-2', 'js-grade-six', 'Aprobado', 2),
('js-grade-six-op-3', 'js-grade-six', 'A repasar', 3),
('js-for-count-op-1', 'js-for-count', 'Tres', 1),
('js-for-count-op-2', 'js-for-count', 'Cuatro', 2),
('js-for-count-op-3', 'js-for-count', 'Cero', 3),
('js-for-last-op-1', 'js-for-last', '3', 1),
('js-for-last-op-2', 'js-for-last', '2', 2),
('js-for-last-op-3', 'js-for-last', '0', 3),
('js-for-first-op-1', 'js-for-first', '0', 1),
('js-for-first-op-2', 'js-for-first', '1', 2),
('js-for-first-op-3', 'js-for-first', '3', 3),
('js-for-increment-op-1', 'js-for-increment', 'Disminuye i', 1),
('js-for-increment-op-2', 'js-for-increment', 'Vuelve a cero', 2),
('js-for-increment-op-3', 'js-for-increment', 'Aumenta i en uno', 3),
('js-while-end-op-1', 'js-while-end', '0', 1),
('js-while-end-op-2', 'js-while-end', '1', 2),
('js-while-end-op-3', 'js-while-end', '2', 3),
('js-while-infinite-op-1', 'js-while-infinite', 'El bucle no terminaría por sí solo', 1),
('js-while-infinite-op-2', 'js-while-infinite', 'Se repetiría una sola vez', 2),
('js-while-infinite-op-3', 'js-while-infinite', 'intentos pasaría a 2', 3),
('js-while-zero-op-1', 'js-while-zero', 'Dos', 1),
('js-while-zero-op-2', 'js-while-zero', 'Cero', 2),
('js-while-zero-op-3', 'js-while-zero', 'Una', 3),
('js-while-one-op-1', 'js-while-one', 'Una', 1),
('js-while-one-op-2', 'js-while-one', 'Dos', 2),
('js-while-one-op-3', 'js-while-one', 'Tres', 3),
('js-parameter-name-op-1', 'js-parameter-name', 'resultado', 1),
('js-parameter-name-op-2', 'js-parameter-name', 'numero', 2),
('js-parameter-name-op-3', 'js-parameter-name', '4', 3),
('js-call-result-op-1', 'js-call-result', '2', 1),
('js-call-result-op-2', 'js-call-result', '4', 2),
('js-call-result-op-3', 'js-call-result', '8', 3),
('js-argument-op-1', 'js-argument', 'numero', 1),
('js-argument-op-2', 'js-argument', 'doble', 2),
('js-argument-op-3', 'js-argument', '4', 3),
('js-double-six-op-1', 'js-double-six', '6', 1),
('js-double-six-op-2', 'js-double-six', '12', 2),
('js-double-six-op-3', 'js-double-six', '8', 3),
('js-return-op-1', 'js-return', '6', 1),
('js-return-op-2', 'js-return', '5', 2),
('js-return-op-3', 'js-return', '1', 3),
('js-return-purpose-op-1', 'js-return-purpose', 'Para repetir una instrucción', 1),
('js-return-purpose-op-2', 'js-return-purpose', 'Para devolver el resultado de la suma', 2),
('js-return-purpose-op-3', 'js-return-purpose', 'Para declarar una variable global', 3),
('js-return-call-op-1', 'js-return-call', '6', 1),
('js-return-call-op-2', 'js-return-call', '42', 2),
('js-return-call-op-3', 'js-return-call', '2', 3),
('js-return-end-op-1', 'js-return-end', 'Repite la función', 1),
('js-return-end-op-2', 'js-return-end', 'Termina esa llamada y devuelve un valor', 2),
('js-return-end-op-3', 'js-return-end', 'Solo muestra un mensaje', 3),
('javascript-variable-op-1', 'javascript-variable', '2', 1),
('javascript-variable-op-2', 'javascript-variable', '5', 2),
('javascript-variable-op-3', 'javascript-variable', '23', 3),
('javascript-condition-op-1', 'javascript-condition', 'Muestra "Puede ingresar"', 1),
('javascript-condition-op-2', 'javascript-condition', 'No muestra nada', 2),
('javascript-condition-op-3', 'javascript-condition', 'La edad cambia a 19', 3),
('javascript-function-op-1', 'javascript-function', '2', 1),
('javascript-function-op-2', 'javascript-function', '4', 2),
('javascript-function-op-3', 'javascript-function', '8', 3),
('vue-interpolation-op-1', 'vue-interpolation', 'Hola, nombre', 1),
('vue-interpolation-op-2', 'vue-interpolation', 'Hola, Luz', 2),
('vue-interpolation-op-3', 'vue-interpolation', 'Hola, true', 3),
('vue-if-false-op-1', 'vue-if-false', 'No se incluiría', 1),
('vue-if-false-op-2', 'vue-if-false', 'Se duplicaría', 2),
('vue-if-false-op-3', 'vue-if-false', 'Mostraría false', 3),
('vue-for-list-op-1', 'vue-for-list', 'Uno', 1),
('vue-for-list-op-2', 'vue-for-list', 'Tres', 2),
('vue-for-list-op-3', 'vue-for-list', 'Dos', 3),
('vue-key-identity-op-1', 'vue-key-identity', 'Para cambiar el color', 1),
('vue-key-identity-op-2', 'vue-key-identity', 'Para identificar de forma estable cada elemento', 2),
('vue-key-identity-op-3', 'vue-key-identity', 'Para ocultar los textos', 3),
('vue-ref-start-op-1', 'vue-ref-start', '1', 1),
('vue-ref-start-op-2', 'vue-ref-start', 'null', 2),
('vue-ref-start-op-3', 'vue-ref-start', '0', 3),
('vue-event-click-op-1', 'vue-event-click', 'sumar', 1),
('vue-event-click-op-2', 'vue-event-click', 'ref', 2),
('vue-event-click-op-3', 'vue-event-click', 'nombre', 3),
('vue-value-script-op-1', 'vue-value-script', 'puntos = 1', 1),
('vue-value-script-op-2', 'vue-value-script', 'puntos.value++', 2),
('vue-value-script-op-3', 'vue-value-script', 'puntos.text++', 3),
('vue-model-input-op-1', 'vue-model-input', 'puntos', 1),
('vue-model-input-op-2', 'vue-model-input', 'sumar', 2),
('vue-model-input-op-3', 'vue-model-input', 'nombre', 3),
('vue-directive-op-1', 'vue-directive', 'v-for', 1),
('vue-directive-op-2', 'vue-directive', 'v-if', 2),
('vue-directive-op-3', 'vue-directive', 'v-model', 3),
('vue-event-op-1', 'vue-event', 'Cuando se hace clic en el botón', 1),
('vue-event-op-2', 'vue-event', 'Cada segundo', 2),
('vue-event-op-3', 'vue-event', 'Solo al cerrar la página', 3),
('vue-reactivity-op-1', 'vue-reactivity', '0', 1),
('vue-reactivity-op-2', 'vue-reactivity', 'undefined', 2),
('vue-reactivity-op-3', 'vue-reactivity', '1', 3),
('react-component-name-op-1', 'react-component-name', 'h1', 1),
('react-component-name-op-2', 'react-component-name', 'Saludo', 2),
('react-component-name-op-3', 'react-component-name', 'className', 3),
('react-prop-output-op-1', 'react-prop-output', 'Hola, Luz', 1),
('react-prop-output-op-2', 'react-prop-output', 'Hola, nombre', 2),
('react-prop-output-op-3', 'react-prop-output', 'Hola, App', 3),
('react-css-class-op-1', 'react-css-class', 'class', 1),
('react-css-class-op-2', 'react-css-class', 'css', 2),
('react-css-class-op-3', 'react-css-class', 'className', 3),
('react-readonly-props-op-1', 'react-readonly-props', 'Debe borrarla', 1),
('react-readonly-props-op-2', 'react-readonly-props', 'Como información de solo lectura', 2),
('react-readonly-props-op-3', 'react-readonly-props', 'Como una ruta del servidor', 3),
('react-state-start-op-1', 'react-state-start', 'Puntos: 1', 1),
('react-state-start-op-2', 'react-state-start', 'Puntos: null', 2),
('react-state-start-op-3', 'react-state-start', 'Puntos: 0', 3),
('react-setter-op-1', 'react-setter', 'setPuntos', 1),
('react-setter-op-2', 'react-setter', 'puntos', 2),
('react-setter-op-3', 'react-setter', 'Contador', 3),
('react-click-two-op-1', 'react-click-two', '1', 1),
('react-click-two-op-2', 'react-click-two', '2', 2),
('react-click-two-op-3', 'react-click-two', '0', 3),
('react-handler-op-1', 'react-handler', 'Para repetir el render sin parar', 1),
('react-handler-op-2', 'react-handler', 'Para cambiar las props', 2),
('react-handler-op-3', 'react-handler', 'Para ejecutarla cuando ocurra el clic', 3),
('react-jsx-op-1', 'react-jsx', 'Una consulta a una base de datos', 1),
('react-jsx-op-2', 'react-jsx', 'Un encabezado con el texto Hola', 2),
('react-jsx-op-3', 'react-jsx', 'Una ruta de servidor', 3),
('react-props-op-1', 'react-props', 'Hola, Ana', 1),
('react-props-op-2', 'react-props', 'Hola, nombre', 2),
('react-props-op-3', 'react-props', 'Hola, undefined', 3),
('react-state-op-1', 'react-state', 'useEffect', 1),
('react-state-op-2', 'react-state', 'puntos', 2),
('react-state-op-3', 'react-state', 'setPuntos', 3),
('sql-from-table-op-1', 'sql-from-table', 'puntos', 1),
('sql-from-table-op-2', 'sql-from-table', 'alumnos', 2),
('sql-from-table-op-3', 'sql-from-table', 'nombre', 3),
('sql-where-filter-op-1', 'sql-where-filter', 'Ana y Leo', 1),
('sql-where-filter-op-2', 'sql-where-filter', 'Solo Luz', 2),
('sql-where-filter-op-3', 'sql-where-filter', 'Las tres', 3),
('sql-desc-order-op-1', 'sql-desc-order', 'Luz', 1),
('sql-desc-order-op-2', 'sql-desc-order', 'Leo', 2),
('sql-desc-order-op-3', 'sql-desc-order', 'Ana', 3),
('sql-select-safe-op-1', 'sql-select-safe', 'Los elimina', 1),
('sql-select-safe-op-2', 'sql-select-safe', 'Los lee sin modificarlos', 2),
('sql-select-safe-op-3', 'sql-select-safe', 'Cambia todos los puntos a 6', 3),
('sql-primary-key-op-1', 'sql-primary-key', 'titulo', 1),
('sql-primary-key-op-2', 'sql-primary-key', 'tareas', 2),
('sql-primary-key-op-3', 'sql-primary-key', 'id', 3),
('sql-insert-row-op-1', 'sql-insert-row', 'INSERT', 1),
('sql-insert-row-op-2', 'sql-insert-row', 'SELECT', 2),
('sql-insert-row-op-3', 'sql-insert-row', 'ORDER BY', 3),
('sql-update-title-op-1', 'sql-update-title', 'Leer HTML', 1),
('sql-update-title-op-2', 'sql-update-title', 'Leer CSS', 2),
('sql-update-title-op-3', 'sql-update-title', 'titulo', 3),
('sql-delete-where-op-1', 'sql-delete-where', 'Solo lee las tareas', 1),
('sql-delete-where-op-2', 'sql-delete-where', 'Borra la tabla y su definición', 2),
('sql-delete-where-op-3', 'sql-delete-where', 'Elimina todas las filas de la tabla', 3),
('sql-select-op-1', 'sql-select', 'Todos los datos de todas las tablas', 1),
('sql-select-op-2', 'sql-select', 'La columna nombre de estudiantes', 2),
('sql-select-op-3', 'sql-select', 'Eliminar estudiantes', 3),
('sql-filter-op-1', 'sql-filter', 'Quienes tienen más de 18 años', 1),
('sql-filter-op-2', 'sql-filter', 'Quienes tienen exactamente 18 años', 2),
('sql-filter-op-3', 'sql-filter', 'Todos sin filtrar', 3),
('sql-insert-op-1', 'sql-insert', 'Borra la tabla', 1),
('sql-insert-op-2', 'sql-insert', 'Cambia todos los nombres a Luz', 2),
('sql-insert-op-3', 'sql-insert', 'Agrega una fila con el nombre Luz', 3),
('php-variable-prefix-op-1', 'php-variable-prefix', 'nombre$', 1),
('php-variable-prefix-op-2', 'php-variable-prefix', '$nombre', 2),
('php-variable-prefix-op-3', 'php-variable-prefix', '#nombre', 3),
('php-sum-value-op-1', 'php-sum-value', '5', 1),
('php-sum-value-op-2', 'php-sum-value', '23', 2),
('php-sum-value-op-3', 'php-sum-value', '2', 3),
('php-concat-op-op-1', 'php-concat-op', '+', 1),
('php-concat-op-op-2', 'php-concat-op', '>=', 2),
('php-concat-op-op-3', 'php-concat-op', '.', 3),
('php-if-output-op-1', 'php-if-output', 'A practicar', 1),
('php-if-output-op-2', 'php-if-output', 'Hola, Luz', 2),
('php-if-output-op-3', 'php-if-output', 'Los dos mensajes', 3),
('php-post-key-op-1', 'php-post-key', 'email', 1),
('php-post-key-op-2', 'php-post-key', 'recibir.php', 2),
('php-post-key-op-3', 'php-post-key', 'correo', 3),
('php-form-action-op-1', 'php-form-action', 'recibir.php', 1),
('php-form-action-op-2', 'php-form-action', 'formulario.html', 2),
('php-form-action-op-3', 'php-form-action', 'correo', 3),
('php-isset-check-op-1', 'php-isset-check', 'Que sea un correo válido', 1),
('php-isset-check-op-2', 'php-isset-check', 'Que exista la entrada y no sea NULL', 2),
('php-isset-check-op-3', 'php-isset-check', 'Que el usuario tenga una cuenta', 3),
('php-server-validation-op-1', 'php-server-validation', 'Solo en el CSS', 1),
('php-server-validation-op-2', 'php-server-validation', 'Solo en el navegador', 2),
('php-server-validation-op-3', 'php-server-validation', 'También en el servidor', 3),
('php-variable-op-1', 'php-variable', 'nombre', 1),
('php-variable-op-2', 'php-variable', 'Luz', 2),
('php-variable-op-3', 'php-variable', '$nombre', 3),
('php-form-op-1', 'php-form', '$_POST["nombre"]', 1),
('php-form-op-2', 'php-form', '$_GET["nombre"]', 2),
('php-form-op-3', 'php-form', '$form.nombre', 3),
('php-condition-op-1', 'php-condition', 'Meta', 1),
('php-condition-op-2', 'php-condition', 'Ambos textos', 2),
('php-condition-op-3', 'php-condition', 'Seguí practicando', 3),
('java-int-type-op-1', 'java-int-type', 'String', 1),
('java-int-type-op-2', 'java-int-type', 'int', 2),
('java-int-type-op-3', 'java-int-type', 'boolean', 3),
('java-method-result-op-1', 'java-method-result', '6', 1),
('java-method-result-op-2', 'java-method-result', '3', 2),
('java-method-result-op-3', 'java-method-result', '2', 3),
('java-if-message-op-1', 'java-if-message', 'Seguir', 1),
('java-if-message-op-2', 'java-if-message', 'Las dos', 2),
('java-if-message-op-3', 'java-if-message', 'Meta', 3),
('java-parameter-op-1', 'java-parameter', 'puntos', 1),
('java-parameter-op-2', 'java-parameter', 'numero', 2),
('java-parameter-op-3', 'java-parameter', 'Inicio', 3),
('java-class-object-op-1', 'java-class-object', 'alumna', 1),
('java-class-object-op-2', 'java-class-object', 'nombre', 2),
('java-class-object-op-3', 'java-class-object', 'Alumno', 3),
('java-new-instance-op-1', 'java-new-instance', 'Crea un objeto e invoca su constructor', 1),
('java-new-instance-op-2', 'java-new-instance', 'Cambia todas las clases', 2),
('java-new-instance-op-3', 'java-new-instance', 'Solo imprime Luz', 3),
('java-this-field-op-1', 'java-this-field', 'Una variable global', 1),
('java-this-field-op-2', 'java-this-field', 'El campo nombre del objeto actual', 2),
('java-this-field-op-3', 'java-this-field', 'El nombre de la clase', 3),
('java-instance-greeting-op-1', 'java-instance-greeting', 'Hola, Alumno', 1),
('java-instance-greeting-op-2', 'java-instance-greeting', 'nombre', 2),
('java-instance-greeting-op-3', 'java-instance-greeting', 'Hola, Luz', 3),
('java-variable-op-1', 'java-variable', '2', 1),
('java-variable-op-2', 'java-variable', '3', 2),
('java-variable-op-3', 'java-variable', '21', 3),
('java-loop-op-1', 'java-loop', '3', 1),
('java-loop-op-2', 'java-loop', '4', 2),
('java-loop-op-3', 'java-loop', '0', 3),
('java-class-op-1', 'java-class', 'Saludo', 1),
('java-class-op-2', 'java-class', 'String', 2),
('java-class-op-3', 'java-class', 'mensaje', 3),
('node-run-command-op-1', 'node-run-command', 'npm saludo', 1),
('node-run-command-op-2', 'node-run-command', 'node app.mjs', 2),
('node-run-command-op-3', 'node-run-command', 'open app.mjs', 3),
('node-export-function-op-1', 'node-export-function', 'export', 1),
('node-export-function-op-2', 'node-export-function', 'return', 2),
('node-export-function-op-3', 'node-export-function', 'console', 3),
('node-module-path-op-1', 'node-module-path', 'Una dirección de internet', 1),
('node-module-path-op-2', 'node-module-path', 'Un elemento HTML', 2),
('node-module-path-op-3', 'node-module-path', 'Un archivo relativo al módulo actual', 3),
('node-console-output-op-1', 'node-console-output', 'En el CSS', 1),
('node-console-output-op-2', 'node-console-output', 'En la terminal', 2),
('node-console-output-op-3', 'node-console-output', 'En un formulario', 3),
('node-http-module-op-1', 'node-http-module', 'node:css', 1),
('node-http-module-op-2', 'node-http-module', 'vue', 2),
('node-http-module-op-3', 'node-http-module', 'node:http', 3),
('node-root-route-op-1', 'node-root-route', 'Hola', 1),
('node-root-route-op-2', 'node-root-route', 'No encontrado', 2),
('node-root-route-op-3', 'node-root-route', '3000', 3),
('node-missing-route-op-1', 'node-missing-route', '200', 1),
('node-missing-route-op-2', 'node-missing-route', '404', 2),
('node-missing-route-op-3', 'node-missing-route', '3000', 3),
('node-end-response-op-1', 'node-end-response', 'Abre el navegador', 1),
('node-end-response-op-2', 'node-end-response', 'Declara el puerto', 2),
('node-end-response-op-3', 'node-end-response', 'Envía contenido y finaliza la respuesta', 3),
('node-runtime-op-1', 'node-runtime', 'Reemplazar HTML por CSS', 1),
('node-runtime-op-2', 'node-runtime', 'Ejecutar JavaScript fuera del navegador', 2),
('node-runtime-op-3', 'node-runtime', 'Usar solamente Java', 3),
('node-module-op-1', 'node-module', 'import', 1),
('node-module-op-2', 'node-module', 'return', 2),
('node-module-op-3', 'node-module', 'class', 3),
('node-route-op-1', 'node-route', '/', 1),
('node-route-op-2', 'node-route', '/cursos', 2),
('node-route-op-3', 'node-route', '/hola', 3)
on conflict do nothing;

insert into private.solutions (question_id, correct_option_id, explanation) values
('html-lesson-h1', 'html-lesson-h1-op-2', 'h1 marca el encabezado principal. p sirve para párrafos e img para imágenes.'),
('html-lesson-paragraph', 'html-lesson-paragraph-op-1', 'p agrupa un párrafo de texto dentro del documento.'),
('html-lesson-link', 'html-lesson-link-op-3', 'El atributo href del enlace a contiene la dirección /cursos.'),
('html-lesson-alt', 'html-lesson-alt-op-2', 'alt describe el contenido de la imagen cuando no se ve o se usa un lector de pantalla.'),
('html-form-label', 'html-form-label-op-2', 'for debe coincidir con id, que aquí vale correo.'),
('html-form-email', 'html-form-email-op-1', 'type indica al navegador el tipo del control. id y name tienen otras funciones.'),
('html-form-required', 'html-form-required-op-3', 'required activa la comprobación de campo obligatorio en el navegador.'),
('html-form-submit', 'html-form-submit-op-2', 'submit solicita el envío del formulario, sujeto a la validación del navegador.'),
('html-heading', 'html-heading-op-2', 'h1 es el encabezado de mayor nivel. p contiene un párrafo e img incorpora una imagen.'),
('html-link', 'html-link-op-1', 'href define el destino del enlace. src indica la fuente de recursos como imágenes; alt describe una imagen.'),
('html-form', 'html-form-op-3', 'type="email" identifica un campo de correo. Ayuda al navegador a ofrecer el teclado y la validación adecuados.'),
('css-selector', 'css-selector-op-2', 'El punto identifica un selector de clase.'),
('css-text-color', 'css-text-color-op-1', 'color controla el color del texto; background-color controla el fondo.'),
('css-font-family', 'css-font-family-op-3', 'font-family declara Roboto y sans-serif como alternativa.'),
('css-round-corners', 'css-round-corners-op-2', 'border-radius define el radio de las esquinas de la caja.'),
('css-padding', 'css-padding-op-3', 'padding agrega separación interna; margin agrega separación externa.'),
('css-border-box', 'css-border-box-op-1', 'border-box incluye contenido, padding y borde; margin queda fuera.'),
('css-gap', 'css-gap-op-2', 'gap crea espacios entre los elementos distribuidos por flex.'),
('css-media', 'css-media-op-3', 'max-width incluye el límite: con 600px o menos se habilita flex-wrap: wrap.'),
('css-color', 'css-color-op-1', 'El selector h1 elige los encabezados de ese tipo. La propiedad color les aplica el violeta al texto.'),
('css-box', 'css-box-op-2', 'padding es el espacio interior. margin es el espacio exterior, por fuera del borde.'),
('css-responsive', 'css-responsive-op-3', 'La condición max-width incluye todos los anchos menores o iguales a 600px, útil para adaptar la distribución a pantallas pequeñas.'),
('js-let', 'js-let-op-2', 'puntos empezó en 1, pero la segunda instrucción lo reasignó a 3.'),
('js-const', 'js-const-op-1', 'const declara una variable que no se puede reasignar. Esto no hace inmutables los objetos, tema de una etapa posterior.'),
('js-log-name', 'js-log-name-op-1', 'console.log(nombre) muestra el valor de esa variable: Ana. Declarar una variable no muestra su contenido.'),
('js-reassign', 'js-reassign-op-2', 'let permite reasignar el valor: por eso puntos puede pasar de 1 a 3.'),
('js-type-number', 'js-type-number-op-3', '18 no tiene comillas y es un número. typeof edad devuelve la cadena "number".'),
('js-type-boolean', 'js-type-boolean-op-2', 'true sin comillas es un booleano. "true" entre comillas es texto.'),
('js-type-string', 'js-type-string-op-2', 'Las comillas convierten "18" en una cadena de texto. Por eso typeof devuelve "string", aunque sus caracteres sean dígitos.'),
('js-type-name', 'js-type-name-op-1', 'nombre guarda "Luz", una cadena entre comillas. Su tipo es string.'),
('js-priority', 'js-priority-op-2', 'Primero se calcula 3 × 4 = 12. Después se suma 2: el resultado es 14.'),
('js-parentheses', 'js-parentheses-op-3', 'El paréntesis hace que 2 + 3 se resuelva primero. Luego 5 × 4 = 20.'),
('js-subtract', 'js-subtract-op-3', 'El operador - resta: ocho menos tres da cinco.'),
('js-divide', 'js-divide-op-1', 'El operador / divide. Doce dividido por cuatro es tres.'),
('js-and', 'js-and-op-1', 'edad >= 18 es verdadero y tieneEntrada también: ambas condiciones se cumplen.'),
('js-strict', 'js-strict-op-2', 'El número 5 y el texto "5" tienen tipos diferentes. La igualdad estricta devuelve false.'),
('js-or', 'js-or-op-2', '|| necesita al menos una condición verdadera. La segunda es true.'),
('js-not', 'js-not-op-3', '! invierte un booleano: la negación de true es false.'),
('js-else', 'js-else-op-3', '3 >= 5 es falso, por lo que se ejecuta el bloque else.'),
('js-boundary', 'js-boundary-op-1', 'El operador >= incluye la igualdad. Con 5 puntos se cumple la condición.'),
('js-if-high', 'js-if-high-op-1', '8 >= 5 es verdadero, por lo tanto se ejecuta el bloque if.'),
('js-if-value', 'js-if-value-op-2', 'La comparación produce un booleano sin reasignar la variable puntos.'),
('js-else-if', 'js-else-if-op-2', '7 no llega a 9, pero sí cumple nota >= 6. Se muestra Aprobado.'),
('js-first-branch', 'js-first-branch-op-3', 'La primera condición es verdadera. Sus alternativas else if y else no se ejecutan.'),
('js-low-grade', 'js-low-grade-op-3', '4 no cumple >= 9 ni >= 6. Se ejecuta el else final.'),
('js-grade-six', 'js-grade-six-op-2', 'La primera condición es falsa; la segunda incluye la igualdad, así que muestra Aprobado.'),
('js-for-count', 'js-for-count-op-1', 'El cuerpo se ejecuta con i igual a 0, 1 y 2: tres vueltas.'),
('js-for-last', 'js-for-last-op-2', 'Se muestra 2; luego i sube a 3 y la condición i < 3 deja de cumplirse.'),
('js-for-first', 'js-for-first-op-1', 'El inicio let i = 0 hace que la primera vuelta muestre cero.'),
('js-for-increment', 'js-for-increment-op-3', 'El incremento aumenta i en uno antes de comprobar la condición de la próxima vuelta.'),
('js-while-end', 'js-while-end-op-3', 'Se incrementa de 0 a 1 y luego a 2. Entonces intentos < 2 es falso.'),
('js-while-infinite', 'js-while-infinite-op-1', 'intentos seguiría valiendo 0 y la condición seguiría siendo verdadera. Por eso es importante la actualización.'),
('js-while-zero', 'js-while-zero-op-2', 'while evalúa antes de entrar: 2 < 2 es falso, por lo que no ejecuta el cuerpo.'),
('js-while-one', 'js-while-one-op-1', 'Con 1 la condición es verdadera; el incremento lo lleva a 2 y la siguiente comprobación es falsa.'),
('js-parameter-name', 'js-parameter-name-op-2', 'numero es el nombre del parámetro. En doble(4), el argumento 4 se recibe en numero.'),
('js-call-result', 'js-call-result-op-3', 'La llamada doble(4) calcula 4 × 2 y devuelve 8.'),
('js-argument', 'js-argument-op-3', '4 es el valor pasado en la llamada. numero es el parámetro que lo recibe.'),
('js-double-six', 'js-double-six-op-2', 'La función multiplica el argumento por dos: 6 × 2 = 12.'),
('js-return', 'js-return-op-1', 'sumar(2, 3) devuelve 5. Después se suma 1 y se guarda 6.'),
('js-return-purpose', 'js-return-purpose-op-2', 'return entrega a + b al lugar donde se llamó a sumar. Así se puede usar el resultado en otra expresión.'),
('js-return-call', 'js-return-call-op-1', 'Los argumentos son números. return a + b devuelve 4 + 2 = 6.'),
('js-return-end', 'js-return-end-op-2', 'return entrega el valor y termina esa llamada; console.log solo muestra un mensaje.'),
('javascript-variable', 'javascript-variable-op-2', 'Ambos valores son números. Se suman 2 y 3, y se guarda 5 en puntos.'),
('javascript-condition', 'javascript-condition-op-1', '18 es mayor o igual a 18, así que la condición es verdadera y se ejecuta console.log.'),
('javascript-function', 'javascript-function-op-3', 'El parámetro numero recibe 4. La función calcula 4 × 2 y devuelve 8.'),
('vue-interpolation', 'vue-interpolation-op-2', 'La interpolación evalúa nombre y muestra Luz.'),
('vue-if-false', 'vue-if-false-op-1', 'v-if controla si ese bloque está presente según una condición.'),
('vue-for-list', 'vue-for-list-op-3', 'temas contiene dos entradas: HTML y CSS.'),
('vue-key-identity', 'vue-key-identity-op-2', 'Una clave estable ayuda a Vue a reconocer los elementos entre actualizaciones.'),
('vue-ref-start', 'vue-ref-start-op-3', 'ref(0) inicializa el valor reactivo con cero.'),
('vue-event-click', 'vue-event-click-op-1', '@click="sumar" conecta el evento con la función sumar.'),
('vue-value-script', 'vue-value-script-op-2', 'El valor de un ref se modifica mediante .value en el script.'),
('vue-model-input', 'vue-model-input-op-3', 'v-model="nombre" vincula el texto ingresado con el ref nombre.'),
('vue-directive', 'vue-directive-op-2', 'v-if controla si el bloque existe según una condición. v-for repite elementos y v-model sincroniza un campo con un valor.'),
('vue-event', 'vue-event-op-1', '@click escucha el evento de clic y llama a saludar. No crea un temporizador ni espera al cierre.'),
('vue-reactivity', 'vue-reactivity-op-3', 'ref empieza en 0 y ++ lo aumenta en uno. Su nuevo valor es 1.'),
('react-component-name', 'react-component-name-op-2', 'Saludo es una función usada como componente y su nombre comienza con mayúscula.'),
('react-prop-output', 'react-prop-output-op-1', 'App pasa nombre="Luz" y el componente interpola esa propiedad.'),
('react-css-class', 'react-css-class-op-3', 'En JSX, className expresa la clase CSS del elemento.'),
('react-readonly-props', 'react-readonly-props-op-2', 'El hijo recibe props del padre y no debe modificarlas directamente.'),
('react-state-start', 'react-state-start-op-3', 'useState(0) establece cero como estado inicial.'),
('react-setter', 'react-setter-op-1', 'El segundo valor devuelto por useState es la función de actualización.'),
('react-click-two', 'react-click-two-op-2', 'Cada actualización suma uno al estado anterior: de 0 a 1 y luego a 2.'),
('react-handler', 'react-handler-op-3', 'La función es el manejador del evento; se invoca cuando el usuario pulsa el botón.'),
('react-jsx', 'react-jsx-op-2', 'El componente devuelve un elemento h1 con el texto Hola para que React lo represente en la interfaz.'),
('react-props', 'react-props-op-1', 'La prop nombre recibe "Ana". La expresión {nombre} coloca ese valor dentro del párrafo.'),
('react-state', 'react-state-op-3', 'setPuntos es la función que devuelve useState para actualizar este estado y solicitar un nuevo renderizado.'),
('sql-from-table', 'sql-from-table-op-2', 'FROM alumnos indica la tabla de origen.'),
('sql-where-filter', 'sql-where-filter-op-1', 'Ana tiene 8 y Leo 6; ambos cumplen puntos >= 6. Luz tiene 3.'),
('sql-desc-order', 'sql-desc-order-op-3', 'DESC ordena de mayor a menor: Ana, con 8, precede a Leo, con 6.'),
('sql-select-safe', 'sql-select-safe-op-2', 'SELECT devuelve información; no realiza INSERT, UPDATE ni DELETE.'),
('sql-primary-key', 'sql-primary-key-op-3', 'id está declarada PRIMARY KEY: debe ser única y no nula.'),
('sql-insert-row', 'sql-insert-row-op-1', 'INSERT INTO agrega un registro a la tabla indicada.'),
('sql-update-title', 'sql-update-title-op-2', 'UPDATE asigna Leer CSS a la fila cuyo id es 1.'),
('sql-delete-where', 'sql-delete-where-op-3', 'DELETE sin filtro elimina todas las filas, pero conserva la tabla. El ejemplo sí usa un filtro.'),
('sql-select', 'sql-select-op-2', 'SELECT nombre pide esa columna. FROM estudiantes identifica la tabla sin modificar sus datos.'),
('sql-filter', 'sql-filter-op-1', 'edad > 18 incluye edades mayores a 18. Para incluir también 18 se usaría >=.'),
('sql-insert', 'sql-insert-op-3', 'INSERT INTO crea una nueva fila. UPDATE modifica filas existentes y DELETE elimina filas.'),
('php-variable-prefix', 'php-variable-prefix-op-2', 'Las variables de PHP comienzan con $.'),
('php-sum-value', 'php-sum-value-op-1', 'Ambos operandos son números: 2 + 3 = 5.'),
('php-concat-op', 'php-concat-op-op-3', 'El punto concatena "Hola, " con el contenido de $nombre.'),
('php-if-output', 'php-if-output-op-2', '5 >= 5 es verdadero, por lo que se ejecuta el primer bloque.'),
('php-post-key', 'php-post-key-op-3', 'La clave se toma de name="correo", por eso se usa $_POST["correo"].'),
('php-form-action', 'php-form-action-op-1', 'action="recibir.php" señala el destino del envío.'),
('php-isset-check', 'php-isset-check-op-2', 'isset solo verifica presencia y ausencia de NULL; no valida que el texto sea un correo.'),
('php-server-validation', 'php-server-validation-op-3', 'La validación del navegador puede omitirse. El servidor debe validar lo recibido antes de usarlo.'),
('php-variable', 'php-variable-op-2', 'echo lee el valor guardado en $nombre, que es la cadena "Luz".'),
('php-form', 'php-form-op-1', '$_POST["nombre"] accede a ese campo. En una aplicación real hay que comprobar su existencia, validar el dato y escapar la salida al mostrarlo en HTML.'),
('php-condition', 'php-condition-op-3', '3 no es mayor o igual a 5. Se ejecuta el bloque else.'),
('java-int-type', 'java-int-type-op-2', 'int puntos declara una variable entera.'),
('java-method-result', 'java-method-result-op-1', 'El método devuelve numero * 2: con 3 produce 6.'),
('java-if-message', 'java-if-message-op-3', 'puntos vale 6 y cumple puntos >= 5.'),
('java-parameter', 'java-parameter-op-2', 'numero es el parámetro declarado como int en la firma del método.'),
('java-class-object', 'java-class-object-op-3', 'Alumno es la clase; alumna es una variable que referencia una instancia.'),
('java-new-instance', 'java-new-instance-op-1', 'new crea una instancia y el constructor inicializa su campo nombre.'),
('java-this-field', 'java-this-field-op-2', 'this señala el objeto cuya construcción o método se está ejecutando.'),
('java-instance-greeting', 'java-instance-greeting-op-3', 'El objeto guarda Luz en nombre, por lo que el método devuelve Hola, Luz.'),
('java-variable', 'java-variable-op-2', 'puntos es un entero. La suma 2 + 1 produce 3. El fragmento se usaría dentro de un método.'),
('java-loop', 'java-loop-op-1', 'El cuerpo se ejecuta con i igual a 0, 1 y 2. Al llegar a 3, i < 3 es falso.'),
('java-class', 'java-class-op-3', 'mensaje es el método. Saludo es la clase y String es el tipo del valor que devuelve.'),
('node-run-command', 'node-run-command-op-2', 'node app.mjs inicia la ejecución del archivo con Node.js.'),
('node-export-function', 'node-export-function-op-1', 'export hace que la función pueda importarse desde otro módulo.'),
('node-module-path', 'node-module-path-op-3', './ indica una ruta relativa al archivo que realiza la importación.'),
('node-console-output', 'node-console-output-op-2', 'En este programa Node.js, console.log escribe en la salida de la terminal.'),
('node-http-module', 'node-http-module-op-3', 'node:http es un módulo integrado de Node.js para trabajar con HTTP.'),
('node-root-route', 'node-root-route-op-1', 'La comparación con "/" es verdadera y se ejecuta res.end("Hola").'),
('node-missing-route', 'node-missing-route-op-2', 'Esa ruta entra en el else y el servidor asigna statusCode = 404.'),
('node-end-response', 'node-end-response-op-3', 'res.end termina la respuesta HTTP y puede incluir su cuerpo de texto.'),
('node-runtime', 'node-runtime-op-2', 'Node.js ejecuta JavaScript fuera del navegador; no es un lenguaje diferente de JavaScript.'),
('node-module', 'node-module-op-1', 'import trae la función exportada. Para este ejemplo, Node.js debe usar módulos ES, por ejemplo con type: "module" en package.json.'),
('node-route', 'node-route-op-3', 'La condición compara req.url con "/hola". Las otras rutas reciben la respuesta 404 del bloque else.')
on conflict do nothing;

commit;
