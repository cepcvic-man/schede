# Manuale Pulizie CEPC

Cartella isolata per generare un manuale PDF A4 dalle schede HTML esistenti.

## File

- `build-manuale.js` legge `../index.html` e le schede in `../pulizie/`.
- `manuale.css` contiene layout editoriale, regole Paged.js e stile stampa.
- `dist/manuale-pulizie.html` e l'output generato.

## Generazione

```bash
node manuale-pulizie/build-manuale.js
```

## Anteprima

Servire il progetto da root, poi aprire:

```text
http://localhost:8000/manuale-pulizie/dist/manuale-pulizie.html
```

Il file include Paged.js da CDN:

```text
https://unpkg.com/pagedjs/dist/paged.polyfill.js
```

Se Paged.js non carica, il documento resta comunque stampabile dal browser, ma senza preview paginata avanzata.

## Export PDF

Aprire la pagina in browser e usare stampa/salva PDF dopo che Paged.js ha completato la paginazione.

Impostazioni di stampa richieste, come da documentazione Paged.js:

- destinazione: salva come PDF;
- margini: nessuno;
- intestazioni e pie di pagina browser: disattivati;
- grafica di sfondo: attiva.

Formato previsto: A4 verticale.

## Note Paged.js

Paged.js richiede un web server per accedere correttamente a CSS e risorse. Evitare l'apertura diretta con `file://` quando si controlla la paginazione.

Il polyfill viene caricato nel documento con:

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
```

La CLI ufficiale alternativa e:

```bash
pagedjs-cli manuale-pulizie/dist/manuale-pulizie.html -o manuale-pulizie/dist/manuale-pulizie.pdf
```
