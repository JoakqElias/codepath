<script setup>
const steps = [
  { number: '01', icon: 'auto_stories', title: 'Aprender', text: 'Recorré cinco unidades de JavaScript con lecciones breves, ejemplos y actividades. También podés explorar otras tecnologías.' },
  { number: '02', icon: 'code', title: 'Practicar', text: 'Probá actividades introductorias de cada tecnología y recibí una corrección con su explicación al instante.' },
  { number: '03', icon: 'trending_up', title: 'Progresar', text: 'Aprobá las lecciones de JavaScript y desbloqueá nuevas unidades. El avance se mantiene al navegar y se reinicia al recargar.' }
]
</script>

<template>
  <q-page tabindex="-1" class="page-bg">
    <section class="hero container">
      <div class="hero-copy">
        <span class="welcome-badge"><span aria-hidden="true">✦</span> Un comienzo para tus ideas</span>
        <p class="eyebrow hero-name">APRENDÉ CON CODEPATH</p>
        <h1>Aprendé a programar,<br /><span>paso a paso</span></h1>
        <p class="lead">Un camino para quienes empiezan de cero. Explorá diferentes tecnologías y descubrí una propuesta de aprendizaje con lecciones cortas y dificultad progresiva.</p>
        <q-btn unelevated no-caps color="primary" class="hero-cta" label="Explorar cursos y tutoriales" icon-right="arrow_forward" to="/cursos" />
        <p class="hero-note"><q-icon name="explore" size="18px" aria-hidden="true" /> JavaScript con cinco unidades. Prácticas en nueve tecnologías.</p>
      </div>
      <div class="hero-visual" aria-label="Ilustración de una primera página web">
        <div class="visual-orbit orbit-one" aria-hidden="true"></div><div class="visual-orbit orbit-two" aria-hidden="true"></div>
        <div class="floating-label"><q-icon name="lightbulb_outline" color="dark" size="19px" aria-hidden="true" /> Toda idea empieza con un paso</div>
        <div class="code-window">
          <div class="code-titlebar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>mi-primera-pagina.html</span><q-icon name="code" size="19px" aria-hidden="true" /></div>
          <div class="code-body"><span class="code-comment">&lt;!-- Tu camino empieza acá --&gt;</span>
            <pre><code><span class="code-tag">&lt;h1&gt;</span>¡Hola, mundo!<span class="code-tag">&lt;/h1&gt;</span>

<span class="code-tag">&lt;p&gt;</span>
  Una idea.
  Un nuevo desafío.
  Tu primera página.
<span class="code-tag">&lt;/p&gt;</span></code></pre>
          </div>
          <div class="code-preview"><span class="preview-label">VISTA PREVIA · EJEMPLO ILUSTRATIVO</span><strong>¡Hola, mundo! <span aria-hidden="true">✦</span></strong><span>Una idea. Un nuevo desafío. Tu primera página.</span></div>
        </div>
        <div class="visual-caption"><span class="mini-symbol" aria-hidden="true">&lt;/&gt;</span><div><strong>No hace falta saber por dónde empezar.</strong><span>Para eso estamos construyendo CodePath.</span></div></div>
      </div>
    </section>
    <section class="journey-section" aria-labelledby="journey-title">
      <div class="container">
        <div class="section-heading"><div><span class="eyebrow section-kicker">UN PASO A LA VEZ</span><h2 id="journey-title">Un recorrido pensado para vos</h2></div><span class="planned-label"><q-icon name="construction" size="17px" aria-hidden="true" /> En construcción</span></div>
        <p class="section-intro">Empezá el recorrido inicial de JavaScript o descubrí una tecnología con sus prácticas introductorias.</p>
        <div class="steps-grid">
          <q-card v-for="item in steps" :key="item.number" flat bordered class="step-card">
            <div class="step-top"><span class="step-icon"><q-icon :name="item.icon" size="27px" aria-hidden="true" /></span><span class="step-number" aria-hidden="true">{{ item.number }}</span></div>
            <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
          </q-card>
        </div>
        <div class="discover-banner"><div><span class="eyebrow">MUCHOS TEMAS. UN PRIMER PASO.</span><h2>Descubrí qué te gustaría crear</h2><p>HTML, CSS, JavaScript, Vue.js, React, SQL, PHP, Java y Node.js.</p></div><q-btn outline no-caps color="primary" label="Ver el catálogo" icon-right="arrow_forward" to="/cursos" /></div>
      </div>
    </section>
  </q-page>
</template>
