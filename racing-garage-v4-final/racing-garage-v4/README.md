# Racing Garage (TP4)

Tienda de accesorios para autos. HTML + CSS + JavaScript (ES Modules), sin librerías.

## Cómo verla en tu computadora
Los módulos y `fetch` NO funcionan abriendo el HTML con doble clic (`file://`).
Usá la extensión **Live Server** de VS Code, o `python -m http.server` dentro de esta carpeta.

## Estructura
- `recursos/css/` → `base.css`, `componentes.css`, `paginas.css` (en ese orden)
- `recursos/datos/productos.json` → los productos (se leen con `fetch`)
- `recursos/js/` → un módulo por tarea (`carrito.js`, `productos-api.js`, `validaciones.js`, `envio-pedido.js`, `notificaciones.js`, ...)

## Configurar el envío (recursos/js/config.js)
1. `telefonoWhatsApp`: ya tiene el número de la tienda; para cambiarlo, editá (ej. `5493516436853`).
2. Email real (opcional): creá una cuenta gratis en https://www.emailjs.com, un servicio y una plantilla que use `{{nombre}}`, `{{email}}` y `{{mensaje}}`, y copiá `serviceId`, `templateId` y `publicKey`. Si quedan vacíos se usa WhatsApp.

## Publicar en Vercel
1. Subí esta carpeta a un repositorio de GitHub (el `index.html` debe estar en la raíz).
2. En https://vercel.com → Add New → Project → importá el repo.
3. Framework Preset: **Other**. Sin comandos de build. Deploy.
