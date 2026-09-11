// Curso inicial: cinco unidades, dos lecciones por unidad y dos ejercicios por lección.
// Mismo contrato de opción única que las prácticas introductorias.
const question = (id, question, labels, answer, explanation, code) => ({
  id, question, options: labels.map((label, i) => ({ id: String.fromCharCode(97 + i), label })),
  answerId: String.fromCharCode(97 + answer), explanation, code
})
const lesson = (id, title, description, content, code, questions) => ({
  id, title, description, content, code,
  activities: questions.map(item => ({
    ...item, courseId: 'javascript', lessonId: id, type: 'single-choice',
    title: item.question, concept: content.join(' '), code: item.code || code
  }))
})

export const javascriptUnits = [
  {
    id: 'variables', title: 'Variables y tipos de datos',
    description: 'Guardá información y distinguí números, textos y valores lógicos.',
    status: 'available', icon: 'inventory_2',
    lessons: [
      lesson('guardar-valores', 'Guardá tus primeros valores', 'Conocé let y const.',
        ['JavaScript permite escribir instrucciones para trabajar con información. Una variable tiene un nombre y un valor.',
          'let permite reasignar el valor; const impide reasignarlo. Usamos console.log para mostrarlo. Las instrucciones de estos ejemplos se leen de arriba hacia abajo.'],
        'let puntos = 1;\npuntos = 3;\nconst nombre = "Ana";\nconsole.log(puntos);', [
          question('js-let', '¿Qué valor muestra console.log(puntos)?', ['1', '3', 'Ana'], 1, 'puntos empezó en 1, pero la segunda instrucción lo reasignó a 3.'),
          question('js-const', '¿Qué declaración elegirías para un valor que no vas a reasignar?', ['const', 'let', 'console.log'], 0, 'const declara una variable que no se puede reasignar. Esto no hace inmutables los objetos, tema de una etapa posterior.')
        ]),
      lesson('tipos-datos', 'Números, textos y booleanos', 'Reconocé el tipo de cada valor.',
        ['Los números se escriben sin comillas. Las cadenas de texto usan comillas y los booleanos son true o false.',
          'typeof permite consultar el tipo de un valor. Un número entre comillas es texto, aunque se vea como una cantidad.'],
        'const edad = 18;\nconst nombre = "Luz";\nconst activo = true;\nconsole.log(typeof edad);', [
          question('js-type-number', '¿Qué devuelve typeof edad?', ['"string"', '"boolean"', '"number"'], 2, '18 no tiene comillas y es un número. typeof edad devuelve la cadena "number".'),
          question('js-type-boolean', '¿Cuál de estos valores es booleano?', ['"true"', 'true', '18'], 1, 'true sin comillas es un booleano. "true" entre comillas es texto.')
        ])
    ]
  },
  {
    id: 'operadores', title: 'Operadores y expresiones',
    description: 'Calculá resultados y compará valores para formar condiciones.',
    status: 'locked', icon: 'calculate',
    lessons: [
      lesson('calculos', 'Hacé tus primeros cálculos', 'Sumá, multiplicá y agrupá operaciones.',
        ['Los operadores +, -, * y / permiten sumar, restar, multiplicar y dividir números.',
          'La multiplicación se resuelve antes que la suma. Los paréntesis permiten cambiar el orden de las operaciones.'],
        'const total = 2 + 3 * 4;\nconst agrupado = (2 + 3) * 4;', [
          question('js-priority', '¿Cuánto vale total?', ['20', '14', '24'], 1, 'Primero se calcula 3 × 4 = 12. Después se suma 2: el resultado es 14.'),
          question('js-parentheses', '¿Cuánto vale agrupado?', ['14', '9', '20'], 2, 'El paréntesis hace que 2 + 3 se resuelva primero. Luego 5 × 4 = 20.')
        ]),
      lesson('comparaciones', 'Compará y combiná condiciones', 'Usá ===, >= y &&.',
        ['=== comprueba igualdad de valor y tipo. >= pregunta si un valor es mayor o igual que otro.',
          '&& devuelve true si ambas condiciones booleanas son verdaderas. || lo hace si al menos una lo es; ! invierte un booleano.'],
        'const edad = 18;\nconst tieneEntrada = true;\nconst puedeEntrar = edad >= 18 && tieneEntrada;', [
          question('js-and', '¿Cuánto vale puedeEntrar?', ['true', 'false', '18'], 0, 'edad >= 18 es verdadero y tieneEntrada también: ambas condiciones se cumplen.'),
          question('js-strict', '¿Qué resultado da 5 === "5"?', ['true', 'false', '10'], 1, 'El número 5 y el texto "5" tienen tipos diferentes. La igualdad estricta devuelve false.')
        ])
    ]
  },
  {
    id: 'condicionales', title: 'Condicionales',
    description: 'Elegí qué instrucciones ejecutar según lo que ocurra.',
    status: 'locked', icon: 'call_split',
    lessons: [
      lesson('if-else', 'Elegí entre dos caminos', 'Tomá decisiones con if y else.',
        ['if ejecuta un bloque cuando la condición es verdadera. else ofrece una alternativa si es falsa.',
          'En este ejemplo se ejecuta solo uno de los dos bloques. Comparar un valor no lo modifica.'],
        'const puntos = 3;\nif (puntos >= 5) {\n  console.log("Meta alcanzada");\n} else {\n  console.log("Seguí practicando");\n}', [
          question('js-else', '¿Qué mensaje se muestra con puntos = 3?', ['Meta alcanzada', 'Los dos mensajes', 'Seguí practicando'], 2, '3 >= 5 es falso, por lo que se ejecuta el bloque else.'),
          question('js-boundary', 'Si puntos fuera 5, ¿qué mensaje se mostraría?', ['Meta alcanzada', 'Seguí practicando', 'Ninguno'], 0, 'El operador >= incluye la igualdad. Con 5 puntos se cumple la condición.')
        ]),
      lesson('else-if', 'Evaluá varias alternativas', 'Ordená decisiones con else if.',
        ['else if agrega otra condición cuando la anterior fue falsa. La cadena se evalúa de arriba hacia abajo.',
          'Se ejecuta únicamente el primer bloque cuya condición se cumple. Si ninguna se cumple, se usa el else final.'],
        'const nota = 7;\nif (nota >= 9) {\n  console.log("Excelente");\n} else if (nota >= 6) {\n  console.log("Aprobado");\n} else {\n  console.log("A repasar");\n}', [
          question('js-else-if', '¿Qué texto se muestra con nota = 7?', ['Excelente', 'Aprobado', 'A repasar'], 1, '7 no llega a 9, pero sí cumple nota >= 6. Se muestra Aprobado.'),
          question('js-first-branch', 'Con nota = 10, ¿cuántos mensajes se muestran?', ['Tres', 'Dos', 'Uno'], 2, 'La primera condición es verdadera. Sus alternativas else if y else no se ejecutan.')
        ])
    ]
  },
  {
    id: 'bucles', title: 'Bucles',
    description: 'Repetí instrucciones con un contador y una condición de salida.',
    status: 'locked', icon: 'repeat',
    lessons: [
      lesson('bucle-for', 'Repetí con for', 'Controlá el inicio, la condición y el incremento.',
        ['for agrupa un inicio, una condición y una actualización. Antes de cada vuelta comprueba la condición.',
          'i++ aumenta el contador en uno al terminar la vuelta. En i < 3, el valor 3 queda fuera del recorrido.'],
        'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}', [
          question('js-for-count', '¿Cuántas veces se ejecuta console.log?', ['Tres', 'Cuatro', 'Cero'], 0, 'El cuerpo se ejecuta con i igual a 0, 1 y 2: tres vueltas.'),
          question('js-for-last', '¿Cuál es el último número que se muestra?', ['3', '2', '0'], 1, 'Se muestra 2; luego i sube a 3 y la condición i < 3 deja de cumplirse.')
        ]),
      lesson('bucle-while', 'Repetí mientras se cumpla una condición', 'Reconocé cuándo se detiene un while.',
        ['while comprueba la condición antes de cada vuelta. Si es falsa desde el principio, no ejecuta el cuerpo.',
          'Hay que actualizar los valores que permiten terminar. Si la condición nunca deja de ser verdadera, el bucle puede continuar indefinidamente.'],
        'let intentos = 0;\nwhile (intentos < 2) {\n  intentos++;\n}\nconsole.log(intentos);', [
          question('js-while-end', '¿Qué valor tiene intentos al terminar?', ['0', '1', '2'], 2, 'Se incrementa de 0 a 1 y luego a 2. Entonces intentos < 2 es falso.'),
          question('js-while-infinite', '¿Qué pasaría si se quitara intentos++ de este ejemplo?', ['El bucle no terminaría por sí solo', 'Se repetiría una sola vez', 'intentos pasaría a 2'], 0, 'intentos seguiría valiendo 0 y la condición seguiría siendo verdadera. Por eso es importante la actualización.')
        ])
    ]
  },
  {
    id: 'funciones', title: 'Funciones',
    description: 'Organizá instrucciones reutilizables con parámetros y retornos.',
    status: 'locked', icon: 'functions',
    lessons: [
      lesson('parametros', 'Pasá información a una función', 'Definí parámetros y llamá a una función.',
        ['Una función agrupa instrucciones con un nombre. Declararla prepara ese bloque; una llamada lo ejecuta.',
          'Los parámetros reciben los argumentos de cada llamada. return entrega un valor al código que llamó a la función.'],
        'function doble(numero) {\n  return numero * 2;\n}\nconst resultado = doble(4);', [
          question('js-parameter-name', '¿Cuál es el parámetro de doble?', ['resultado', 'numero', '4'], 1, 'numero es el nombre del parámetro. En doble(4), el argumento 4 se recibe en numero.'),
          question('js-call-result', '¿Cuánto vale resultado?', ['2', '4', '8'], 2, 'La llamada doble(4) calcula 4 × 2 y devuelve 8.')
        ]),
      lesson('retornos', 'Usá el resultado de una función', 'Diferenciá return de mostrar un mensaje.',
        ['return devuelve un valor y termina esa llamada a la función. console.log muestra un mensaje, pero no sustituye a return.',
          'Podés guardar el resultado de una llamada y usarlo en otra expresión. Cada llamada puede recibir argumentos diferentes.'],
        'function sumar(a, b) {\n  return a + b;\n}\nconst total = sumar(2, 3) + 1;', [
          question('js-return', '¿Cuánto vale total?', ['6', '5', '1'], 0, 'sumar(2, 3) devuelve 5. Después se suma 1 y se guarda 6.'),
          question('js-return-purpose', '¿Para qué se usa return en este ejemplo?', ['Para repetir una instrucción', 'Para devolver el resultado de la suma', 'Para declarar una variable global'], 1, 'return entrega a + b al lugar donde se llamó a sumar. Así se puede usar el resultado en otra expresión.')
        ])
    ]
  }
]

export const javascriptLessons = javascriptUnits.flatMap(unit => unit.lessons)
export const javascriptActivities = javascriptLessons.flatMap(lesson => lesson.activities)
export const findUnit = id => javascriptUnits.find(unit => unit.id === id)
export const findLesson = (unitId, lessonId) => findUnit(unitId)?.lessons.find(lesson => lesson.id === lessonId)
