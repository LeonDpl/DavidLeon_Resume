let currentLang = 'en';

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
    <h2>${data.labels.profile}</h2>
    <p>${data.summary}</p>
  `;

  renderSkills(data.skills, data.labels.skills);

  document.getElementById('experience').innerHTML = `
    <h2>${data.labels.experience}</h2>
    ${data.experience.map(exp => `
      <div>
        <strong>${exp.position}</strong> - ${exp.company}<br>
        <em>${exp.start} - ${exp.end}</em>
        <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>`).join('')}
  `;
  
  document.getElementById('languages').innerHTML = `
    <h2>${data.labels.languages}</h2>
    <ul>${data.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
  `;

  document.getElementById('interests').innerHTML = `
    <h2>${data.labels.interests}</h2>
    <ul>${data.interests.map(interest => `<li>${interest}</li>`).join('')}</ul>
  `;

  document.getElementById('education').innerHTML = `
    <h2>${data.labels.education}</h2>
    ${data.education.map(ed => `<p><strong>${ed.degree}</strong> - ${ed.school} (${ed.year})</p>`).join('')}
  `;
}

function renderHeader(data) {
  const headerSection = document.getElementById('header');
  headerSection.innerHTML = `
    <h1 class="name-uppercase">${data.name}</h1>
    <h2>${data.title}</h2>
    <div class="contact-inline">
      <span>${data.contact.email}</span> |
      <span>${data.contact.phone}</span> |
      <a href="${data.contact.linkedin}" target="_blank" class="linkedin-logo" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#888" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
        </svg>
      </a>
    </div>
  `;
}

function renderSkills(skills, label) {
  const skillsSection = document.getElementById('skills');
  skillsSection.innerHTML = `<h2>${label}</h2>
    <div class="skills-columns">
      <ul>
        ${skills[0].map(skill => `<li>${skill}</li>`).join('')}
      </ul>
      <ul>
        ${skills[1].map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>`;
}

function exportPDF() {
  const element = document.querySelector('.main');
  const opt = {
    margin: 0.2,
    filename: `resume-${currentLang}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

document.addEventListener('DOMContentLoaded', () => loadResume('en'));