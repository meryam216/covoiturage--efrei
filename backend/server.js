const express = require("express");
const cors = require("cors");
const mysql = require("mysql2")
const cookieParser = require("cookie-parser");

const app = express();

// 👉 CONNEXION MYSQL

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "efreiride"
})

db.connect(err => {
  if (err) {
    console.error("Erreur MySQL:", err)
  } else {
    console.log("✅ Connecté à MySQL")
  }
}) 

app.use(cors({
  origin: true ,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Route test
app.get("/", (req, res) => {
  res.send("API EfreiRide fonctionne !");
});

//  ROUTE REGISTER
app.post("/api/auth/register", (req, res) => { 
  const { nom, email, mot_de_passe } = req.body;

  const sql = "INSERT INTO users (nom, email, mot_de_passe) VALUES (?, ?, ?)";

  db.query(sql, [nom, email, mot_de_passe], (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    res.json({ message: "Utilisateur créé !" })
  })
});

//  ROUTE LOGIN
app.post("/api/auth/login", (req, res) => {
  const { email, mot_de_passe } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND mot_de_passe = ?";

  db.query(sql, [email, mot_de_passe], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Compte introuvable" })
    }

    const user = results[0]

    res.json({
      message: "Connexion réussie",
      user: {
        nom: user.nom,
        email: user.email
      }
    })
  })
})
// AJOUTER TRAJET
app.post("/api/trajets", (req, res) => {
  const { depart, arrivee, date, heure,places,user } = req.body

  const sql = "INSERT INTO trajets (depart, arrivee, date, heure,places, user) VALUES (?, ?,?, ?,?, ?)"

  db.query(sql, [depart, arrivee, date, heure,places, user], (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    res.json({ depart, arrivee, date, heure,places, user })
  })
})

//  RÉCUPÉRER TOUS LES TRAJETS
app.get("/api/trajets", (req, res) => {
  db.query("SELECT * FROM trajets", (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    res.json(results)
  })
})
app.put("/api/trajets/:id", (req, res) => {
  const id = req.params.id
  const { depart, arrivee, date, heure, places } = req.body

  const sql = `
    UPDATE trajets 
    SET depart = ?, arrivee = ?, date = ?, heure = ?, places = ?
    WHERE id = ?
  `

  db.query(sql, [depart, arrivee, date, heure, places, id], (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    res.json({ message: "Trajet modifié" })
  })
}) 

// supprimer un trajet 
app.delete("/api/trajets/:id", (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM trajets WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Erreur" })

    res.json({ message: "Supprimé" })
  })
})
//place reservée
app.put("/api/trajets/reserver/:id", (req, res) => {
  const id = req.params.id

  const sql = `
    UPDATE trajets 
    SET places = places - 1 
    WHERE id = ? AND places > 0
  `

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erreur serveur" })
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Plus de places disponibles" })
    }

    res.json({ message: "Réservation confirmée" })
  })
})

// Lancement du serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});