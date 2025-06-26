let currentLang = 'en';

async function loadResume(lang) {
  currentLang = lang;
  const showPhoto = document.getElementById('togglePhoto').checked;
  const res = await fetch(`resume/${lang}.json`);
  const data = await res.json();

  document.getElementById('header').innerHTML = `
    <h1>${data.name}</h1>
    <h3>${data.title}</h3>
  `;

  if (showPhoto && data.photo) {
    document.getElementById('photoContainer').innerHTML = `<img src="${data.photo}" alt="Profile Photo">`;
  } else {
    document.getElementById('photoContainer').innerHTML = '';
  }

  document.getElementById('contact').innerHTML = `
    <h2>${data.labels.contact}</h2>
    <p>${data.contact.email}</p>
    <p>${data.contact.phone}</p>
    <p><a href="${data.contact.linkedin}" target="_blank">LinkedIn</a></p>
  `;

  document.getElementById('summary').innerHTML = `
    <h2>${data.labels.profile}</h2>
    <p>${data.summary}</p>
  `;

  document.getElementById('skills').innerHTML = `
    <h2>${data.labels.skills}</h2>
    <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
  `;

  document.getElementById('languages').innerHTML = `
    <h2>${data.labels.languages}</h2>
    <ul>${data.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
  `;

  document.getElementById('interests').innerHTML = `
    <h2>${data.labels.interests}</h2>
    <ul>${data.interests.map(interest => `<li>${interest}</li>`).join('')}</ul>
  `;

  document.getElementById('experience').innerHTML = `
    <h2>${data.labels.experience}</h2>
    ${data.experience.map(exp => `
      <div>
        <strong>${exp.position}</strong> - ${exp.company}<br>
        <em>${exp.start} - ${exp.end}</em>
        <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>`).join('')}
  `;

  document.getElementById('education').innerHTML = `
    <h2>${data.labels.education}</h2>
    ${data.education.map(ed => `<p><strong>${ed.degree}</strong> - ${ed.school} (${ed.year})</p>`).join('')}
  `;
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