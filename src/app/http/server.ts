
import express from "express";
import { Request, Response } from "express";
import { usuaris, productes } from "./dades.js";


export function buildServer() {
  const app = express();
  app.use(express.json());


  // Consultem la llista d'usuaris
  app.get("/api/users", function (req: Request, res: Response) {
    res.status(200).json(usuaris);
  });

  // Consultem un usuari concret
  app.get("/api/users/:id", function (req: Request, res: Response) {
    let id = req.params.id;
    usuaris.forEach(usuari => {
      if (usuari.id == id)
        res.status(200).json(usuari);
    });
  });

  // Afegint usuaris
  // Exemple amb CURL: curl --header "Content-Type: application/json"   --request POST   --data '{"name":"Manolo","email":"manolo@gmail.com"}'   http://localhost:3000/api/user
  app.post("/api/users", function (req: Request, res: Response) {
    // Obtenim el cos de la petició
    const { name, email } = req.body;

    // Validació simple
    if (!name || !email) {
      return res.status(400).json({ message: "El nom i l'email són obligatoris" });
    }

    // Generem un ID i una data de creació per a l'usuari (en un cas real, seria generat per la BD)
    const newUser = {
      id: (usuaris.length + 1).toString(),
      name,
      email,
      createdAt: (new Date()).toString(),
    };

    // Afegim l'usuari a la base de dades simulada
    usuaris.push(newUser);

    // Retornem l'usuari creat
    res.status(201).json(newUser);
  });



  // Consultem la llista de productes
  app.get("/api/products", function (req: Request, res: Response) {
    res.status(200).json(productes);
  });

  // Consultem un producte concret
  app.get("/api/productes/:id", function (req: Request, res: Response) {
    let id = req.params.id;
    productes.forEach(producte => {
      if (producte.id == id)
        res.status(200).json(producte);
    });
  });

  // Afegint productes
  // Exemple amb CURL: curl --header "Content-Type: application/json"   --request POST   --data '{"name":"Manolo","email":"manolo@gmail.com"}'   http://localhost:3000/api/user
  app.post("/api/products", function (req: Request, res: Response) {
    // Obtenim el cos de la petició
    const { name, price, stock } = req.body;

    // Validació simple
    if (!name || !price || !stock ) {
      return res.status(400).json({ message: "Cal indicar nom, preu i stock" });
    }

    // Generem un ID i una data de creació per al producte (en un cas real, seria generat per la BD)
    const producteNou = {
      id: (productes.length + 1).toString(),
      name,
      price,
      stock,
      createdAt: (new Date()).toString(),
    };

    // Afegim el producte a la base de dades simulada
    productes.push(producteNou);

    // Retornem l'usuari creat
    res.status(201).json(producteNou);
  });




  return app;
}