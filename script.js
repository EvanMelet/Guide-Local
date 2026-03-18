// Données des lieux
const lieux = [
  { nom: "Campus Universitaire", coords: [-18.910, 47.530] },
  { nom: "Centre Hospitalier",   coords: [-18.920, 47.540] },
  { nom: "Marché principal",     coords: [-18.905, 47.545] }
];

// Initialiser la carte
const map = L.map('map').setView([-18.9137, 47.5361], 13);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajouter les marqueurs
lieux.forEach(lieu => {
  L.marker(lieu.coords)
    .addTo(map)
    .bindPopup(`<strong>${lieu.nom}</strong>`);
});

// Recherche
document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  lieux.forEach(lieu => {
    if (lieu.nom.toLowerCase().includes(query)) {
      map.flyTo(lieu.coords, 15);
    }
  });
});

// Clic sur les cartes populaires
document.querySelectorAll('.lieu-card').forEach(card => {
  card.addEventListener('click', () => {
    const index = card.getAttribute('data-index');
    const lieu = lieux[index];
    map.flyTo(lieu.coords, 15);
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
  });
});
