let currentLang = 'en';

async function loadResume(lang) {
  currentLang = lang;
  const showPhoto = document.getElementById('togglePhoto').checked;
  const res = await fetch(`resume/${lang}.json`);
  const data = await res.json();
  renderResume(data, showPhoto);
}

function renderResume(data, showPhoto) {
  const resume = document.getElementById('resume');
  resume.innerHTML = `
    <div style="display:flex; gap: 20px; align-items:center; margin-bottom: 20px;">
      ${showPhoto && data.photo ? `<img src="${data.photo}" alt="photo">` : ''}
      <div>
        <h1>${data.name}</h1>
        <p>${data.title}</p>
        <p>${data.contact.email} | ${data.contact.phone}</p>
        <a href="${data.contact.linkedin}" target="_blank">LinkedIn</a>
      </div>
    </div>
    <section><h2>Summary</h2><p>${data.summary}</p></section>
    <section><h2>Skills</h2><ul>${data.skills.map(s => `<li>${s}</li>`).join('')}</ul></section>
    <section><h2>Experience</h2>
      ${data.experience.map(e => `
        <div>
          <strong>${e.position}</strong> at ${e.company} (${e.start} - ${e.end})
          <ul>${e.details.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>`).join('')}
    </section>
    <section><h2>Education</h2>
      ${data.education.map(ed => `<p><strong>${ed.degree}</strong> - ${ed.school} (${ed.year})</p>`).join('')}
    </section>
    <section><h2>Interests</h2><p>${data.interests.join(', ')}</p></section>
  `;
}

function exportPDF() {
  const element = document.getElementById('resume');
  const opt = {
    margin: 0.5,
    filename: `resume-${currentLang}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}

document.addEventListener('DOMContentLoaded', () => loadResume('en'));