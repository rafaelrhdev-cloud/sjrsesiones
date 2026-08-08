(function(){
  // ---------- Catálogo de categorías ----------
  const CATEGORY_LABELS = {
    "general":"Medicina general", "cardiologia":"Cardiología", "pediatria":"Pediatría",
    "dermatologia":"Dermatología", "ortopedia":"Ortopedia", "oftalmologia":"Oftalmología",
    "odontologia":"Odontología", "ginecologia":"Ginecología",
    "psico-clinica":"Psicología clínica", "psico-infantil":"Psicología infantil",
    "psiquiatria":"Psiquiatría", "terapia-pareja":"Terapia de pareja"
  };

  // Sinónimos/variantes de búsqueda por categoría (ya sin acentos). Esto reemplaza
  // cualquier heurística "difusa" genérica -- solo se compara contra esta lista
  // curada, así que términos de una categoría nunca disparan otra por accidente.
  const SERVICE_KEYWORDS = {
    "general": ["general", "medico", "medicina"],
    "cardiologia": ["cardiologia", "cardiologo", "cardiologa", "corazon"],
    "pediatria": ["pediatria", "pediatra", "nino", "ninos"],
    "dermatologia": ["dermatologia", "dermatologo", "dermatologa", "piel"],
    "ortopedia": ["ortopedia", "ortopedista", "hueso", "huesos", "fractura"],
    "oftalmologia": ["oftalmologia", "oftalmologo", "oftalmologa", "ojos", "vista"],
    "odontologia": ["odontologia", "odontologo", "odontologa", "dentista", "dientes"],
    "ginecologia": ["ginecologia", "ginecologo", "ginecologa"],
    "psico-clinica": ["psicologia", "psicologo", "psicologa", "terapia", "terapeuta"],
    "psico-infantil": ["infantil", "nino", "ninos", "psicologia", "psicologo", "psicologa"],
    "psiquiatria": ["psiquiatria", "psiquiatra"],
    "terapia-pareja": ["pareja", "parejas", "matrimonio", "matrimonial", "terapia"]
  };

  const MODALITY_SJR = "San Juan del Río, Querétaro";
  const MODALITY_ONLINE = "En línea";

  const GRADIENTS = [
    "linear-gradient(150deg,#EAF0EC, var(--musgo) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--coral) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--petroleo) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--amber) 140%)"
  ];

  // ---------- Datos de ejemplo (prototipo) ----------
  // Por ahora solo operamos en San Juan del Río, Qro. y en línea.
  // Un profesional puede tener uno o varios "services" (categorías que atiende)
  // y una o ambas modalidades.
  const doctors = [
    {name:"Dr. Mauricio Elizondo", services:["general"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.8, sponsored:true},
    {name:"Dra. Fernanda Ibarra", services:["general"], modalities:[MODALITY_SJR], rating:4.6, sponsored:false},

    {name:"Dr. Andrés Beltrán", services:["cardiologia"], modalities:[MODALITY_SJR], rating:4.8, sponsored:true},
    {name:"Dra. Lucía Paredes", services:["cardiologia"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.7, sponsored:false},

    {name:"Dra. Valeria Nuño", services:["pediatria"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.9, sponsored:true},
    {name:"Dr. Sebastián Rojo", services:["pediatria"], modalities:[MODALITY_SJR], rating:4.6, sponsored:false},

    {name:"Dr. Rodrigo Villaseñor", services:["dermatologia"], modalities:[MODALITY_SJR], rating:4.7, sponsored:true},
    {name:"Dra. Ximena Corral", services:["dermatologia"], modalities:[MODALITY_ONLINE], rating:4.5, sponsored:false},

    {name:"Dr. Tomás Ferreira", services:["ortopedia"], modalities:[MODALITY_SJR], rating:4.6, sponsored:false},
    {name:"Dra. Paola Guzmán", services:["ortopedia"], modalities:[MODALITY_SJR], rating:4.4, sponsored:false},

    {name:"Dra. Marcela Trejo", services:["oftalmologia"], modalities:[MODALITY_SJR], rating:4.7, sponsored:false},
    {name:"Dr. Emilio Nava", services:["oftalmologia"], modalities:[MODALITY_ONLINE], rating:4.5, sponsored:false},

    {name:"Dra. Ana Bustamante", services:["odontologia"], modalities:[MODALITY_SJR], rating:4.8, sponsored:true},
    {name:"Dr. Héctor Salinas", services:["odontologia"], modalities:[MODALITY_SJR], rating:4.5, sponsored:false},

    {name:"Dra. Isabel Montano", services:["ginecologia"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.8, sponsored:true},
    {name:"Dra. Carla Reséndiz", services:["ginecologia"], modalities:[MODALITY_SJR], rating:4.6, sponsored:false},

    {name:"Lic. Diego Márquez", services:["psico-clinica"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:5.0, sponsored:true},
    {name:"Lic. Iván Cárdenas", services:["psico-clinica","terapia-pareja"], modalities:[MODALITY_ONLINE], rating:4.6, sponsored:false},
    {name:"Lic. Sofía Bravo", services:["psico-clinica"], modalities:[MODALITY_SJR], rating:4.5, sponsored:false},

    {name:"Lic. Natalia Ochoa", services:["psico-infantil","terapia-pareja"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.9, sponsored:true},
    {name:"Lic. Bruno Cetina", services:["psico-infantil"], modalities:[MODALITY_ONLINE], rating:4.6, sponsored:false},

    {name:"Dra. Camila Rueda", services:["psiquiatria"], modalities:[MODALITY_SJR], rating:4.9, sponsored:true},
    {name:"Dra. Renata Solís", services:["psiquiatria"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.7, sponsored:false},
    {name:"Dr. Emiliano Cabral", services:["psiquiatria"], modalities:[MODALITY_ONLINE], rating:4.5, sponsored:false},

    {name:"Lic. Daniela Puente", services:["terapia-pareja"], modalities:[MODALITY_SJR, MODALITY_ONLINE], rating:4.8, sponsored:true},
    {name:"Lic. Gabriel Ontiveros", services:["terapia-pareja","psico-clinica"], modalities:[MODALITY_SJR], rating:4.5, sponsored:false}
  ];

  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  // ¿La palabra de búsqueda aparece (razonablemente) en alguna de las palabras del texto?
  // Solo substring en cualquier dirección -- sin heurísticas de prefijo que puedan
  // confundir palabras distintas (p.ej. "pareja" con "Paredes").
  function wordIn(word, textWords){
    return textWords.some(tw => tw === word || (word.length >= 3 && tw.includes(word)) || (tw.length >= 3 && word.includes(tw)));
  }

  // La búsqueda solo coincide por NOMBRE del profesional o por SERVICIO que ofrece
  // (usando el diccionario curado de sinónimos), nunca combinando ambos de forma difusa.
  function matchesQuery(doc, query){
    const queryWords = norm(query).split(/\s+/).filter(Boolean);
    if(queryWords.length === 0) return true;

    const nameWords = norm(doc.name).split(/\s+/).filter(Boolean);
    const serviceWords = doc.services.flatMap(s => (SERVICE_KEYWORDS[s] || []).concat(norm(CATEGORY_LABELS[s]).split(/\s+/)));

    return queryWords.every(qw => wordIn(qw, nameWords) || wordIn(qw, serviceWords));
  }

  const grid = document.getElementById('resultados-grid');
  const emptyMsg = document.getElementById('resultados-empty');
  const title = document.getElementById('resultados-title');
  const desc = document.getElementById('resultados-desc');
  const eyebrow = document.getElementById('resultados-eyebrow');
  const filterBar = document.getElementById('filter-bar');
  const filterBarText = document.getElementById('filter-bar-text');

  let currentFilter = 'todas';
  let currentQuery = '';
  let currentCity = '';

  function starIcon(){
    return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7L18.2 21 12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6Z"/></svg>';
  }
  function checkIcon(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>';
  }

  function matches(doc){
    const catOk = (currentFilter === 'todas') || doc.services.includes(currentFilter);
    const textOk = !currentQuery || matchesQuery(doc, currentQuery);
    const cityOk = !currentCity || doc.modalities.some(m => norm(m) === norm(currentCity));
    return catOk && textOk && cityOk;
  }

  function render(){
    const results = doctors.filter(matches).sort((a,b)=> (b.sponsored - a.sponsored) || (b.rating - a.rating));
    grid.innerHTML = '';

    if(results.length === 0){
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      results.forEach((doc, i)=>{
        const specLine = doc.services.map(s => CATEGORY_LABELS[s]).join(' · ');
        const modalityLine = doc.modalities.join(' · ');
        const card = document.createElement('div');
        card.className = 'pro-card';
        card.style.animationDelay = (i * 0.03) + 's';
        card.innerHTML = `
          <div class="pro-photo" style="background:${GRADIENTS[i % GRADIENTS.length]}">
            ${doc.sponsored ? '<span class="sponsor-tag">Patrocinado</span>' : ''}
          </div>
          <div class="pro-body">
            <div class="pro-name">${doc.name}</div>
            <div class="pro-spec">${specLine}</div>
            <div class="pro-city">${modalityLine}</div>
            <div class="verified-tag">${checkIcon()}CÉDULA VERIFICADA</div>
            <div class="pro-meta">
              <div class="pro-rating">${starIcon()} ${doc.rating.toFixed(1)}</div>
              <button class="btn btn-agenda">Agenda ya</button>
            </div>
          </div>`;
        grid.appendChild(card);
      });
    }

    // Encabezado dinámico
    const count = results.length;
    if(currentFilter === 'todas' && !currentQuery && !currentCity){
      eyebrow.textContent = 'Posicionamiento prioritario';
      title.textContent = 'Profesionales destacados';
      desc.textContent = 'Los perfiles con suscripción activa aparecen primero, marcados como «patrocinado»; después, el resto de profesionales verificados.';
      filterBar.classList.remove('show');
    } else {
      const label = CATEGORY_LABELS[currentFilter] || 'Todas las categorías';

      eyebrow.textContent = 'Resultados filtrados';
      title.textContent = (currentQuery ? `Resultados para “${currentQuery}”` : label) + ` (${count})`;
      desc.textContent = 'Los patrocinados aparecen primero; después, el resto de profesionales verificados en esta categoría.';

      let barText = 'Filtrando por: ' + label;
      if(currentQuery) barText += ` · texto “${currentQuery}”`;
      if(currentCity) barText += ` · modalidad “${currentCity}”`;
      filterBarText.textContent = barText;
      filterBar.classList.add('show');
    }

    // Marcar el pill de categoría seleccionado
    document.querySelectorAll('#quick-pills .pill').forEach(p=>{
      p.classList.toggle('active', p.dataset.filter === currentFilter);
    });
  }

  function debounce(fn, wait){
    let t;
    return function(...args){
      clearTimeout(t);
      t = setTimeout(()=> fn.apply(this,args), wait);
    };
  }

  function setFilter(f, scroll){
    currentFilter = f;
    render();
    if(scroll){ document.getElementById('resultados').scrollIntoView({behavior:'smooth', block:'nearest'}); }
  }

  // Pills de categoría (bajo la barra de búsqueda)
  document.querySelectorAll('#quick-pills .pill').forEach(btn=>{
    btn.addEventListener('click', ()=> setFilter(btn.dataset.filter, true));
  });

  const elFilterClear = document.getElementById('filter-bar-clear');
  const elSearchText = document.getElementById('search-text');
  const elSearchCity = document.getElementById('search-city');
  const elBtnSearch = document.getElementById('btn-search');
  const elResultados = document.getElementById('resultados');

  function runSearch(scroll){
    currentQuery = elSearchText ? elSearchText.value.trim() : '';
    currentCity = elSearchCity ? elSearchCity.value.trim() : '';
    render();
    if(scroll && elResultados){ elResultados.scrollIntoView({behavior:'smooth', block:'nearest'}); }
  }

  // Quitar filtro (barra activa)
  if(elFilterClear){
    elFilterClear.addEventListener('click', ()=>{
      currentQuery=''; currentCity='';
      if(elSearchText) elSearchText.value='';
      if(elSearchCity) elSearchCity.value='';
      setFilter('todas', false);
    });
  }

  // Buscador del hero: clic explícito
  if(elBtnSearch){
    elBtnSearch.addEventListener('click', ()=> runSearch(true));
  }

  // Búsqueda en vivo mientras se escribe (con pequeño retraso)
  const liveSearch = debounce(()=> runSearch(false), 220);
  if(elSearchText){
    elSearchText.addEventListener('input', liveSearch);
    elSearchText.addEventListener('keydown', e=>{ if(e.key === 'Enter') runSearch(true); });
  }
  if(elSearchCity){
    elSearchCity.addEventListener('change', ()=> runSearch(true));
  }

  render();
})();
