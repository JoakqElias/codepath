<script setup>
import { computed, ref } from 'vue'
import { getCourses } from '../services/contentRepository.js'
import { profileStats, attemptPassed } from '../domain/profile.js'
import { userProfile, userStats, canSaveProfile, updateIdentity } from '../stores/userProfile.js'
const courses = getCourses()

const name = ref(userProfile.value.name)
const avatar = ref(userProfile.value.avatar)
const saved = ref(false)
const avatars = [{ value: 'code', label: 'Código' }, { value: 'rocket_launch', label: 'Cohete' }, { value: 'pets', label: 'Huella' }, { value: 'psychology', label: 'Ideas' }]
const technologies = computed(() => courses.map(course => ({ ...course, stats: profileStats(userProfile.value.attempts.filter(a => a.courseId === course.id)) })))
const history = computed(() => userProfile.value.attempts.filter(a => a.status !== 'active' && a.answers.length).slice(-8).reverse())
function save () { updateIdentity(name.value, avatar.value); saved.value = true }
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="container profile-container">
      <div class="profile-topline"><span class="eyebrow section-kicker">TU CAMINO EN CODEPATH</span><span class="local-profile-label"><q-icon name="devices" /> Perfil local</span></div>
      <h1>Tu perfil</h1>
      <p class="lead">Cada respuesta cuenta. Mirá lo que aprendiste y elegí tu próximo desafío.</p>
      <q-card flat bordered class="profile-identity">
        <div class="profile-avatar"><q-icon :name="userProfile.avatar" size="42px" /></div>
        <div class="profile-name"><h2>{{ userProfile.name }}</h2><p>{{ userStats.title }} · Nivel {{ userStats.level }}</p></div>
        <q-btn unelevated no-caps color="primary" label="Seguir practicando" icon-right="arrow_forward" to="/cursos" />
        <div class="level-track"><div><strong>{{ userStats.xp }} XP acumulados</strong><span>{{ userStats.nextLevelXp }} XP para el nivel {{ userStats.level + 1 }}</span></div><q-linear-progress rounded size="10px" :value="userStats.levelProgress / 100" color="primary" track-color="grey-3" aria-label="Avance hacia el próximo nivel" /><p>+10 XP por respuesta correcta · Un nivel cada 100 XP</p></div>
      </q-card>
      <div class="profile-stats">
        <q-card flat bordered class="stat-card"><q-icon name="insights" /><span>Habilidad</span><strong data-testid="skill">{{ userStats.skill === null ? 'Sin datos' : userStats.skill + '%' }}</strong><p>{{ userStats.correct }} aciertos de {{ userStats.answered }} respuestas</p></q-card>
        <q-card flat bordered class="stat-card stat-streak"><q-icon name="local_fire_department" /><span>Racha actual</span><strong data-testid="streak">{{ userStats.streak }}</strong><p>Prácticas seguidas con más del 40 %</p></q-card>
        <q-card flat bordered class="stat-card"><q-icon name="emoji_events" /><span>Mejor racha</span><strong>{{ userStats.bestStreak }}</strong><p>{{ userStats.completed }} prácticas terminadas</p></q-card>
      </div>
      <div class="profile-columns">
        <section class="profile-panel" aria-labelledby="skills-title"><h2 id="skills-title">Tus habilidades por tecnología</h2>
          <div v-for="course in technologies" :key="course.id" class="technology-skill"><div><strong>{{ course.name }}</strong><span>{{ course.stats.skill === null ? 'Por descubrir' : course.stats.skill + '%' }}</span></div><q-linear-progress rounded size="7px" :value="(course.stats.skill || 0) / 100" color="primary" track-color="grey-3" :aria-label="course.name + ': ' + (course.stats.skill === null ? 'sin respuestas' : course.stats.skill + '% de aciertos')" /><p>{{ course.stats.correct }} de {{ course.stats.answered }} respuestas correctas</p></div>
        </section>
        <div>
          <section class="profile-panel"><h2>Hacé tuyo el perfil</h2><form @submit.prevent="save">
            <q-input v-model="name" outlined label="Tu nombre" maxlength="30" counter @update:model-value="saved = false" />
            <fieldset class="avatar-picker"><legend>Elegí tu avatar</legend><q-btn v-for="item in avatars" :key="item.value" flat :icon="item.value" :aria-label="item.label" :aria-pressed="avatar === item.value" :class="{ 'avatar-selected': avatar === item.value }" @click="avatar = item.value; saved = false" /></fieldset>
            <q-btn type="submit" unelevated no-caps color="primary" label="Guardar perfil" /><p v-if="saved" role="status" class="profile-save-message">{{ canSaveProfile ? 'Perfil guardado en este navegador.' : 'Perfil actualizado solo durante esta sesión.' }}</p>
          </form></section>
          <section class="profile-panel profile-rules"><h2>Cómo crece tu progreso</h2><p><strong>Habilidad:</strong> aciertos ÷ respuestas × 100. Todos los intentos cuentan: los errores bajan el porcentaje y los aciertos lo recuperan. Es tu precisión en estas prácticas.</p><p><strong>Racha:</strong> terminá con más del 40 % de aciertos para sumar una práctica. Con 4 preguntas necesitás 2; con 3 preguntas introductorias, también 2.</p><p>Si terminás con 40 % o menos, o abandonás después de responder, la racha vuelve a cero. No es una racha por días. Para desbloquear la siguiente lección solo necesitás terminar la anterior. El mejor porcentaje de cada lección se conserva; repetí para llegar al 100 %.</p><p><strong>Nivel:</strong> cada acierto suma 10 XP, incluso al repasar. Los errores no quitan XP.</p></section>
        </div>
      </div>
      <section class="profile-panel"><h2>Últimas prácticas</h2><p v-if="!history.length">Tu historia empieza con la primera práctica. Elegí una tecnología y animate a probar.</p>
        <ul v-else class="profile-history"><li v-for="attempt in history" :key="attempt.id"><q-icon :name="attempt.status === 'abandoned' ? 'pause_circle_outline' : attemptPassed(attempt) ? 'check_circle' : 'replay'" /><div><strong>{{ attempt.title }}</strong><p>{{ attempt.answers.filter(a => a.isCorrect).length }}/{{ attempt.total }} aciertos · {{ attempt.status === 'abandoned' ? 'Interrumpida' : attemptPassed(attempt) ? 'Sumó a la racha' : 'Racha reiniciada' }}</p></div></li></ul>
      </section>
      <p class="profile-storage-note" role="status"><q-icon name="info_outline" /> {{ canSaveProfile ? 'Tu perfil, tus mejores porcentajes y las lecciones terminadas se guardan en este navegador. No hay contraseña ni sincronización entre dispositivos. Borrar los datos del sitio elimina este progreso.' : 'El navegador no permite guardar los datos. Podés practicar, pero tu progreso se perderá al recargar.' }}</p>
    </section>
  </q-page>
</template>
