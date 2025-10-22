# 💼 SISTEMA DE OFERTAS LABORALES - INSTRUCCIONES COMPLETAS

## ✅ IMPLEMENTACIÓN COMPLETADA

Se ha creado un sistema completo de ofertas laborales integrado con el mapa de instituciones.

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. **Página de Ofertas Laborales** (`/ofertas`)
- ✅ Muestra todas las ofertas de trabajo para docentes
- ✅ Filtrado automático por institución mediante URL parameter
- ✅ Diseño responsive en grid (1/2/3 columnas)
- ✅ Estados de carga, error y vacío
- ✅ Botón "Aplicar" (placeholder para futura funcionalidad)
- ✅ Botón "Ver en Mapa" para navegar a la institución
- ✅ Soporte completo de i18n (español/inglés)

### 2. **Integración con Mapa**
- ✅ Botón "Ofertas Docentes" en cada popup del mapa
- ✅ Navegación directa a ofertas filtradas por institución
- ✅ Mantiene contexto de la institución seleccionada

### 3. **Base de Datos**
- ✅ Tabla `job_offers` con relación a `institutions`
- ✅ RLS configurado para lectura pública
- ✅ Índices optimizados
- ✅ 9 ofertas de demostración incluidas

---

## 📋 PASOS PARA ACTIVAR EL SISTEMA

### PASO 1: Ejecutar SQL en Supabase

1. Abre tu proyecto de Supabase:
   ```
   https://supabase.com/dashboard/project/jpqltnyuexzkzkdksifp
   ```

2. Ve a **SQL Editor** (menú izquierdo)

3. Click en **"+ New query"**

4. **IMPORTANTE**: Primero asegúrate de tener instituciones creadas:
   - Si NO tienes instituciones, ejecuta primero `SQL_RAPIDO_INSTITUCIONES.sql`
   - Si YA tienes instituciones, continúa con el siguiente paso

5. Abre el archivo: `SQL_JOB_OFFERS_CON_INSTITUCIONES.sql`

6. Copia **TODO** el contenido

7. Pega en el editor de SQL

8. Click en **"Run"** (botón verde)

9. Espera a ver "Success"

10. **Verifica los resultados**:
    - Deberías ver 9 ofertas de trabajo
    - Distribuidas en las 8 instituciones de Caracas

---

### PASO 2: Verificar que el Servidor Esté Corriendo

El servidor debería estar corriendo en: `http://localhost:8083/`

Si no está corriendo:
```bash
cd TechOS
npm run dev
```

---

### PASO 3: Probar la Funcionalidad

#### 3.1. Ver Todas las Ofertas
1. Abre tu navegador
2. Ve a: `http://localhost:8083/ofertas`
3. Deberías ver 9 ofertas en un grid
4. Cada tarjeta muestra:
   - Título del puesto
   - Nombre de la institución
   - Rama/especialidad
   - Horario
   - Salario
   - Requisitos
   - Botones de acción

#### 3.2. Filtrar por Institución desde el Mapa
1. Ve a: `http://localhost:8083/map`
2. Espera a que carguen los marcadores
3. Click en cualquier marcador (ej. UCV)
4. Aparece un popup con información
5. Click en el botón **"Ofertas Docentes"**
6. Serás redirigido a `/ofertas?institutionId=...`
7. Verás solo las ofertas de esa institución

#### 3.3. Navegar de Vuelta al Mapa
1. Desde la página de ofertas
2. Click en "Ver en Mapa" en cualquier tarjeta
3. Serás redirigido al mapa con la institución resaltada

---

## 🗂️ ARCHIVOS CREADOS/MODIFICADOS

### Nuevos Archivos:
```
✅ TechOS/src/pages/JobOffersPage.tsx
✅ TechOS/SQL_JOB_OFFERS_CON_INSTITUCIONES.sql
✅ TechOS/OFERTAS_LABORALES_INSTRUCCIONES.md (este archivo)
```

### Archivos Modificados:
```
✅ TechOS/src/types/index.ts
   → Añadida interfaz JobOffer

✅ TechOS/src/App.tsx
   → Añadida ruta /ofertas
   → Redirect de /job-offers a /ofertas

✅ TechOS/src/pages/MapPage.tsx
   → Importado Briefcase icon y useNavigate
   → Añadido botón "Ofertas Docentes" en popups

✅ TechOS/public/locales/es/translation.json
   → Añadidas traducciones para jobOffers, map y common

✅ TechOS/public/locales/en/translation.json
   → Añadidas traducciones en inglés
```

---

## 🎨 ESTRUCTURA DE LA INTERFAZ

### Página de Ofertas (`/ofertas`)

```
┌──────────────────────────────────────────────────────────────┐
│  TECH OS - Navegación                                        │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  💼 Ofertas de Trabajo para Docentes                         │
│  Universidad Central de Venezuela (si filtrado)              │
│  Encuentra tu próxima oportunidad profesional                │
└──────────────────────────────────────────────────────────────┘

┌────────────┬────────────┬────────────┐
│ 📋 Card 1  │ 📋 Card 2  │ 📋 Card 3  │
│            │            │            │
│ Profesor   │ Profesor   │ Profesor   │
│ Matemáticas│ Física     │ Programaci.│
│            │            │            │
│ UCV        │ UCV        │ USB        │
│ Horario..  │ Horario..  │ Horario..  │
│ Salario..  │ Salario..  │ Salario..  │
│            │            │            │
│ [Aplicar]  │ [Aplicar]  │ [Aplicar]  │
│ [Ver Mapa] │ [Ver Mapa] │ [Ver Mapa] │
└────────────┴────────────┴────────────┘
```

### Popup en el Mapa

