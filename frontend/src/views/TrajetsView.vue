<template>

  
  

  <div class="container">
     <button class="home-btn" @click="goHome">
  ⬅ Accueil
</button>

    <h1>Trouve ton prochain covoiturage</h1>

    <!--  FORM -->
    <form @submit.prevent="rechercher" class="form">
      <input v-model="recherche.depart" placeholder="Départ" />
      <input v-model="recherche.arrivee" placeholder="Destination" />
      <input v-model="recherche.date" type="date" />
      <button type="submit">Rechercher 🔍</button>
    </form>
    <!--  ANNONCE -->
<div class="promo">
  
  <div class="promo-img">
    <img src="@/assets/annonce.jpg" />
  </div>

  <div class="promo-text">
    <h2>Voyage entre étudiants</h2>
    <p>
      Réserve ton trajet rapidement et partage ton quotidien avec la communauté EFREI.
    </p>
  </div>

</div>

    <!--  RESULTATS -->
 <div v-if="resultats.length" id="trajets" class="liste">

  <div v-for="t in resultats" :key="t.id" class="card">

    <!-- IMAGE -->
    <img src="@/assets/covoiturage.png" class="card-img" />

    <!-- CONTENU -->
    <div class="card-content">
      <h3>{{ t.depart }} → {{ t.arrivee }}</h3>
      <p>{{ new Date(t.date).toLocaleDateString() }}</p>
      <p>{{ formatHeure(t.heure) }}</p>
      <p>{{ t.places || 0 }} places 🚗</p>

      <button 
        :disabled="t.places === 0"
        @click="ouvrirReservation(t)"
      >
        {{ t.places === 0 ? "Complet ❌" : "Réserver" }}
      </button>
    </div>

  </div>

</div>

    <!--  message seulement après recherche -->
    <p v-if="hasSearched && resultats.length === 0" class="empty">
      Aucun trajet trouvé 😢
    </p>

  </div>

  <!-- POPUP -->
  <div v-if="showPopup" class="popup">

    <div class="popup-box">

      <h2>Réserver trajet 🚗</h2>

      <input v-model="reservation.nom" placeholder="Nom" />
      <input v-model="reservation.prenom" placeholder="Prénom" />
      <input v-model="reservation.telephone" placeholder="Téléphone" />

      <button @click="validerReservation">Valider</button>
      <button class="close" @click="showPopup = false">Fermer</button>

    </div>

  </div>

</template> 

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const goHome = () => {
  window.location.href = "/"
}


const promoRef = ref(null)



// recherche
const recherche = ref({
  depart: "",
  arrivee: "",
  date: ""
})

// data
const trajets = ref([])
const resultats = ref([])

//  évite affichage message direct
const hasSearched = ref(false)

//  popup
const showPopup = ref(false)
const trajetSelectionne = ref(null)

const reservation = ref({
  nom: "",
  prenom: "",
  telephone: ""
})

//  récupérer trajets depuis API
onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/trajets")
  trajets.value = res.data
})

//  rechercher 
const rechercher = () => {
  hasSearched.value = true

  const aujourdHui = new Date()
  aujourdHui.setHours(0,0,0,0)

  resultats.value = trajets.value.filter((t) => {

    const departMatch =
      !recherche.value.depart ||
      t.depart.toLowerCase().includes(recherche.value.depart.toLowerCase())

    const arriveeMatch =
      !recherche.value.arrivee ||
      t.arrivee.toLowerCase().includes(recherche.value.arrivee.toLowerCase())

    const dateTrajet = new Date(t.date)
    dateTrajet.setHours(0,0,0,0)

    const annee = dateTrajet.getFullYear()
    const mois = String(dateTrajet.getMonth() + 1).padStart(2, "0")
    const jour = String(dateTrajet.getDate()).padStart(2, "0")
    const dateFormatee = `${annee}-${mois}-${jour}`

    const dateMatch =
      !recherche.value.date || dateFormatee === recherche.value.date

 
    const futur = dateTrajet >= aujourdHui

    return departMatch && arriveeMatch && dateMatch && futur
  })
  setTimeout(() => {
  const section = document.getElementById("trajets")
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}, 200)
}
const formatDate = (d) => {
  return new Date(d).toLocaleDateString()
}

const formatHeure = (h) => {
  if (!h) return "Heure non définie"
  return String(h).slice(0, 5)
}

// ouvrir popup
const ouvrirReservation = (trajet) => {
  trajetSelectionne.value = trajet
  showPopup.value = true
}

//  valider réservation
const validerReservation = async () => {

  if (!reservation.value.nom) {
    alert("Remplis les champs")
    return
  }

  try {
    await axios.put(
      `http://localhost:3000/api/trajets/reserver/${trajetSelectionne.value.id}`
    )

    alert("Réservation confirmée 🎉")

    showPopup.value = false

    // recharge les trajets
    const res = await axios.get("http://localhost:3000/api/trajets")
    trajets.value = res.data

  } catch (err) {
    alert(err.response?.data?.message || "Erreur")
  }
}

</script>
<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: none !important;
}
.home-btn {
  position: absolute;
  top: 20px;
  left: 20px;

  background: white;
  color: #2563eb;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;

  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.home-btn:hover {
  background: #2563eb;
  color: white;
}

.container {
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  text-align: center;
  color: white;

  /* 🔥 IMAGE BACKGROUND */
  background: linear-gradient(
      rgba(0,0,0,0.4),
      rgba(0,0,0,0.5)
    ),
    url("/bg.jpg");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;   
  top: 0;
  left: 0;
}



.form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
}

.form input {
  padding: 12px;
  border-radius: 10px;
  border: none;
}

button {
  padding: 12px 20px;
  background: #2563eb;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: scale(1.05);
}

.liste {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.card {
  background: rgba(255,255,255,0.9);
  color: black;
  padding: 25px;
  border-radius: 20px;
  width: 250px;
  transition: 0.3s;
  backdrop-filter: blur(10px);
 
}

.card:hover {
  transform: translateY(-10px);
}

.empty {
  margin-top: 40px;
  font-size: 18px;
}
.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card-content {
  padding: 15px;
}

/* popup */
.popup {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-box {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 300px;
}

.popup-box input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}

.close {
  background: red;
}

.promo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  margin: 30px 0;
  padding: 20px;

  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;

}

/* IMAGE ANIMÉE */
.promo-img img {
  width: 180px;
  border-radius: 15px;

  animation: zoom 5s infinite alternate;
}

/* TEXTE */
.promo-text {
  color: white;
  max-width: 300px;
}

/* ✨ ANIMATION */
@keyframes zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.08);
  }
}
.promo-img img {
  position: relative;
  overflow: hidden;
}

.promo-img img::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,0.4),
    transparent
  );
  animation: shine 3s infinite;
}

@keyframes shine {
  100% {
    left: 100%;
  }
}

</style>