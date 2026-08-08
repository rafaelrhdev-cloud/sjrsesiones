(function(){
  // ---------- Datos de ejemplo (prototipo) ----------
  const CATEGORY_LABELS = {
    "general":"Medicina general", "cardiologia":"Cardiología", "pediatria":"Pediatría",
    "dermatologia":"Dermatología", "ortopedia":"Ortopedia", "oftalmologia":"Oftalmología",
    "odontologia":"Odontología", "ginecologia":"Ginecología",
    "psico-clinica":"Psicología clínica", "psico-infantil":"Psicología infantil",
    "psiquiatria":"Psiquiatría", "terapia-pareja":"Terapia de pareja"
  };
  const MENTAL_GROUP = ["psico-clinica","psico-infantil","psiquiatria","terapia-pareja"];
  const GRADIENTS = [
    "linear-gradient(150deg,#EAF0EC, var(--musgo) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--coral) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--petroleo) 140%)",
    "linear-gradient(150deg,#EAF0EC, var(--amber) 140%)"
  ];

  const doctors = [
    {name:"Dr. Mauricio Elizondo", category:"general", city:"CDMX", rating:4.8, sponsored:true, avail:"Disponible"},
    {name:"Dra. Fernanda Ibarra", category:"general", city:"Puebla", rating:4.6, sponsored:false, avail:"Disponible"},
    {name:"Dr. Samuel Quezada", category:"general", city:"En línea", rating:4.5, sponsored:false, avail:"Agenda esta semana"},

    {name:"Dr. Andrés Beltrán", category:"cardiologia", city:"Monterrey", rating:4.8, sponsored:true, avail:"Agenda esta semana"},
    {name:"Dra. Lucía Paredes", category:"cardiologia", city:"CDMX", rating:4.7, sponsored:false, avail:"Disponible"},

    {name:"Dra. Valeria Nuño", category:"pediatria", city:"Querétaro", rating:4.9, sponsored:true, avail:"Disponible"},
    {name:"Dr. Sebastián Rojo", category:"pediatria", city:"Guadalajara", rating:4.6, sponsored:false, avail:"Disponible"},

    {name:"Dr. Rodrigo Villaseñor", category:"dermatologia", city:"CDMX", rating:4.7, sponsored:true, avail:"Disponible"},
    {name:"Dra. Ximena Corral", category:"dermatologia", city:"Mérida", rating:4.5, sponsored:false, avail:"Agenda esta semana"},

    {name:"Dr. Tomás Ferreira", category:"ortopedia", city:"Monterrey", rating:4.6, sponsored:false, avail:"Disponible"},
    {name:"Dra. Paola Guzmán", category:"ortopedia", city:"CDMX", rating:4.4, sponsored:false, avail:"Disponible"},

    {name:"Dra. Marcela Trejo", category:"oftalmologia", city:"Puebla", rating:4.7, sponsored:false, avail:"Disponible"},
    {name:"Dr. Emilio Nava", category:"oftalmologia", city:"En línea", rating:4.5, sponsored:false, avail:"Agenda esta semana"},

    {name:"Dra. Ana Bustamante", category:"odontologia", city:"CDMX", rating:4.8, sponsored:true, avail:"Disponible"},
    {name:"Dr. Héctor Salinas", category:"odontologia", city:"Toluca", rating:4.5, sponsored:false, avail:"Disponible"},

    {name:"Dra. Isabel Montano", category:"ginecologia", city:"Guadalajara", rating:4.8, sponsored:true, avail:"Disponible"},
    {name:"Dra. Carla Reséndiz", category:"ginecologia", city:"CDMX", rating:4.6, sponsored:false, avail:"Agenda esta semana"},

    {name:"Lic. Diego Márquez", category:"psico-clinica", city:"En línea", rating:5.0, sponsored:true, avail:"Disponible"},
    {name:"Lic. Iván Cárdenas", category:"psico-clinica", city:"En línea", rating:4.6, sponsored:false, avail:"Disponible"},
    {name:"Lic. Sofía Bravo", category:"psico-clinica", city:"CDMX", rating:4.5, sponsored:false, avail:"Agenda esta semana"},

    {name:"Lic. Natalia Ochoa", category:"psico-infantil", city:"Querétaro", rating:4.9, sponsored:true, avail:"Disponible"},
    {name:"Lic. Bruno Cetina", category:"psico-infantil", city:"En línea", rating:4.6, sponsored:false, avail:"Disponible"},

    {name:"Dra. Camila Rueda", category:"psiquiatria", city:"CDMX", rating:4.9, sponsored:true, avail:"Disponible"},
    {name:"Dra. Renata Solís", category:"psiquiatria", city:"Guadalajara", rating:4.7, sponsored:false, avail:"Disponible"},
    {name:"Dr. Emiliano Cabral", category:"psiquiatria", city:"En línea", rating:4.5, sponsored:false, avail:"Agenda esta semana"},

    {name:"Lic. Daniela Puente", category:"terapia-pareja", city:"En línea", rating:4.8, sponsored:true, avail:"Disponible"},
    {name:"Lic. Gabriel Ontiveros", category:"terapia-pareja", city:"Monterrey", rating:4.5, sponsored:false, avail:"Disponible"}
  ];

  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

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
    let catOk = true;
    if(currentFilter === 'todas'){ catOk = true; }
    else if(currentFilter === 'grupo:salud-mental'){ catOk = MENTAL_GROUP.includes(doc.category); }
    else { catOk = doc.category === currentFilter; }

    let textOk = true;
    if(currentQuery){
      const q = norm(currentQuery);
      textOk = norm(doc.name).includes(q) || norm(CATEGORY_LABELS[doc.category]).includes(q);
    }
    let cityOk = true;
    if(currentCity){
      cityOk = norm(doc.city).includes(norm(currentCity));
    }
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
        const card = document.createElement('div');
        card.className = 'pro-card';
        card.style.animationDelay = (i * 0.03) + 's';
        card.innerHTML = `
          <div class="pro-photo" style="background:${GRADIENTS[i % GRADIENTS.length]}">
            ${doc.sponsored ? '<span class="sponsor-tag">Patrocinado</span>' : ''}
          </div>
          <div class="pro-body">
            <div class="pro-name">${doc.name}</div>
            <div class="pro-spec">${CATEGORY_LABELS[doc.category]} · <span class="pro-city">${doc.city}</span></div>
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
      let label = 'Todas las categorías';
      if(currentFilter === 'grupo:salud-mental') label = 'Psicología';
      else if(CATEGORY_LABELS[currentFilter]) label = CATEGORY_LABELS[currentFilter];

      eyebrow.textContent = 'Resultados filtrados';
      title.textContent = (currentQuery ? `Resultados para “${currentQuery}”` : label) + ` (${count})`;
      desc.textContent = 'Los patrocinados aparecen primero; después, el resto de profesionales verificados en esta categoría.';

      let barText = 'Filtrando por: ' + label;
      if(currentQuery) barText += ` · texto “${currentQuery}”`;
      if(currentCity) barText += ` · ciudad “${currentCity}”`;
      filterBarText.textContent = barText;
      filterBar.classList.add('show');
    }

    // Marcar categoría seleccionada visualmente
    document.querySelectorAll('.cat-card').forEach(c=>{
      c.classList.toggle('selected', c.dataset.filter === currentFilter);
    });
    document.querySelectorAll('#quick-pills .pill').forEach(p=>{
      p.classList.toggle('active', p.dataset.filter === currentFilter);
    });
  }

  function setFilter(f, scroll){
    currentFilter = f;
    render();
    if(scroll){ document.getElementById('resultados').scrollIntoView({behavior:'smooth', block:'nearest'}); }
  }

  // Pills del hero
  document.querySelectorAll('#quick-pills .pill').forEach(btn=>{
    btn.addEventListener('click', ()=> setFilter(btn.dataset.filter, true));
  });

  // Tarjetas de categoría
  document.querySelectorAll('.cat-card').forEach(btn=>{
    btn.addEventListener('click', ()=> setFilter(btn.dataset.filter, true));
  });

  // "Ver todos los resultados"
  document.getElementById('btn-ver-todo').addEventListener('click', ()=>{
    currentQuery=''; currentCity='';
    document.getElementById('search-text').value='';
    document.getElementById('search-city').value='';
    setFilter('todas', true);
  });

  // Quitar filtro (barra activa)
  document.getElementById('filter-bar-clear').addEventListener('click', ()=>{
    currentQuery=''; currentCity='';
    document.getElementById('search-text').value='';
    document.getElementById('search-city').value='';
    setFilter('todas', false);
  });

  // Buscador del hero
  document.getElementById('btn-search').addEventListener('click', ()=>{
    currentQuery = document.getElementById('search-text').value.trim();
    currentCity = document.getElementById('search-city').value.trim();
    render();
    document.getElementById('resultados').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
  ['search-text','search-city'].forEach(id=>{
    document.getElementById(id).addEventListener('keydown', e=>{
      if(e.key === 'Enter'){ document.getElementById('btn-search').click(); }
    });
  });

  render();
})();
