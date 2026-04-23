<template>
  <div class="about-page">
    <section class="hero">
      <h1>À propos de nous</h1>

      <p class="desc">
        Je m'appelle <strong>Meriem Tih</strong>, étudiante en ingénierie à l’EFREI Paris.
        Ce projet de covoiturage a été réalisé dans le cadre de ma formation en développement web.
      </p>

      <div class="profile-card">
        <img src="@/assets/logoutil.png" alt="Photo profil" class="profile-img" />

        <h2>Meriem Tih</h2>
        <p class="subtitle">Étudiante ingénieure • EFREI Paris</p>

        <div class="skills">
          <span>Vue.js</span>
          <span>Frontend</span>
          <span>Backend</span>
          <span>SQL</span>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>Notre mission</h2>
      <p>
        EfreiRide est une plateforme de covoiturage pensée pour les étudiants.
        L’objectif est de faciliter les déplacements, réduire les coûts de transport
        et encourager une mobilité plus simple, pratique et conviviale.
      </p>
    </section>

    <section class="info-grid">
      <div class="info-card">
        <h3>Trajets simples</h3>
        <p>Publiez et recherchez rapidement un trajet adapté à vos besoins.</p>
      </div>

      <div class="info-card">
        <h3>Communauté étudiante</h3>
        <p>Voyagez avec d’autres étudiants dans un cadre plus rassurant et familier.</p>
      </div>

      <div class="info-card">
        <h3>Réservation facile</h3>
        <p>Réservez une place en quelques clics avec une interface claire et intuitive.</p>
      </div>
    </section>

    <section class="contact-section">
      <h2>Contactez-nous</h2>
      <p>
        Une question sur le site, une réservation ou le fonctionnement du covoiturage ?
        Vous pouvez nous contacter directement.
      </p>

      <div class="contact-card">
        <p><strong>Email :</strong> meriem.tih@efrei.net</p>
        <p><strong>École :</strong> EFREI Paris</p>
        <p><strong>Projet :</strong> Plateforme de covoiturage étudiant</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.about-page {
  min-height: 100vh;

  width: 100vw;        
  margin: 0;
  padding: 60px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;

  background: linear-gradient(180deg, #0f172a, #1e3a8a);

  overflow-x: hidden; 
}

.hero {
  max-width: 900px;
  margin: 0 auto 60px;
  text-align: center;
}

.hero h1 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 24px;
}

.desc {
  max-width: 760px;
  margin: 0 auto 40px;
  font-size: 22px;
  line-height: 1.7;
  color: #dbeafe;
}

.profile-card {
  max-width: 380px;
  margin: 0 auto;
  padding: 32px 24px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.profile-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  margin-bottom: 18px;
}

.profile-card h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitle {
  color: #dbeafe;
  margin-bottom: 22px;
  font-size: 18px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.skills span {
  background: rgba(255, 255, 255, 0.18);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 14px;
}

.info-section,
.contact-section {
  max-width: 900px;
  margin: 0 auto 50px;
  text-align: center;
}

.info-section h2,
.contact-section h2 {
  font-size: 34px;
  margin-bottom: 18px;
}

.info-section p,
.contact-section p {
  font-size: 18px;
  line-height: 1.7;
  color: #dbeafe;
}

.info-grid {
  max-width: 1100px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.info-card {
  padding: 26px 22px;
  border-radius: 22px;
  background: white;
  color: #0f172a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
}

.info-card h3 {
  margin-bottom: 12px;
  font-size: 22px;
  color: #1d4ed8;
}

.info-card p {
  line-height: 1.6;
}

.contact-card {
  max-width: 520px;
  margin: 24px auto 0;
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
}

.contact-card p {
  margin: 10px 0;
  color: white;
}

@media (max-width: 900px) {
  .hero h1 {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>