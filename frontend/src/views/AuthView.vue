
<template>
  <div class="auth-container">
    <button class="home-btn" @click="goHome">
  ⬅ Accueil
</button>
<div class="left">
  <img src="@/assets/voiture.png" class="left-img" />
  <div class="fade"></div>
</div>
  <div class="right">
    <div class="card">
      <h2>{{ isLogin ? "Connexion" : "Inscription" }}</h2>

      <form @submit.prevent="handleSubmit">

        <input
          v-if="!isLogin"
          v-model="form.nom"
          type="text"
          placeholder="Nom"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
        />

        <input
          v-model="form.mot_de_passe"
          type="password"
          placeholder="Mot de passe"
        />

        <button type="submit">
          {{ isLogin ? "Se connecter" : "S'inscrire" }}
        </button>
      </form>

      <p @click="isLogin = !isLogin" class="switch">
        {{ isLogin ? "Créer un compte" : "Déjà inscrit ?" }}
      </p>

      <p>{{ message }}</p>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import axios from "axios"

const goHome = () => {
  window.location.href = "/"
} 

const isLogin = ref(true)
const message = ref("")

const form = reactive({
  nom: "",
  email: "",
  mot_de_passe: ""
})

const handleSubmit = async () => {
  try {

    const url = isLogin.value
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register"

    const res = await axios.post(url, form)

    message.value = res.data.message

    if (isLogin.value) {
      localStorage.setItem("user", JSON.stringify(res.data.user))
      window.location.href = "/profil"
    }

  } catch (err) {
    console.error(err)
    message.value = "Erreur serveur"
  }
}
</script>

<style scoped>

/* RESET GLOBAL */
:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100vw;   
  height: 100vh; 
  overflow: hidden; 
  background: #e0f2fe;
}
:global(#app) {
  width: 100vw;
  height: 100vh;
  max-width: none;
}
/* CONTAINER PRINCIPAL */
.auth-container {
  display: flex;
  width: 100vw;   
  height: 100vh;
}
/* IMAGE GAUCHE */


.left {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.left-img {
  width: 100%;   
  height: 100%;

  object-fit: cover;
  object-position: center; 
}


.fade {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%; 
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(224,242,254,0) 0%,
    #e0f2fe 100%
  );
}

/* PARTIE DROITE */
.right {
  flex: 1; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0f2fe;
}

/* CARD */
.card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 320px;
  box-shadow: 0 10px 30px rgba(59,130,246,0.2);
  text-align: center;
}



h2 {
  color: #1e3a8a;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #dbeafe;
  outline: none;
  background: #f8fafc;
  color: #1e293b;
}

input::placeholder {
  color: #94a3b8;
}

input:focus {
  border: 1px solid #3b82f6;
  box-shadow: 0 0 5px rgba(59,130,246,0.3);
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59,130,246,0.4);
}

.switch {
  margin-top: 15px;
  cursor: pointer;
  color: #3b82f6;
}

.switch:hover {
  color: #1d4ed8;
}

p {
  color: #475569;
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
</style>