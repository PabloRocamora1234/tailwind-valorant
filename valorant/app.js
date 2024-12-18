const fetchHeroes = () => {
  const heroesContainer = document.querySelector('#heroes');

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/agents');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const heroes = response.data;

      // Limpiar el contenedor antes de agregar contenido
      heroesContainer.innerHTML = '';

      // Iterar sobre los héroes y generar las tarjetas
      heroes.forEach(hero => {
        if (!hero.isPlayableCharacter) return;

        const heroCard = document.createElement('div');
        heroCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300';

        // Imagen del héroe
        const heroImage = document.createElement('img');
        heroImage.src = hero.displayIcon || hero.bustPortrait || '';
        heroImage.alt = hero.displayName;
        heroImage.className = 'w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md mb-4';

        // Nombre del héroe
        const heroName = document.createElement('h3');
        heroName.textContent = hero.displayName;
        heroName.className = 'text-lg font-bold text-gray-200';

        // Enlace a los detalles
        const detailLink = document.createElement('a');
        detailLink.href = `hero.html?id=${hero.uuid}`;
        detailLink.textContent = 'Ver Detalles';
        detailLink.className = 'block mt-2 text-blue-400 hover:underline';

        // Ensamblar la tarjeta
        heroCard.appendChild(heroImage);
        heroCard.appendChild(heroName);
        heroCard.appendChild(detailLink);

        // Agregar al contenedor principal
        heroesContainer.appendChild(heroCard);
      });
    } else if (xhr.readyState === 4) {
      heroesContainer.innerHTML = '<p class="text-red-500">Error al cargar los héroes.</p>';
    }
  };
  xhr.send();
};

// Ejecutar la función si estamos en la página de héroes
if (document.querySelector('#heroes')) {
  fetchHeroes();
}

const fetchAgentDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const agentId = params.get('id');

  if (!agentId) {
    document.querySelector('#heroDetail').textContent = 'No se encontró el agente.';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://valorant-api.com/v1/agents/${agentId}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const agent = response.data;

      const img = document.createElement('img');
      img.src = agent.fullPortrait;
      img.alt = agent.displayName;
      img.className = 'w-64 h-64 mx-auto rounded-lg';

      const name = document.createElement('h2');
      name.textContent = agent.displayName;
      name.className = 'text-3xl text-center mt-4 font-bold';

      const role = document.createElement('p');
      role.textContent = `Rol: ${agent.role?.displayName || 'No especificado'}`;
      role.className = 'text-center mt-2 text-lg';

      const description = document.createElement('p');
      description.textContent = agent.description || 'No hay descripción disponible.';
      description.className = 'text-center mt-2 text-md';

      const abilitiesTitle = document.createElement('h3');
      abilitiesTitle.textContent = 'Habilidades:';
      abilitiesTitle.className = 'text-xl mt-6 font-bold';

      const abilitiesContainer = document.createElement('div');
      abilitiesContainer.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4';

      agent.abilities.forEach(ability => {
        const abilityCard = document.createElement('div');
        abilityCard.className = 'p-4 border border-gray-700 rounded-lg bg-gray-800';

        const abilityIcon = document.createElement('img');
        abilityIcon.src = ability.displayIcon || '';
        abilityIcon.alt = ability.displayName;
        abilityIcon.className = 'w-12 h-12 mx-auto';

        const abilityName = document.createElement('h4');
        abilityName.textContent = ability.displayName;
        abilityName.className = 'text-center mt-2 font-bold';

        const abilityDescription = document.createElement('p');
        abilityDescription.textContent = ability.description;
        abilityDescription.className = 'text-center mt-2 text-sm';

        abilityCard.appendChild(abilityIcon);
        abilityCard.appendChild(abilityName);
        abilityCard.appendChild(abilityDescription);
        abilitiesContainer.appendChild(abilityCard);
      });

      const detailContainer = document.querySelector('#heroDetail');
      detailContainer.appendChild(img);
      detailContainer.appendChild(name);
      detailContainer.appendChild(role);
      detailContainer.appendChild(description);
      detailContainer.appendChild(abilitiesTitle);
      detailContainer.appendChild(abilitiesContainer);
    }
  };
  xhr.send();
};

