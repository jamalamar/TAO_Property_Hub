# TAO Property Hub

## Descripción

TAO Property Hub es una plataforma integral de gestión inmobiliaria diseñada para centralizar y optimizar la administración de un portafolio de propiedades. La aplicación ofrece herramientas especializadas para diferentes roles, como administradores, socios directores e invitados, facilitando la visualización de datos, la gestión de activos y el uso de inteligencia artificial para tareas legales y administrativas.

## Características Principales

### Roles de Usuario
La aplicación cuenta con un sistema de roles que adapta la interfaz y las funcionalidades disponibles para cada tipo de usuario:
- **Socio Director**: Tiene acceso a una vista general del negocio, incluyendo dashboards financieros, gestión de activos en renta y módulos de administración.
- **Admin**: Accede a herramientas operativas para la gestión CRUD de propiedades, el seguimiento de solicitudes de mantenimiento y la generación de contratos.
- **Invitado**: Puede explorar un catálogo público de las propiedades disponibles.

### Módulos Funcionales

#### 1. Dashboard Principal
- **Visión General**: Ofrece un resumen consolidado del valor total del portafolio.
- **Métricas Clave**: Presenta estadísticas sobre el número de propiedades por tipo (comercial, residencial, terrenos, etc.).
- **Gráficos Interactivos**:
    - **Valor por Ciudad**: Un gráfico de barras que compara el valor total de los activos en cada ciudad.
    - **Distribución de Propiedades**: Un gráfico de pastel que muestra el desglose del portafolio por tipo de activo.

#### 2. Gestor de Activos en Renta
- **Seguimiento de Pagos**: Muestra una tabla detallada con todas las propiedades arrendadas.
- **Información Relevante**: Incluye datos del inquilino, monto del alquiler, fecha de vencimiento y un estatus de pago con código de colores (Pagado, Pendiente, Atrasado).

#### 3. Catálogo de Propiedades
- **Vista de Invitado**: Permite a los usuarios no autenticados explorar todas las propiedades del portafolio en un formato de catálogo visual.
- **Navegación Sencilla**: Facilita el acceso a los detalles de cada propiedad.

#### 4. Módulos de Administración (Rol de Admin)

- **Gestión de Propiedades (CRUD)**:
    - **Catálogo Visual**: Muestra todas las propiedades en tarjetas con detalles clave como propietario, costo, tamaño y arrendatario.
    - **Filtros Avanzados**: Permite filtrar propiedades por ciudad, tipo y búsqueda de texto libre.
    - **Operaciones CRUD**: Funcionalidad para agregar, editar y eliminar propiedades a través de formularios intuitivos en diálogos modales.

- **Módulo Legal (Generador de Contratos con IA)**:
    - **Formulario Inteligente**: El usuario ingresa los datos del arrendador, arrendatario, detalles de la propiedad y condiciones del alquiler.
    - **Generación Automática**: Utiliza IA (Genkit) para redactar un contrato de arrendamiento legalmente sólido y formateado profesionalmente.
    - **Exportación a PDF**: Permite descargar el contrato generado como un documento PDF.

- **Gestión de Mantenimiento**:
    - **Tabla de Solicitudes**: Centraliza todas las solicitudes de mantenimiento para las propiedades.
    - **Seguimiento por Estatus**: Cada solicitud tiene un estado (Pendiente, En Progreso, Completado) visualmente identificado con colores.
    - **Gestión de Solicitudes**: Permite agregar nuevas solicitudes y filtrar las existentes por su estado.

## Tecnologías Utilizadas
- **Framework**: Next.js (con App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Inteligencia Artificial**: Google AI a través de Genkit
- **Gráficos**: Recharts

## Instalación y Configuración

Para configurar y ejecutar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio**:
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd tao-property-hub
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz del proyecto y añade tu clave de API de Google AI:
    ```
    GOOGLE_API_KEY=TU_API_KEY_AQUI
    ```

4.  **Ejecutar la aplicación**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

5.  **Ejecutar el servicio de Genkit** (en una terminal separada):
    ```bash
    npm run genkit:dev
    ```
    Esto iniciará el inspector de Genkit para depurar los flujos de IA.