```
┌─────────────────────────┐
│ Universidad Central de  │
│ Venezuela               │
│                         │
│ 🟣 Universidad          │
│                         │
│ [Ofertas Docentes] ⬅️   │  (NUEVO)
│ [Cómo llegar]          │
└─────────────────────────┘
```

---

## 🔄 FLUJO DE USUARIO

### Flujo 1: Usuario busca ofertas generales
```
1. Usuario va a /ofertas
2. Ve todas las ofertas disponibles
3. Click en "Aplicar" → Toast "Próximamente"
4. Click en "Ver en Mapa" → Navega al mapa con institución resaltada
```

### Flujo 2: Usuario busca ofertas de una institución específica
```
1. Usuario va a /map
2. Click en marcador de institución
3. Aparece popup con información
4. Click en "Ofertas Docentes"
5. Navega a /ofertas?institutionId=...
6. Ve solo ofertas de esa institución
```

### Flujo 3: Usuario navega desde oferta al mapa
```
1. Usuario está en /ofertas
2. Ve una oferta interesante
3. Click en "Ver en Mapa"
4. Navega a /map?highlight=...
5. El mapa se centra en la institución
```

---

## 📊 DATOS DE DEMOSTRACIÓN

El SQL incluye **9 ofertas de trabajo**:

| Institución | Puesto | Rama | Salario |
|------------|--------|------|---------|
| UCV | Profesor de Matemáticas | Ciencias Exactas | $800-$1,200 |
| UCV | Profesor de Física | Ciencias Exactas | $1,000-$1,500 |
| USB | Profesor de Programación | Ingeniería | $1,200-$1,800 |
| UCAB | Profesor de Inglés | Idiomas | $700-$1,000 |
| UCAB | Profesor de Filosofía | Humanidades | $650-$900 |
| UMet | Profesor de Administración | C.E.S | $1,100-$1,600 |
| C. Emil Friedman | Docente de Primaria | Ed. Básica | $600-$850 |
| C. San Ignacio | Profesor de Química | C. Naturales | $750-$1,000 |
| IUPOLC | Instructor de Redes | Tecnología | $900-$1,300 |

---

## 🌐 TRADUCCIONES

### Español (`es/translation.json`)
```json
{
  "jobOffers": {
    "title": "Ofertas de Trabajo para Docentes",
    "subtitle": "Encuentra tu próxima oportunidad profesional",
    "apply": "Aplicar",
    "viewOnMap": "Ver en Mapa"
  },
  "map": {
    "teacherOfferButton": "Ofertas Docentes"
  }
}
```

### Inglés (`en/translation.json`)
```json
{
  "jobOffers": {
    "title": "Teaching Job Opportunities",
    "subtitle": "Find your next professional opportunity",
    "apply": "Apply",
    "viewOnMap": "View on Map"
  },
  "map": {
    "teacherOfferButton": "Teaching Offers"
  }
}
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema 1: No se ven ofertas en `/ofertas`
**Causa**: No ejecutaste el SQL o la tabla no tiene datos  
**Solución**:
1. Ve a Supabase SQL Editor
2. Ejecuta `SQL_JOB_OFFERS_CON_INSTITUCIONES.sql`
3. Verifica con: `SELECT * FROM job_offers WHERE is_active = true;`

### Problema 2: Error "column institution_id does not exist"
**Causa**: SQL no se ejecutó correctamente  
**Solución**:
1. Ejecuta el SQL completo de nuevo
2. El script incluye `DROP TABLE IF EXISTS` para limpiar primero

### Problema 3: Botón "Ofertas Docentes" no funciona en el mapa
**Causa**: Error de JavaScript o navigate no está disponible  
**Solución**:
1. Abre consola del navegador (F12)
2. Busca errores en la consola
3. Verifica que la página se haya recargado después de los cambios

### Problema 4: No se filtran ofertas por institución
**Causa**: institution_id no coincide con la tabla institutions  
**Solución**:
1. Verifica que las instituciones existan primero
2. Ejecuta primero `SQL_RAPIDO_INSTITUCIONES.sql`
3. Luego ejecuta `SQL_JOB_OFFERS_CON_INSTITUCIONES.sql`

---

## 📝 PRÓXIMOS PASOS (Opcional)

1. **Implementar función de aplicación**:
   - Crear formulario de postulación
   - Guardar aplicaciones en Supabase
   - Notificar a instituciones

2. **Añadir más filtros**:
   - Por rango de salario
   - Por horario
   - Por rama/especialidad
   - Por ubicación

3. **Búsqueda avanzada**:
   - Búsqueda por palabras clave
   - Autocompletado
   - Ordenamiento (fecha, salario, etc.)

4. **Sistema de favoritos**:
   - Guardar ofertas favoritas
   - Lista de ofertas guardadas
   - Notificaciones de nuevas ofertas

---

## ✅ VERIFICACIÓN FINAL

Marca cada uno cuando lo completes:

- [ ] SQL ejecutado en Supabase exitosamente
- [ ] Servidor corriendo en localhost
- [ ] `/ofertas` muestra 9 ofertas
- [ ] Click en marcador del mapa abre popup
- [ ] Botón "Ofertas Docentes" navega correctamente
- [ ] Ofertas se filtran por institución
- [ ] Traducciones funcionando (ES/EN)
- [ ] Responsive design funciona (móvil/tablet/desktop)

---

## 🎉 ¡LISTO!

Ahora tienes un sistema completo de ofertas laborales integrado con el mapa de instituciones.

**URLs Importantes:**
- Todas las ofertas: `http://localhost:8083/ofertas`
- Mapa: `http://localhost:8083/map`
- Ofertas filtradas: `http://localhost:8083/ofertas?institutionId=...`

---

**¿Necesitas ayuda?** Revisa este documento o abre la consola del navegador (F12) para ver logs de depuración.


