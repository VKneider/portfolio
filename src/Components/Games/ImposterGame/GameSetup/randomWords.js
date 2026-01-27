const palabras = [
  // --- De la 1 a la 100 ---
  "perro", "gato", "elefante", "jirafa", "tigre", "león", "cebra", "delfín", "ballena", "tiburón",
  "águila", "loro", "serpiente", "tortuga", "rana", "araña", "abeja", "hormiga", "mariposa", "pulpo",
  "caballo", "vaca", "cerdo", "oveja", "canguro", "oso", "lobo", "zorro", "conejo", "ratón",
  "manzana", "plátano", "uva", "fresa", "naranja", "limón", "piña", "sandía", "pera", "cereza",
  "tomate", "lechuga", "zanahoria", "patata", "cebolla", "ajo", "brócoli", "pepino", "berenjena", "calabaza",
  "pan", "queso", "huevo", "leche", "yogur", "mantequilla", "arroz", "pasta", "carne", "pollo",
  "pescado", "sushi", "pizza", "hamburguesa", "taco", "burrito", "sándwich", "sopa", "ensalada", "tarta",
  "chocolate", "helado", "galleta", "caramelo", "café", "té", "cerveza", "vino", "agua", "zumo",
  "cuchara", "tenedor", "cuchillo", "plato", "vaso", "taza", "sartén", "olla", "horno", "nevera",
  "microondas", "batidora", "tostadora", "lavavajillas", "mesa", "silla", "sofá", "cama", "armario", "espejo",

  // --- De la 101 a la 200 ---
  "ventana", "puerta", "techo", "suelo", "pared", "alfombra", "cortina", "lámpara", "reloj", "cuadro",
  "televisión", "ordenador", "teléfono", "radio", "cámara", "altavoz", "teclado", "ratón", "monitor", "auriculares",
  "libro", "revista", "periódico", "cuaderno", "bolígrafo", "lápiz", "goma", "regla", "tijeras", "pegamento",
  "mochila", "cartera", "bolso", "maleta", "llave", "moneda", "billete", "tarjeta", "gafas", "paraguas",
  "reloj", "anillo", "collar", "pulsera", "pendientes", "sombrero", "gorra", "bufanda", "guantes", "calcetines",
  "zapatos", "botas", "sandalias", "pantalones", "camisa", "camiseta", "chaqueta", "abrigo", "vestido", "falda",
  "pijama", "bañador", "toalla", "cepillo", "jabón", "champú", "dentífrico", "esponja", "peine", "secador",
  "escoba", "fregona", "aspiradora", "plancha", "martillo", "destornillador", "clavo", "tornillo", "sierra", "pincel",
  "coche", "moto", "bicicleta", "autobús", "tren", "avión", "barco", "helicóptero", "cohete", "submarino",
  "estación", "aeropuerto", "puerto", "parada", "calle", "avenida", "plaza", "parque", "puente", "túnel",

  // --- De la 201 a la 300 ---
  "casa", "edificio", "piso", "chalet", "castillo", "palacio", "cabaña", "tienda", "iglesia", "escuela",
  "universidad", "hospital", "farmacia", "biblioteca", "museo", "cine", "teatro", "estadio", "gimnasio", "piscina",
  "restaurante", "bar", "cafetería", "panadería", "supermercado", "mercado", "banco", "oficina", "fábrica", "taller",
  "jardín", "bosque", "selva", "desierto", "montaña", "valle", "río", "lago", "mar", "océano",
  "isla", "playa", "cueva", "volcán", "cascada", "campo", "granja", "huerto", "invernadero", "establo",
  "sol", "luna", "estrella", "planeta", "cometa", "galaxia", "nube", "lluvia", "nieve", "viento",
  "tormenta", "rayo", "trueno", "arcoíris", "niebla", "calor", "frío", "verano", "invierno", "otoño",
  "primavera", "lunes", "viernes", "domingo", "enero", "julio", "diciembre", "mañana", "tarde", "noche",
  "médico", "enfermero", "dentista", "veterinario", "profesor", "maestro", "estudiante", "alumno", "científico", "ingeniero",
  "arquitecto", "abogado", "juez", "policía", "bombero", "soldado", "piloto", "marinero", "cocinero", "camarero",

  // --- De la 301 a la 400 ---
  "panadero", "carnicero", "frutero", "carpintero", "fontanero", "electricista", "mecánico", "pintor", "escultor", "músico",
  "cantante", "actor", "bailarín", "escritor", "poeta", "periodista", "fotógrafo", "diseñador", "programador", "modelo",
  "fútbol", "baloncesto", "tenis", "natación", "ciclismo", "atletismo", "boxeo", "ajedrez", "póker", "videojuego",
  "guitarra", "piano", "violín", "batería", "flauta", "trompeta", "arpa", "saxofón", "acordeón", "tambor",
  "amor", "odio", "miedo", "alegría", "tristeza", "ira", "sorpresa", "asco", "sueño", "hambre",
  "sed", "dolor", "salud", "dinero", "tiempo", "suerte", "paz", "guerra", "libertad", "justicia",
  "verdad", "mentira", "secreto", "magia", "suerte", "destino", "alma", "mente", "cuerpo", "corazón",
  "sangre", "hueso", "músculo", "piel", "pelo", "ojo", "oreja", "nariz", "boca", "mano",
  "pie", "brazo", "pierna", "cabeza", "espalda", "dedo", "uñas", "diente", "lengua", "rodilla",
  "correr", "saltar", "caminar", "nadar", "volar", "dormir", "comer", "beber", "reír", "llorar",

  // --- De la 401 a la 500 ---
  "cantar", "bailar", "leer", "escribir", "dibujar", "pintar", "jugar", "trabajar", "estudiar", "aprender",
  "hablar", "escuchar", "mirar", "tocar", "oler", "gustar", "sentir", "pensar", "saber", "querer",
  "rojo", "azul", "verde", "amarillo", "rojo", "naranja", "violeta", "rosa", "marrón", "negro",
  "blanco", "gris", "dorado", "plateado", "transparente", "brillante", "oscuro", "claro", "suave", "duro",
  "grande", "pequeño", "alto", "bajo", "largo", "corto", "ancho", "estrecho", "pesado", "ligero",
  "rápido", "lento", "caliente", "frío", "nuevo", "viejo", "joven", "antiguo", "moderno", "futuro",
  "pasado", "presente", "derecha", "izquierda", "arriba", "abajo", "dentro", "fuera", "cerca", "lejos",
  "norte", "sur", "este", "oeste", "centro", "esquina", "mitad", "doble", "triple", "cero",
  "uno", "diez", "cien", "mil", "millón", "infinito", "punto", "línea", "círculo", "cuadrado",
   "triángulo", "rectángulo", "estrella", "corazón", "flecha", "cruz", "diamante", "oro", "plata", "hierro"
];

export default palabras;