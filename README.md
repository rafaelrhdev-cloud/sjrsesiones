# Vitare — Página principal (prototipo)

Prototipo estático de la página principal del directorio de salud. Separado en tres archivos para facilitar el control de versiones.

## Estructura

```
vitare/
├── index.html   → Estructura de la página (HTML)
├── styles.css   → Todos los estilos (variables de color, tipografía, layout, responsive)
├── script.js    → Lógica de filtrado (categorías, pills, buscador) y datos de ejemplo
└── README.md
```

## Cómo verlo

No necesita build ni dependencias. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Notas

- Las fuentes (Fraunces, Inter, IBM Plex Mono) se cargan desde Google Fonts vía `<link>` en `index.html`.
- Los datos de doctores en `script.js` (arreglo `doctors`) son de ejemplo — al conectar el backend real, este es el punto donde reemplazar el arreglo estático por una llamada a la API.
- La lógica de filtrado, orden (patrocinados primero) y el buscador viven todos en `script.js`, sin dependencias externas.
