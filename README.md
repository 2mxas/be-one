# PREGUNTAS GUIDE.md

### 1. What happens if you send a POST to `/products` with `price: -5`? Why?

La pagina enviara un codigo de error debido a que ese post seria invalido, esto se debe a que la propiedad price para los productos tiene la etiqueta `@IsPositive`, lo que valida que ese campo sea positivo antes de aceptar el body que se envia en la solicitud como valido.

---

### 2. What is the role of `ParseIntPipe` in `@Param('id', ParseIntPipe)`?

El rol de ParseIntPipe se centra en convertir el id que llega como string a un numero valido. En caso de que lo que llegue como id no se pueda convertir en un numero se retornara un bad request.

---

### 3. What would happen without `@IsNotEmpty()` on `name`?

No habria un efecto evidente con este cambio debido a que name tiene otras validaciones como `@MinLength` y `@MaxLength`, lo que hace que sin importar que `@IsNotEmpty` no este presente, se sigan solo aceptando nombres que no esten vacios.

---

### 4. Why does the service throw `NotFoundException` instead of returning `null`?

Es mejor retornar una excepcion y no null debido a que es importante retornar mensajes de error dicientes.

---

### 5. What is the difference between `@Get()` and `@Get(':id')`?

`@Get()` sirve para crear el manejo de la peticion en `/products`, mientras que `@Get(':id')` sirve para crear el manejo de la peticion en `products/id`.

---

# PREGUNTAS TASKS.md

### 1. Dead route diagnosis

Si `findAll()` no tiene `@Get()`, la ruta `/tasks` no existe para NestJS. Entonces al hacer `GET /tasks` se obtiene un 404 Not Found, porque el framework solo registra métodos que tienen decoradores de ruta. Para arreglarlo, simplemente hay que agregar `@Get()` encima del método.

---

### 2. ParseIntPipe vs transform

Aunque `transform: true` convierte tipos automáticamente, `ParseIntPipe` se usa porque también valida de forma explícita. Si el valor no se puede convertir a número, lanza un error inmediatamente. No hacen exactamente lo mismo: `transform` es más general, mientras que `ParseIntPipe` es más estricto y seguro para parámetros.

---

### 3. Whitelist vs forbidNonWhitelisted

Si solo está `whitelist: true`, la petición pasa con **201 Created** y el campo `"password"` simplemente se elimina sin avisar. El servicio nunca lo ve. Esto puede ser peligroso porque el cliente cree que envió datos válidos, pero el backend los ignora silenciosamente, lo que puede ocultar errores o comportamientos inesperados.

---

### 4. Mutation side-effect

Sí, modificar lo que devuelve `findAll()` cambia los datos internos del servicio. Esto pasa porque se devuelve el mismo array en memoria, no una copia. Entonces cualquier cambio afecta directamente al estado real. Para evitarlo, se debería devolver una copia del array o de los objetos.

---

### 5. Optional field trap

Si envías `{ "price": -50 }`, falla la validación porque el campo está presente y debe cumplir las reglas. Pero si envías `{}`, pasa sin problema porque `@IsOptional()` permite que el campo no venga. En resumen, “optional” significa que el campo puede no existir, pero si existe, debe ser válido.

---

### 6. ID reuse after deletion

Con `nextId`, los IDs nunca se repiten, aunque borres elementos. Si borras el ID 1, el siguiente será un número nuevo, no se reutiliza. Pero si usaras `length + 1`, podrías crear IDs duplicados después de borrar elementos, lo que generaría errores al buscar datos.

---

### 7. Module forgotten

El servidor arranca normalmente porque Nest no detecta el problema al inicio. Pero al hacer `POST /users`, obtienes un 404, ya que el módulo no fue registrado y sus rutas no existen. Es un error de ejecución, no de compilación ni de inicio.

---

### 8. Missing 201

Por defecto, un `@Post()` en NestJS ya devuelve **201 Created**, así que no es obligatorio usar `@HttpCode(201)`. No es un error no incluirlo, pero puede ser útil si quieres cambiar el código de respuesta o dejarlo explícito.

---

### 9. Service throws vs returns null

Si el service devuelve `null`, el controller debe verificarlo y lanzar el error, lo que repite lógica. En cambio, lanzar `NotFoundException` directamente en el service es mejor porque centraliza el manejo de errores y evita duplicación, haciendo el código más limpio y fácil de mantener.

---