if (document.querySelector('#container')) {
  fetchHeroes();
} else if (document.querySelector('#heroDetail')) {
  fetchAgentDetails();
}


const fetchMaps = () => {
  const mapsContainer = document.querySelector('#maps');

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/maps');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const maps = response.data;

      // Limpiar el contenedor antes de agregar contenido
      mapsContainer.innerHTML = '';

      // Iterar sobre los mapas y generar las tarjetas
      maps.forEach(map => {
        const mapCard = document.createElement('div');
        mapCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300';

        // Imagen del mapa
        const mapImage = document.createElement('img');
        mapImage.src = map.listViewIcon || map.displayIcon || '';
        mapImage.alt = map.displayName;
        mapImage.className = 'w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md mb-4';

        // Nombre del mapa
        const mapName = document.createElement('h3');
        mapName.textContent = map.displayName;
        mapName.className = 'text-lg font-bold text-gray-200';

        // Enlace a los detalles
        const detailLink = document.createElement('a');
        detailLink.href = `map.html?id=${map.uuid}`;
        detailLink.textContent = 'Ver Detalles';
        detailLink.className = 'block mt-2 text-blue-400 hover:underline';

        // Ensamblar la tarjeta
        mapCard.appendChild(mapImage);
        mapCard.appendChild(mapName);
        mapCard.appendChild(detailLink);

        // Agregar al contenedor principal
        mapsContainer.appendChild(mapCard);
      });
    } else if (xhr.readyState === 4) {
      mapsContainer.innerHTML = '<p class="text-red-500">Error al cargar los mapas.</p>';
    }
  };
  xhr.send();
};

// Ejecutar la función si estamos en la página de mapas
if (document.querySelector('#maps')) {
  fetchMaps();
}

// Ejecutar la función si estamos en la página de mapas
if (document.querySelector('#maps')) {
  fetchMaps();
}

const fetchMapDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const mapId = params.get('id');

  if (!mapId) {
    document.querySelector('#mapDetail').textContent = 'No se encontró el mapa.';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://valorant-api.com/v1/maps/${mapId}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const map = response.data;

      // Contenedor principal
      const container = document.createElement('div');
      container.className = 'p-6';

      // Imagen destacada
      const img = document.createElement('img');
      img.src = map.splash;
      img.alt = map.displayName;
      img.className = 'w-full h-64 object-cover rounded-md mb-6';

      // Título del mapa
      const name = document.createElement('h2');
      name.textContent = map.displayName;
      name.className = 'text-4xl font-bold text-center mb-4';

      // Descripción táctica
      const description = document.createElement('p');
      description.textContent = map.tacticalDescription || 'No hay descripción táctica disponible.';
      description.className = 'text-lg text-center text-gray-400 mb-4';

      // Coordenadas
      const coordinates = document.createElement('p');
      coordinates.textContent = `Coordenadas: ${map.coordinates || 'Desconocidas'}`;
      coordinates.className = 'text-sm text-center text-gray-500 mb-6';

      // Callouts (regiones clave del mapa)
      const calloutsTitle = document.createElement('h3');
      calloutsTitle.textContent = 'Puntos Clave del Mapa';
      calloutsTitle.className = 'text-2xl font-semibold mb-4';

      const calloutsList = document.createElement('ul');
      calloutsList.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

      map.callouts.forEach(callout => {
        const calloutItem = document.createElement('li');
        calloutItem.className = 'p-4 bg-gray-700 rounded-md shadow';

        const regionName = document.createElement('h4');
        regionName.textContent = callout.regionName;
        regionName.className = 'text-lg font-bold text-blue-400';

        const superRegion = document.createElement('p');
        superRegion.textContent = `Super Región: ${callout.superRegionName}`;
        superRegion.className = 'text-sm text-gray-400';

        calloutItem.appendChild(regionName);
        calloutItem.appendChild(superRegion);
        calloutsList.appendChild(calloutItem);
      });

      // Armando el contenido
      container.appendChild(img);
      container.appendChild(name);
      container.appendChild(description);
      container.appendChild(coordinates);
      container.appendChild(calloutsTitle);
      container.appendChild(calloutsList);

      // Agregando todo al contenedor principal
      document.querySelector('#mapDetail').appendChild(container);
    }
  };
  xhr.send();
};

