# Creació d'un Backend senzill amb arquitectura plana

Anem a crear una **API bàsica** construïda amb **Node.js**, **Express**, i **TypeScript**, que implementa operacions de consulta i creació per a usuaris i productes.

Concretament, l'API que proporcionarem serà:

| Ruta                    | Descripció                              |
| ----------------------- | --------------------------------------- |
| `GET /api/users/`       | Mostra tots els usuaris del sistema     |
| `GET /api/users/:id`    | Mosta la informació d'un usuari concret |
| `POST /api/users/`      | Afig un nou usuari al sistema           |
| `GET /api/products/`    | Mostra tots els productes del sistema   |
| `GET /api/products/:id` | Mostra informació d'un producte concret |
| `POST /api/products/`   | Afig un nou producte al sistema         |

## Estructura del projecte

La nostra aplicació es compon dels següents fitxers i directoris:

```
/
│
├── package.json        # Fitxer de configuració del projecte, dependències i scripts
├── tsconfig.json       # Fitxer de configuració de TypeScript
├── index.ts            # Punt d'entrada de l'aplicació
└── /src
    └── /app
        └── /http
            ├── server.ts       # Configuració i creació de la instància Express, gestió de rutes i peticions
            └── dades.ts        # Base de dades en memòria per a usuaris i productes
```

### Explicació dels fitxers principals

#### `package.json`

Conté la configuració del projecte, incloent-hi les dependències i scripts de l'aplicació.

```json
{
  "name": "clean-architecture",
  "version": "1.0.0",
  "description": "Node.js API with CLEAN architecture",
  "scripts": {
    "dev": "tsx watch index.ts",
    "start": "node --loader ts-node/esm index.ts"
  },
  "dependencies": {
    "express": "^4.17.1",
    "reflect-metadata": "^0.1.13"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "ts-node-dev": "^1.1.6",
    "typescript": "^4.5.2"
  }
}
```

* **`dev`**: L'script per a iniciar l'aplicació en mode desenvolupament amb `tsx`, per reiniciar l'aplicació a cada canvi que fem.
* **`start`**: L'scvript per iniciar l'aplicació en mode de producció.

#### `tsconfig.json`

El fitxer `tsconfig.json` conté la configuració per al compilador de TypeScript, on es defineixen opcions com:

* **strict**: Activa les comprovacions estrictes de tipus.
* **module**: Configurat com `ESNext` per permetre l'ús de mòduls ES.
* **target**: Estableix el nivell de compatibilitat (la versió)) de JavaScript a **ESNext**.
* **types**: Indica els tipus que volem que TypeScript carregue de manera automàtica (dels paquets que importem amb `@types/...`). Aci carreguem les definicions de tipus de NodeJS (paquet `@types/node`), amb `"types": ["node"]`.
  
#### `index.ts` i `server.ts`

El fitxer `index.ts` fa de punt d'entrada a l'aplicació, mentre que `server.ts` és qui construeix i configura l'aplicació Express. Aquest últim exporta una funció `buildServer` que retorna l'objecte aplicació, mentre que l'índex és qui fa ús d'aqueta funció per crear el servidor, definir el port i posar-se a escoltar les peticions. Això és útil per separar *com s'executa* de *què fa* l'aplicació, i és útil per testejar aquesta.

##### Fitxer `/index.ts`

```ts
import { buildServer } from "./src/app/http/server";
const app = buildServer();
const port = 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
```

#### Fitxer `src/app/http/server.ts`

Com hem dit, aquest fitxer s'encarrega de crear i configurar l'aplicació **Express**. Aci dividim totes les **rutes** i la configuració de **middlewares**.

Recodem que un **middleware** és una funció que s'executa en el procés de gestió d'una petició HTTP abans de la resposta. En aquest exemple:

* `app.use(express.json())` és un **middleware** que ens permet processar el cos de la petició com a **JSON**
* Les **funcions** que definim per processar les peticions i generar respostes per a cada ruta també són *middlewares*

#### Ffitxer `src/app/http/dades.ts`

Aquest fitxer conté un parell de vectors per simular les fonts d'informació (data sources), consistents en una llista d'usuaris i una de productes. **Observeu com podem *exportar* aquests components a fora del fitxer amb `export { usuaris, productes };`.

```ts
let usuaris = [
  { "id": "1", "name": "Joan Peris", "email": "joan@example.com", "createdAt": "2025-10-23T00:00:00Z" },
  { "id": "2", "name": "Maria Llopis", "email": "maria@example.com", "createdAt": "2025-10-22T00:00:00Z" }
];

let productes = [
  { "id": "1", "name": "Laptop", "price": 999.99, "stock": 10, "createdAt": "2025-10-23T00:00:00Z" },
  { "id": "2", "name": "Smartphone", "price": 499.99, "stock": 25, "createdAt": "2025-10-22T00:00:00Z" }
];

export { usuaris, productes };
```

## Instal·lació i execuió

En primer lloc hem d'instal·lar les dependències:

```bash
npm install
```

I per iniciar l'aplicació en mode desenvolupament:

```bash
npm run dev
```

Ara, per tal de realitzar peticions, podem fer ús de l'eina `curl`, de la següent manera:

* Peticions GET a usuaris:

  ```bash
  curl http://127.0.0.1:3000/api/users
  ```

  ```bash
  curl http://127.0.0.1:3000/api/users/1
  ```

* Peticions POST per afegir usuaris:

  ```bash
  curl --header "Content-Type: application/json" --request POST --data '{"name":"Manel Grau","email":"manel@gmail.com"}' http://localhost:3000/api/users
  ```