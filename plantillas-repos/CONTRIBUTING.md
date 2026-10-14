<!-- PLANTILLA: ajustá los comandos y las reglas a cada proyecto. -->

# Cómo colaborar

¡Gracias por querer sumar a **[Nombre del proyecto]**! Acá no hace falta ser experto: si estás aprendiendo, este es un buen lugar para hacerlo.

Antes de empezar, leé el [código de conducta](CODE_OF_CONDUCT.md).

## Formas de aportar

- **Reportar un error:** abrí un Issue con lo que esperabas que pasara, lo que pasó y cómo repetirlo.
- **Proponer una idea:** abrí un Issue y contanos el problema que querés resolver antes de escribir código.
- **Mejorar la documentación:** corregir un texto, aclarar un paso o traducir también cuenta como aporte.
- **Escribir código:** elegí un Issue (los marcados `good first issue` son para empezar) y avisá en un comentario que lo vas a tomar.

## Flujo de trabajo

1. **Hacé un fork** del repo (o pedí acceso si sos parte del equipo).
2. **Cloná** tu copia y creá una rama con un nombre claro:
   ```bash
   git checkout -b tipo/descripcion-corta
   # ejemplos: fix/error-al-iniciar · feat/modo-oscuro · docs/guia-instalacion
   ```
3. **Hacé tus cambios** en pasos chicos y probá que todo funcione.
4. **Commiteá** con mensajes que se entiendan:
   ```
   fix: corrige el cierre de la app al abrir carpetas vacías
   feat: agrega filtro por fecha
   docs: aclara los pasos de instalación en Windows
   ```
5. **Subí la rama** y abrí un **Pull Request** hacia `main`. Contá qué cambiaste y por qué. Si resuelve un Issue, escribí `Closes #12`.
6. **Esperá la revisión.** Alguien del equipo te va a comentar. Es normal pedir ajustes: la idea es mejorar el proyecto y aprender entre todos.

> Nadie sube directo a `main`, ni siquiera el equipo. Todo entra por Pull Request.

## Reglas simples

- Un Pull Request, un tema. Los cambios chicos se revisan más rápido.
- Probá tu cambio antes de pedir revisión: [comando de pruebas o pasos manuales].
- Respetá el estilo del código existente: [formateador o guía, ej: PEP 8 / Prettier].
- No subas contraseñas, claves de API ni datos personales. Si se te escapa algo, avisá enseguida.
- Si usás herramientas de IA para escribir código, revisá y entendé lo que subís: sos responsable de tu Pull Request.
- Al aportar, aceptás que tu contribución se publique bajo la licencia del proyecto.

## ¿Es tu primera vez?

Está perfecto. Elegí algo chico (un typo, un texto, un ejemplo) y abrí tu primer Pull Request. Si te trabás, preguntá en el Issue o en el equipo. Nadie nació sabiendo.

## Dudas

Escribinos en [canal del equipo] o abrí un Issue con la etiqueta `pregunta`.