if (document.querySelector('#mapDetail')) {
  fetchMapDetails();
}

// Función para obtener y mostrar las armas
const fetchWeapons = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://valorant-api.com/v1/weapons');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      response.data.forEach((weapon) => {
        const weaponCard = document.createElement('div');
        weaponCard.className = 'bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300'; // Estilo similar al de los héroes y mapas

        // Imagen del arma
        const img = document.createElement('img');
        img.src = weapon.displayIcon;
        img.alt = weapon.displayName;
        img.className = 'w-full h-32 sm:h-40 lg:h-48 object-cover rounded-md mb-4'; // Imagen con un tamaño similar a los héroes y mapas

        // Nombre del arma
        const name = document.createElement('h2');
        name.textContent = weapon.displayName;
        name.className = 'text-lg font-bold text-gray-200'; // Estilo de texto similar

        // Enlace a los detalles
        const link = document.createElement('a');
        link.href = `weapon.html?id=${weapon.uuid}`;
        link.className = 'block mt-2 text-blue-400 hover:underline'; // Estilo de enlace similar
        link.textContent = 'Ver detalles';

        weaponCard.appendChild(img);
        weaponCard.appendChild(name);
        weaponCard.appendChild(link);

        document.querySelector('#weapons').appendChild(weaponCard);
      });
    }
  };
  xhr.send();
};


// Función para obtener y mostrar los detalles de un arma
const fetchWeaponDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const weaponId = params.get('id');

  if (!weaponId) {
    document.querySelector('#weaponDetail').textContent = 'No se encontró el arma.';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://valorant-api.com/v1/weapons/${weaponId}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const weapon = response.data;

      const img = document.createElement('img');
      img.src = weapon.displayIcon;
      img.alt = weapon.displayName;
      img.className = 'w-64 h-64 mx-auto rounded-md shadow-xl';

      const name = document.createElement('h2');
      name.textContent = weapon.displayName;
      name.className = 'text-2xl text-center mt-4 font-bold text-gray-900 dark:text-gray-100';

      const category = document.createElement('p');
      category.textContent = `Categoría: ${weapon.category || 'Desconocida'}`;
      category.className = 'text-center mt-2 text-lg text-gray-700 dark:text-gray-300';

      const stats = document.createElement('div');
      stats.className = 'mt-4 space-y-4';

      const fireRate = document.createElement('p');
      fireRate.textContent = `Cadencia de disparo: ${weapon.weaponStats.fireRate} disparos por segundo`;
      fireRate.className = 'text-gray-700 dark:text-gray-300';

      const magazineSize = document.createElement('p');
      magazineSize.textContent = `Tamaño del cargador: ${weapon.weaponStats.magazineSize} balas`;
      magazineSize.className = 'text-gray-700 dark:text-gray-300';

      const reloadTime = document.createElement('p');
      reloadTime.textContent = `Tiempo de recarga: ${weapon.weaponStats.reloadTimeSeconds} segundos`;
      reloadTime.className = 'text-gray-700 dark:text-gray-300';

      const damageRanges = document.createElement('div');
      damageRanges.className = 'space-y-2';
      weapon.weaponStats.damageRanges.forEach((range) => {
        const damageRange = document.createElement('p');
        damageRange.textContent = `De ${range.rangeStartMeters}m a ${range.rangeEndMeters}m: Headshot: ${range.headDamage} | Cuerpo: ${range.bodyDamage} | Pierna: ${range.legDamage}`;
        damageRange.className = 'text-gray-700 dark:text-gray-300';
        damageRanges.appendChild(damageRange);
      });

      stats.appendChild(fireRate);
      stats.appendChild(magazineSize);
      stats.appendChild(reloadTime);
      stats.appendChild(damageRanges);

      document.querySelector('#weaponDetail').appendChild(img);
      document.querySelector('#weaponDetail').appendChild(name);
      document.querySelector('#weaponDetail').appendChild(category);
      document.querySelector('#weaponDetail').appendChild(stats);
    }
  };
  xhr.send();
};

// Inicialización de las funciones según la página
if (document.querySelector('#weapons')) {
  fetchWeapons();
} else if (document.querySelector('#weaponDetail')) {
  fetchWeaponDetails();
}
