let currentLang = 'fr';

async function loadResume(lang) {
  currentLang = lang;
  const showPhoto = document.getElementById('togglePhoto').checked;
  const res = await fetch(`resume/${lang}.json`);
  const data = await res.json();

  renderHeader(data);

  if (showPhoto && data.photo) {
    document.getElementById('photoContainer').innerHTML = `<div class="profile-pic"><img src="${data.photo}" alt="Profile Photo"></div>`;
  } else {
    document.getElementById('photoContainer').innerHTML = '';
  }

  document.getElementById('summary').innerHTML = `
    <h2>${sectionLabel(data.labels.profile)}</h2>
    <p>${data.summary}</p>
  `;

  renderSkills(data.skills, data.labels.skills);

  renderExperience(data.experience, data.labels.experience);

  renderLanguages('languages', data.labels.languages, data.languages);
  renderTwoColumnList('interests', data.labels.interests, data.interests);

  document.getElementById('education').innerHTML = `
    <h2>${sectionLabel(data.labels.education)}</h2>
    ${data.education.map(ed => `
      <div class="exp-block">
        <div class="exp-position">${ed.degree ? ed.degree.toUpperCase() : ''}</div>
        <div class="exp-meta">
          <span>
            ${ed.school || ''}
            ${ed.url ? `<a href="${ed.url}" target="_blank" rel="noopener" class="web-icon" aria-label="Website"><svg fill="#000000" width="13" height="13" viewBox="0 0 512 512" style="vertical-align:middle;"><path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667  c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146  z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034  C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187  h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306  c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50  H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414  C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404  c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514  H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667  c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z   M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593  C381.469,407.717,366.807,418.738,351.021,427.514z"/></svg></a>` : ''}
          </span>
          ${ed.year ? `<span>| ${ed.year}</span>` : ''}
        </div>
      </div>
    `).join('')}
  `;
}

function renderHeader(data) {
  const headerSection = document.getElementById('header');
  const addressHtml = data.contact.address
    ? `<span>${data.contact.address}</span> <br/>`
    : '';
  const githubHtml = data.contact.github
    ? `<a href="${data.contact.github}" target="_blank" class="github-logo" aria-label="GitHub">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#888" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
        <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.011-1.04-0.017-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495 0.997 0.108-0.775 0.418-1.305 0.762-1.605-2.665-0.305-5.467-1.334-5.467-5.931 0-1.31 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.527 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.291-1.553 3.297-1.23 3.297-1.23 0.653 1.649 0.242 2.873 0.119 3.176 0.77 0.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.372 0.823 1.102 0.823 2.222 0 1.606-0.015 2.898-0.015 3.293 0 0.322 0.216 0.694 0.825 0.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    </a>`
  : '';
  headerSection.innerHTML = `
    <h1 class="name-uppercase">${data.name}</h1>
    <h2>${data.title}</h2>
    <div class="contact-inline">
      ${addressHtml}
      <span>${data.contact.email}</span> |
      <span>${data.contact.phone}</span> |
      <a href="${data.contact.linkedin}" target="_blank" class="linkedin-logo" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#888" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
        </svg>
      </a>
      ${githubHtml}
    </div>
  `;
}

function renderSkills(skills, label) {
  const skillsSection = document.getElementById('skills');
  skillsSection.innerHTML = `<h2>${sectionLabel(label)}</h2>
    <div class="skills-columns">
      <ul>
        ${skills[0].map(skill => `<li>${skill}</li>`).join('')}
      </ul>
      <ul>
        ${skills[1].map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>`;
}

function renderExperience(experiences, label) {
  const expSection = document.getElementById('experience');
  expSection.innerHTML = `
    <h2>${sectionLabel(label)}</h2>
    ${experiences.map(exp => `
      <div class="exp-block">
        <div class="exp-position">${exp.position.toUpperCase()}</div>
        <div class="exp-meta">
          <span>
            ${exp.company}
            ${exp.url ? `<a href="${exp.url}" target="_blank" rel="noopener" class="web-icon" aria-label="Website"><svg fill="#000000" width="13" height="13" viewBox="0 0 512 512" style="vertical-align:middle;"><path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667  c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146  z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034  C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187  h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306  c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50  H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414  C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404  c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514  H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667  c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z   M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593  C381.469,407.717,366.807,418.738,351.021,427.514z"/></svg></a>` : ''}
          </span>
          ${exp.location ? `<span>| ${exp.location}</span>` : ''}
          ${exp.contract ? `<span>| ${exp.contract}</span>` : ''}
          <span>| ${exp.start} - ${exp.end}</span>
        </div>
        <div class="exp-details">
          ${exp.details.map(detail => {
            if (typeof detail === 'string') {
              return `<ul><li>${detail}</li></ul>`;
            } else if (typeof detail === 'object' && detail.title && Array.isArray(detail.items)) {
              return `
                <div class="exp-subsection">
                  <div class="exp-subsection-title">${detail.title}</div>
                  <ul>
                    ${detail.items.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              `;
            }
            return '';
          }).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

function renderLanguages(sectionId, label, languages) {
  const section = document.getElementById(sectionId);
  section.innerHTML = `
    <h2>${sectionLabel(label)}</h2>
    <div>
      ${languages.map(lang => `
        <div class="lang-row">
          <span class="lang-name">${lang.name}</span>
          <span class="lang-level">${lang.level}</span>
          <div class="lang-gauge">
            <div class="lang-gauge-bar" style="width:${lang.percent || 40}%"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTwoColumnList(sectionId, label, items) {
  // If items is an array of arrays (like in fr.json), use as-is, else split into two columns
  let col1 = [], col2 = [];
  if (Array.isArray(items[0])) {
    [col1, col2] = items;
  } else {
    const mid = Math.ceil(items.length / 2);
    col1 = items.slice(0, mid);
    col2 = items.slice(mid);
  }
  document.getElementById(sectionId).innerHTML = `
    <h2>${sectionLabel(label)}</h2>
    <div class="skills-columns">
      <ul>${col1.map(i => `<li>${i}</li>`).join('')}</ul>
      <ul>${col2.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `;
}

function exportPDF() {
  const element = document.querySelector('.main');
  const opt = {
    margin: [0, 0],
    filename: `resume-${currentLang}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] }
  };
  html2pdf().from(element).set(opt).save();
}

// Example for rendering section labels with arrow icon
function sectionLabel(label) {
  return `
    <span class="section-label">${label}</span>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadResume('fr');

  // Add GitHub toggle to hamburger menu
  const menuContent = document.querySelector('.hamburger-menu .menu-content');
  if (menuContent && !document.getElementById('toggleGithub')) {
    const githubToggle = document.createElement('label');
    githubToggle.innerHTML = `<input type="checkbox" id="toggleGithub" checked> Show GitHub link`;
    menuContent.insertBefore(githubToggle, menuContent.querySelector('button[onclick^="exportPDF"]'));

    document.getElementById('toggleGithub').addEventListener('change', function () {
      const githubLink = document.querySelector('.github-logo');
      if (githubLink) {
        githubLink.style.display = this.checked ? '' : 'none';
      }
    });
  }
});