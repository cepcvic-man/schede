const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(__dirname, 'dist');
const assetsDir = path.join(__dirname, 'assets');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const sheetsBlock = indexHtml.match(/const sheets = \[([\s\S]*?)\];/);
if (!sheetsBlock) {
  throw new Error('Impossibile trovare array sheets in index.html');
}

const sheets = [...sheetsBlock[1].matchAll(/\{number:(\d+),title:'([^']+)',file:'([^']+)'\}/g)]
  .map(match => ({
    number: Number(match[1]),
    title: match[2],
    file: match[3]
  }))
  .sort((a, b) => a.number - b.number);

function writeManualImage(sheetNumber, imageIndex, mime, base64) {
  fs.mkdirSync(assetsDir, { recursive: true });
  const extension = mime === 'jpeg' ? 'jpg' : mime;
  const fileName = `scheda-${String(sheetNumber).padStart(2, '0')}-img-${imageIndex}.${extension}`;
  fs.writeFileSync(path.join(assetsDir, fileName), Buffer.from(base64, 'base64'));
  return `../assets/${fileName}`;
}

function externalizeSheetImages(html, sheetNumber) {
  if (![6, 9, 16].includes(sheetNumber)) {
    return html;
  }

  let imageIndex = 0;
  return html.replace(/src="data:image\/(png|jpeg);base64,([^"]+)"/g, (_match, mime, base64) => {
    imageIndex += 1;
    return `src="${writeManualImage(sheetNumber, imageIndex, mime, base64)}"`;
  });
}

function extractSheet(sheet) {
  const file = sheet.file;
  const absolute = path.join(root, file);
  const html = fs.readFileSync(absolute, 'utf8');
  const body = html.match(/<div class="scheda">([\s\S]*?)<\/div>\s*<\/body>/);
  if (!body) {
    throw new Error(`Impossibile estrarre .scheda da ${file}`);
  }

  return externalizeSheetImages(body[1], sheet.number)
    .replace(/src="(?!data:|https?:|\/|\.\.\/)([^"]+)"/g, `src="../${path.dirname(file).replace(/\\/g, '/')}/$1"`)
    .replace(/<div class="scheda-header">([\s\S]*?)<\/div>/, '<div class="scheda-header">$1</div>');
}

function toc(sheets) {
  return sheets.map(sheet => `
    <a class="toc-row" href="#scheda-${sheet.number}-anchor">
      <span class="toc-number">${String(sheet.number).padStart(2, '0')}</span>
      <span class="toc-title">${sheet.title}</span>
    </a>
  `).join('');
}

function sheetPages(sheets) {
  return sheets.map(sheet => `
    <section class="manual-sheet" id="scheda-${sheet.number}" data-sheet-number="${sheet.number}">
      <span class="sheet-anchor" id="scheda-${sheet.number}-anchor"></span>
      <div class="sheet-meta">Scheda ${sheet.number} / Pulizia</div>
      <div class="scheda">
        ${extractSheet(sheet)}
      </div>
    </section>
  `).join('\n');
}

const manualLogo = `<svg class="manual-logo" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" aria-label="CEPC Vicenza" role="img">
        <text x="0" y="48" font-family="Manrope, system-ui, sans-serif" font-weight="700" font-size="44" fill="#102941" textLength="120" lengthAdjust="spacingAndGlyphs">CEPC</text>
        <line x1="0" y1="57" x2="120" y2="57" stroke="#c49a3c" stroke-width="1" opacity="0.8"/>
        <text x="0" y="72" font-family="Manrope, system-ui, sans-serif" font-weight="700" font-size="13" fill="#c49a3c" textLength="120" lengthAdjust="spacing">VICENZA</text>
      </svg>`;

const balanceScript = `<script>
(function(){
  const params = new URLSearchParams(window.location.search);
  const attempt = Number(params.get('balanceAttempt') || '0');
  const notePages = Math.max(1, Math.min(8, Number(params.get('notes') || '1')));

  function notePage(index, total) {
    return '<section class="note-page">' +
      '<p class="chapter-kicker">Note</p>' +
      '<h2>Note operative</h2>' +
      '<p>Pagina ' + index + ' di ' + total + ' per appunti, osservazioni o integrazioni durante formazione e uso sul campo.</p>' +
      '<div class="note-lines"></div>' +
    '</section>';
  }

  function injectNotes(count) {
    const backCover = document.querySelector('.back-cover');
    if (!backCover || document.querySelector('.note-page')) return;
    let html = '';
    for (let i = 1; i <= count; i += 1) html += notePage(i, count);
    backCover.insertAdjacentHTML('beforebegin', html);
  }

  window.PagedConfig = {
    before: function() {
      injectNotes(notePages);
    },
    after: function(flow) {
      const total = flow && flow.total ? flow.total : document.querySelectorAll('.pagedjs_page').length;
      const remainder = total % 4;
      if (remainder !== 0 && attempt < 3) {
        params.set('notes', String(notePages + (4 - remainder)));
        params.set('balanceAttempt', String(attempt + 1));
        window.location.replace(window.location.pathname + '?' + params.toString() + window.location.hash);
      }
    }
  };
})();
</script>`;

const generated = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Manuale operativo CEPC - Pulizia</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&family=Manrope:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../manuale.css">
${balanceScript}
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
</head>
<body>
<main class="manual">
  <section class="cover">
    <div class="cover-mark">
      ${manualLogo}
    </div>
    <div class="cover-main">
      <p class="cover-kicker">Manuale operativo</p>
      <h1>Schede pulizia e manutenzione attrezzature</h1>
      <p class="cover-copy">Procedure sintetiche per consultazione, stampa e formazione interna.</p>
    </div>
    <div class="cover-footer">
      <span>Categoria / Pulizia</span>
      <span>Edizione di lavoro</span>
    </div>
  </section>

  <section class="intro">
    <p class="chapter-kicker">CEPC / Pulizia</p>
    <h2>Consultazione rapida</h2>
    <p>Questo manuale raccoglie le schede operative disponibili nel manuale digitale. Ogni scheda mantiene numerazione, avvertenza di sicurezza, passaggi operativi e indicazioni di stoccaggio.</p>
    <div class="safety-note">
      <strong>Attenzione - Sicurezza</strong>
      <span>Prima di eseguire gli interventi, valutare rischi e condizioni pericolose secondo le procedure interne CEPC.</span>
    </div>
  </section>

  <section class="toc">
    <p class="chapter-kicker">Indice</p>
    <h2>Schede incluse</h2>
    <nav>
      ${toc(sheets)}
    </nav>
  </section>

  ${sheetPages(sheets)}

  <section class="back-cover">
    <div class="back-cover-main">
      ${manualLogo}
      <p class="back-cover-copy">Manuale operativo per consultazione interna, stampa e formazione sulle procedure di pulizia e manutenzione attrezzature.</p>
    </div>
    <div class="back-cover-footer">
      <span>Schede pulizia</span>
      <span>Fine manuale</span>
    </div>
  </section>
</main>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'manuale-pulizie.html'), generated);
console.log(`Manuale generato: ${path.relative(root, path.join(outDir, 'manuale-pulizie.html'))}`);
