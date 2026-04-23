<template>
  <!-- Conteneur principal de la page d'accueil -->
   
  <div class="home">

    <!-- NAVBAR : barre de navigation en haut -->
    <nav class="navbar">
      <!-- Nom du projet -->
      <img src="@/assets/logo.png" class="logo-img" />

      <!-- Liens de navigation vers les différentes pages -->
      <div class="links">
        <!-- router-link permet de naviguer sans recharger la page -->
       
        <router-link to="/trajets">Trajets</router-link>
        <router-link to="/auth">Connexion</router-link>
        <router-link to="/about">À propos</router-link>
      </div>
    </nav>

    <!-- HERO SECTION : section principale (première chose visible) -->
    <section class="hero">

   <div class="bg-image"></div>

  <div class="overlay"></div>
  <div class="hero-content">
    <h2>Voyagez entre étudiants, en toute simplicité. </h2>

    <p>
      Une solution simple pour partager vos trajets avec la communauté EFREI.
    </p>

    <router-link to="/trajets">
      <button>Explorer les trajets</button>
    </router-link>
  </div>

</section>

    <!-- FEATURES : section avec les avantages du service -->
    <section class="features">

      <!-- Carte 1 -->
      <div class="card">
        <h3>💸 Économique</h3>
        <p>Réduisez vos frais de transport.</p>
      </div>

      <!-- Carte 2 -->
      <div class="card">
        <h3>🤝 Communauté</h3>
        <p>Rencontrez d'autres étudiants.</p>
      </div>

      <!-- Carte 3 -->
      <div class="card">
        <h3>⚡ Rapide</h3>
        <p>Réservation en quelques secondes.</p>
      </div>

    </section>

  </div>
</template>

<script setup>
// Partie JavaScript du composant Vue
// Pour l'instant vide car la page est statique (affichage uniquement)
</script>

<style scoped>

/* Style général de la page */


.hero {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow-x: hidden;

}

.bg-image {
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url("/map.png");
  background-size: cover;
  background-position: center;

  filter: brightness(0.9) saturate(1.2);

  z-index: 0;
}

/* overlay bleu */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(37, 99, 235, 0.1);
  z-index: 1;
}

/* contenu */
.hero-content {
  position: relative;
  z-index: 2;
  color: white;
}


  


/* NAVBAR */
.navbar {
  display: flex; 
  justify-content: space-between;
  padding: 20px 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
}

/* Style du logo */
.logo-img {
  height: 60px;
  transition: 0.3s;
}

.logo-img:hover {
  transform: scale(1.05);
}

/* Liens de navigation */
.links a {
  margin-left: 20px;
  text-decoration: none;
  color: #333;
}

/* Effet au survol */
.links a:hover {
  color: #2563eb;
}



/* Titre principal */
.hero h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

/* Texte sous le titre */
.hero p {
  color: #555;
  margin-bottom: 20px;
}

/* Bouton */
button {
  padding: 12px 20px;
  background: #2563eb;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
}

/* Effet hover bouton */
button:hover {
  background: #1e40af;
}

/* SECTION FEATURES */
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 60px;
}


/* Cartes */
.card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  width: 220px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
color: #111;

}
.card h3 {
  color: #2563eb; /* bleu stylé */
  font-weight: 600;
}
.card p {
  color: #444;
}
.home {
    width: 100vw;
  min-height: 100vh;
    background: radial-gradient(circle at top, #1e3a8a, #020617);
}
.home::before {
  content: "";
  position: fixed;
  width: 600px;
  height: 600px;
  top: -100px;
  left: -100px;

  background: radial-gradient(circle, rgba(37,99,235,0.4), transparent);
  filter: blur(100px);

  z-index: -1;
}
.home::after {
  content: "";
  position: fixed;
  width: 500px;
  height: 500px;
  bottom: -100px;
  right: -100px;

  background: radial-gradient(circle, rgba(96,165,250,0.3), transparent);
  filter: blur(120px);

  z-index: -1;
}
.card {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.9);
}





</style>