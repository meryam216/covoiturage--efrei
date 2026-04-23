<template>
  <div class="profil-page">
    <div v-if="!user" class="loading-box">
      <p>Chargement...</p>
    </div>

    <div v-else class="profil-card">
      <!-- PHOTO -->
      <img src="@/assets/logoutil.png" class="avatar" alt="Photo profil" />

      <h1>{{ user.nom }}</h1>
      <p class="email">{{ user.email }}</p>

      <!-- STATS -->
      <div class="stats">
        <div class="stat">
          <h2>{{ mesTrajets.length }}</h2>
          <p>Total</p>
        </div>

        <div class="stat">
          <h2>{{ futurs.length }}</h2>
          <p>À venir</p>
        </div>

        <div class="stat">
          <h2>{{ passes.length }}</h2>
          <p>Passés</p>
        </div>
      </div>

      <!-- FORM -->
      <div class="form">
        <input v-model="form.depart" placeholder="Départ" />
        <input v-model="form.arrivee" placeholder="Arrivée" />
        <input v-model="form.date" type="date" />
          <input v-model="form.heure" type="time" /> 

        <input v-model="form.places" type="number" placeholder="Places" />

        <button class="main-btn" @click="ajouterTrajet">
          {{ editMode ? "Modifier" : "Ajouter" }}
        </button>
      </div>

      <!-- TRAJETS À VENIR -->
      <h3 class="section-title">Trajets à venir</h3>
      <div class="liste">
        <div v-for="t in futurs" :key="t.id" class="card">
          <h4>{{ t.depart }} → {{ t.arrivee }}</h4>
          <p>{{ formatDate(t.date) }}</p>
            <p>{{ formatHeure(t.heure) }}</p>
          <p>{{ t.places }} places</p>

          <div class="actions">
            <button class="icon-btn" @click="editTrajet(t)">✏️</button>
            <button class="icon-btn delete-btn" @click="deleteTrajet(t.id)">❌</button>
          </div>
        </div>
      </div>

      <!-- TRAJETS PASSÉS -->
      <h3 class="section-title">Trajets passés</h3>
      <div class="liste">
        <div v-for="t in passes" :key="t.id" class="card past">
          <h4>{{ t.depart }} → {{ t.arrivee }}</h4>
          <p>{{ formatDate(t.date) }}</p>
            <p>{{ formatHeure(t.heure) }}</p>
          <p>{{ t.places }} places</p>
        </div>
      </div>

      <!-- LOGOUT -->
      <button class="logout" @click="logout">Se déconnecter</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"

const user = ref(null)
const trajets = ref([])

const form = ref({
  depart: "",
  arrivee: "",
  date: "",
  heure:"",
  places: ""
})

const editMode = ref(false)
const editId = ref(null)

onMounted(async () => {
  const data = localStorage.getItem("user")

  if (!data) {
    window.location.href = "/auth"
  } else {
    user.value = JSON.parse(data)
    await loadTrajets()
  }
})

const loadTrajets = async () => {
  const res = await axios.get("http://localhost:3000/api/trajets")
  trajets.value = res.data
}

const mesTrajets = computed(() => {
  if (!user.value) return []
  return trajets.value.filter(t => t.user === user.value.nom)
})

const futurs = computed(() =>
  mesTrajets.value.filter(t => new Date(t.date) >= new Date())
)

const passes = computed(() =>
  mesTrajets.value.filter(t => new Date(t.date) < new Date())
)

const ajouterTrajet = async () => {
  if (!form.value.depart || !form.value.arrivee || !form.value.date) return

  if (editMode.value) {
    await axios.put(`http://localhost:3000/api/trajets/${editId.value}`, form.value)
  } else {
    await axios.post("http://localhost:3000/api/trajets", {
      ...form.value,
      user: user.value.nom
    })
  }

  resetForm()
  await loadTrajets()
}

const editTrajet = (t) => {
 form.value = {
  depart: t.depart,
  arrivee: t.arrivee,
  date: new Date(t.date).toISOString().split("T")[0],
  heure: t.heure || "",   
  places: t.places
}
  editMode.value = true
  editId.value = t.id
}
const formatHeure = (h) => {
  if (!h) return "Heure non définie"
  return String(h).slice(0, 5)
}

const deleteTrajet = async (id) => {
  await axios.delete(`http://localhost:3000/api/trajets/${id}`)
  await loadTrajets()
}

const resetForm = () => {
  form.value = {
    depart: "",
    arrivee: "",
    date: "",
    heure:"",
    places: 1
  }
  editMode.value = false
  editId.value = null
}

const formatDate = (d) => new Date(d).toLocaleDateString()

const logout = () => {
  localStorage.removeItem("user")
  window.location.href = "/auth"
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.profil-page {
  min-height: 100vh;
  width: 100vw;
  padding: 40px 20px;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  background: #0f172a;
  color: white;

  overflow-y: auto;
}

.profil-card {
  width: 100%;
  max-width: 900px;

  background: linear-gradient(180deg, #1d4ed8 0%, #2563eb 100%);
  border-radius: 28px;
  padding: 48px 32px 36px;

  text-align: center;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.avatar {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  display: block;
  margin: 0 auto 20px auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

h1 {
  margin: 0 0 10px;
  font-size: 34px;
  color: white;
}

.email {
  margin: 0 0 28px;
  color: #dbeafe;
  font-size: 16px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.stat {
  min-width: 120px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
}

.stat h2 {
  margin: 0 0 8px;
  font-size: 34px;
  color: white;
}

.stat p {
  margin: 0;
  color: white;
}

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
}

.form input {
  width: 180px;
  padding: 12px 14px;
  border: none;
  border-radius: 14px;
  outline: none;
  background: white;
  font-size: 16px;
}

button {
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}

button:not(.logout) {
  padding: 12px 20px;
  background: #1d4ed8;
  color: white;
  font-weight: 600;
}

.section-title,
h3 {
  margin: 18px 0 14px;
  font-size: 22px;
  color: white;
}

.liste {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.card {
  width: 220px;
  padding: 20px 18px;
  border-radius: 22px;
  background: white;
  color: #111827;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

.card h4 {
  margin: 0 0 10px;
  font-size: 18px;
}

.card p {
  margin: 6px 0;
  font-size: 15px;
}

.past {
  opacity: 0.75;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
}

.actions button {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  padding: 0;
  font-size: 18px;
}

.logout {
  display: block;
  margin: 26px auto 0;
  padding: 14px 22px;
  background: #ef4444;
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.logout:hover {
  background: #dc2626;
}

@media (max-width: 700px) {
  .profil-card {
    padding: 36px 18px 28px;
  }

  .form input {
    width: 100%;
    max-width: 280px;
  }

  .card {
    width: 100%;
    max-width: 280px;
  }
}
</style>