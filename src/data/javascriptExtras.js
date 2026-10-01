import { question as q } from './contentFactory.js'

export const javascriptExtras = {
  'guardar-valores': [q('js-reassign', '¿Qué declaración permite cambiar su valor después?', ['const', 'let', 'console.log'], 1, 'let permite reasignar el valor: por eso puntos puede pasar de 1 a 3.')],
  'tipos-datos': [q('js-type-name', '¿Qué devuelve typeof nombre en el ejemplo?', ['"string"', '"number"', '"boolean"'], 0, 'nombre guarda "Luz", una cadena entre comillas. Su tipo es string.')],
  calculos: [
    q('js-subtract', '¿Cuánto da 8 - 3?', ['11', '24', '5'], 2, 'El operador - resta: ocho menos tres da cinco.', 'const diferencia = 8 - 3;'),
    q('js-divide', '¿Cuánto da 12 / 4?', ['3', '8', '48'], 0, 'El operador / divide. Doce dividido por cuatro es tres.', 'const partes = 12 / 4;')
  ],
  comparaciones: [
    q('js-or', '¿Qué devuelve false || true?', ['false', 'true', '0'], 1, '|| necesita al menos una condición verdadera. La segunda es true.'),
    q('js-not', '¿Qué devuelve !true?', ['true', '1', 'false'], 2, '! invierte un booleano: la negación de true es false.')
  ],
  'if-else': [
    q('js-if-high', 'Con puntos = 8, ¿qué bloque se ejecuta?', ['if', 'else', 'Ambos'], 0, '8 >= 5 es verdadero, por lo tanto se ejecuta el bloque if.'),
    q('js-if-value', 'Después de comparar puntos >= 5, ¿cambia el valor de puntos?', ['Pasa a 5', 'No, comparar no lo modifica', 'Pasa a true'], 1, 'La comparación produce un booleano sin reasignar la variable puntos.')
  ],
  'else-if': [
    q('js-low-grade', '¿Qué se muestra si nota vale 4?', ['Excelente', 'Aprobado', 'A repasar'], 2, '4 no cumple >= 9 ni >= 6. Se ejecuta el else final.'),
    q('js-grade-six', '¿Qué se muestra con nota = 6?', ['Excelente', 'Aprobado', 'A repasar'], 1, 'La primera condición es falsa; la segunda incluye la igualdad, así que muestra Aprobado.')
  ],
  'bucle-for': [
    q('js-for-first', '¿Cuál es el primer valor que se muestra?', ['0', '1', '3'], 0, 'El inicio let i = 0 hace que la primera vuelta muestre cero.'),
    q('js-for-increment', '¿Qué hace i++ al terminar una vuelta?', ['Disminuye i', 'Vuelve a cero', 'Aumenta i en uno'], 2, 'El incremento aumenta i en uno antes de comprobar la condición de la próxima vuelta.')
  ],
  'bucle-while': [
    q('js-while-zero', 'Si intentos empezara en 2, ¿cuántas vueltas daría?', ['Dos', 'Cero', 'Una'], 1, 'while evalúa antes de entrar: 2 < 2 es falso, por lo que no ejecuta el cuerpo.'),
    q('js-while-one', 'Si intentos empezara en 1, ¿cuántas vueltas daría?', ['Una', 'Dos', 'Tres'], 0, 'Con 1 la condición es verdadera; el incremento lo lleva a 2 y la siguiente comprobación es falsa.')
  ],
  parametros: [
    q('js-argument', 'En doble(4), ¿cuál es el argumento?', ['numero', 'doble', '4'], 2, '4 es el valor pasado en la llamada. numero es el parámetro que lo recibe.'),
    q('js-double-six', '¿Qué devuelve doble(6)?', ['6', '12', '8'], 1, 'La función multiplica el argumento por dos: 6 × 2 = 12.')
  ],
  retornos: [
    q('js-return-call', '¿Qué devuelve sumar(4, 2)?', ['6', '42', '2'], 0, 'Los argumentos son números. return a + b devuelve 4 + 2 = 6.'),
    q('js-return-end', '¿Qué pasa al ejecutar return en una función?', ['Repite la función', 'Termina esa llamada y devuelve un valor', 'Solo muestra un mensaje'], 1, 'return entrega el valor y termina esa llamada; console.log solo muestra un mensaje.')
  ]
}
