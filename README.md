# Manuale operativo CEPC

Archivio web statico per consultare e stampare schede operative CEPC, con focus iniziale sulle schede di pulizia e manutenzione delle attrezzature.

Il progetto e pensato per uso rapido da desktop e mobile: una home operativa permette di cercare e aprire le schede, mentre il viewer integrato mantiene indice, anteprima e stampa nello stesso flusso. L'app include anche manifest e service worker per comportamento PWA e consultazione piu robusta dopo il primo caricamento.

## Struttura generale

```text
.
├── index.html                  # Home, navigazione, viewer iframe, ricerca e stampa
├── pulizie/                    # Schede HTML standalone della categoria Pulizia
├── sw.js                       # Service worker e cache dei file principali
├── manifest.webmanifest        # Metadati PWA
├── icon.svg                    # Icona applicazione
├── maskable-icon.svg           # Icona PWA maskable
├── logo-dark.html              # Variante logo su fondo scuro
├── logo-light.html             # Variante logo su fondo chiaro
├── formatoschede.md            # Contratto tecnico/visivo per creare nuove schede
├── tests/                      # Test Node e controlli visuali
└── openspec/                   # Specifiche e change proposal di progetto
```

## Funzionalita principali

- Home mobile-first con accesso rapido alla categoria `Pulizia`.
- Ricerca per numero o titolo scheda.
- Indice laterale su desktop e menu scorrevole su mobile.
- Viewer iframe per aprire le schede senza lasciare il manuale.
- Pulsanti di stampa integrati nel viewer e nelle schede.
- Stampa ottimizzata per desktop e mobile, con layout fisso leggibile anche quando il browser omette gli sfondi.
- Service worker con precache delle schede disponibili.

## Schede operative

Le schede si trovano in `pulizie/` e sono file HTML standalone. Ogni scheda contiene CSS e contenuto propri, cosi puo essere aperta direttamente nel browser oppure caricata dentro `index.html`.

Il formato canonico e documentato in `formatoschede.md`. Quando si aggiunge una scheda nuova, aggiornare anche:

- array `sheets` in `index.html`;
- lista `PRECACHE_URLS` in `sw.js`, se la scheda deve essere disponibile in cache;
- eventuali test o controlli se cambia struttura.

## Uso locale

Il progetto non richiede build. Si puo aprire direttamente `index.html` nel browser.

Per testare correttamente service worker, manifest e cache PWA e preferibile servirlo da un server locale, per esempio:

```bash
python -m http.server 8000
```

Poi aprire:

```text
http://localhost:8000
```

## Test

I test principali sono script Node senza framework esterno:

```bash
node tests/home-experience.test.js
node tests/sheet-layout.test.js
```

`tests/visual-home-check.js` usa Playwright e richiede la dipendenza disponibile nell'ambiente locale.

## Note tecniche

- UI principale, routing interno e stampa sono in `index.html`.
- Le schede non usano JavaScript proprio: i controlli mobile/stampa vengono iniettati dal viewer.
- Le immagini procedurali sono in genere incorporate nelle schede come data URI o mantenute come asset locali stabili.
- La larghezza stampa e normalizzata a 720px, con card interna da 680px, per produrre output coerente tra desktop e mobile.
