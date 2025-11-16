window.MENARA_ARTICLES = [
  {
    id: 1,
    slug: 'too-big-to-fail',
    title: "L'Egypte, que reste-t-il du \"too big to fail\" ?",
    excerpt: 'Transmission entre endettement public et performance économique dans la région MENA.',
    category: null,
    categoryLabel: '',
    author: 'Yasmine Guemmaz',
    date: 'Mars 2025',
    cover: 'assets/articles/images/too-big-to-fail.jpg',
    pdf: 'assets/articles/pdf/too-big-to-fail.pdf',
    featured: true
  },
  {
    id: 2,
    slug: 'protectionnisme-afrique',
    title: 'Retour du protectionnisme : quelles perspectives pour l\'Afrique ?',
    excerpt: 'Défis des économies africaines.',
    category: null,
    categoryLabel: '',
    author: 'Yasmine Guemmaz',
    date: 'Avril 2025',
    cover: 'assets/articles/images/protectionnisme-afrique.jpg',
    pdf: 'assets/articles/pdf/protectionnisme-afrique.pdf',
    featured: true
  },
  {
    id: 3,
    slug: 'france-maroc-algerie',
    title: 'France-Maroc-Algérie, une histoire d’alliances et de rivalités au prisme des tensions géopolitiques et économiques actuelles',
    excerpt: '',
    category: 'governance',
    categoryLabel: 'Gouvernance',
    author: 'Vincent Plantevin',
    date: 'Mai 2025',
    cover: 'assets/articles/images/france-maroc-algérie.jpg',
    pdf: 'assets/articles/pdf/france-maroc-algérie.pdf'
  },
  {
    id: 4,
    slug: 'raffinerie-dangote',
    title: 'Raffinerie Dangote : un catalyseur d\'industrialisation au coeur des défis nigérians',
    excerpt: '',
    category: 'Industrie',
    categoryLabel: 'Industrie',
    author: 'Adnane Belfami',
    date: 'Juin 2025',
    cover: 'assets/articles/images/raffinerie-dangote.jpg',
    pdf: 'assets/articles/pdf/raffinerie-dangote.pdf'
  },
  {
    id: 5,
    slug: 'sidi-ould-tah',
    title: 'Redéfinir le développement africain : les quatre chantiers de Sidi Ould Tah, nouveau président de la Banque africaine de développement',
    excerpt: '',
    category: 'Gouvernance',
    categoryLabel: 'Gouvernance',
    author: 'Yasmine Guemmaz et Vincent Plantevin',
    date: 'Juin 2025',
    cover: 'assets/articles/images/sidi-ould-tah.jpg',
    pdf: 'assets/articles/pdf/sidi-ould-tah.pdf'
  },
  {
    id: 6,
    slug: 'reconstruction-syrie',
    title: 'La Syrie, sur le chemin de la reconstruction ?',
    excerpt: '',
    category: 'Gouvernance',
    categoryLabel: 'Gouvernance',
    author: 'Grégoire Descamps',
    date: 'Mai 2025',
    cover: 'assets/articles/images/reconstruction-syrie.jpg',
    pdf: 'assets/articles/pdf/reconstruction-syrie.pdf'
  },
  {
    id: 7,
    slug: 'entretien-daher',
    title: 'La Syrie: sur le chemin de la reconstruction économique, dans l\'impasse de la transition politique',
    excerpt: '',
    category: 'Gouvernance',
    categoryLabel: 'Gouvernance',
    author: 'Vincent Plantevin',
    date: 'Juin 2025',
    cover: 'assets/articles/images/entretien-daher.png',
    pdf: 'assets/articles/pdf/entretien-daher.pdf'
  },
  {
    id: 8,
    slug: 'afrique-inde',
    title: 'L\'Afrique et l\'Inde : vers un nouveau partenariat stratégique ?',
    excerpt: '',
    category: 'Gouvernance',
    categoryLabel: 'Gouvernance',
    author: 'Vincent Plantevin et Romain Pretto',
    date: 'Novembre 2025',
    cover: 'assets/articles/images/inde-afrique.jpg',
    pdf: 'assets/articles/pdf/afrique-inde.pdf'
  }
];

(function(){
  function byDataset(selector, value){
    return Array.from(document.querySelectorAll(selector)).filter(el => el.dataset.populate === value);
  }
  function cardHTML(a){
    const img = a.cover || (window.ImageGenerator ? ImageGenerator.getArticleImage(a.category, a.title) : '');
    const link = `article.html?slug=${encodeURIComponent(a.slug)}`;
    const excerpt = a.excerpt ? `<p class="article-card-excerpt">${a.excerpt}</p>` : '';
    const metaItems = [
      a.author ? `<span class="article-card-author">${a.author}</span>` : '',
      a.date ? `<span class="article-card-date">${a.date}</span>` : ''
    ].filter(Boolean).join('');
    const meta = metaItems ? `<div class="article-card-meta">${metaItems}</div>` : '';
    return `
      <article class="article-card">
        <a class="article-card-link" href="${link}" aria-label="Lire l'article : ${a.title}">
          <div class="article-card-image">
            <img src="${img}" alt="${a.title}" loading="lazy" />
          </div>
          <div class="article-card-body">
            <h3 class="article-card-title">${a.title}</h3>
            ${excerpt}
            <span class="article-card-cta">Voir l'article</span>
            ${meta}
          </div>
        </a>
      </article>`;
  }
  function populate(){
    const data = (window.MENARA_ARTICLES||[]);
    byDataset('[data-populate]','detailed').forEach(el=>{
      el.innerHTML = data.map(cardHTML).join('');
    });
    // Carrousels: split in chunks of ~3 per slide
    const perSlide = 3;
    const chunks = [];
    for (let i=0;i<data.length;i+=perSlide) chunks.push(data.slice(i,i+perSlide));
    const slides = byDataset('[data-populate]','carousel');
    slides.forEach((grid, idx)=>{
      const items = chunks[idx] || [];
      grid.innerHTML = items.map(cardHTML).join('');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', populate); else populate();
})();

if (typeof window !== 'undefined') {
  window.dispatchEvent(new CustomEvent('menara:articles-ready', {
    detail: window.MENARA_ARTICLES
  }));
}
