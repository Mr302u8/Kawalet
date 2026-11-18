# Kawalet — strona na telefon (aplikacja w Bluefy)

Plik: `index.html` (jeden plik, bez zależności). Działa w trybie **symulacji** bez sprzętu (do testów w Chrome/Safari na komputerze) i w trybie **Bluetooth** w przeglądarce **Bluefy** (iPhone). Safari na iPhonie nie obsługuje Web Bluetooth.

## Funkcje
- **Sterowanie:** pole jazdy na żywo (przesuwanie palcem w lewo/prawo, puszczenie = stop; wysyła `JOG` co 100 ms), HOME, Ustaw A/B, Idź do A/B, STOP, E-STOP, suwaki prędkości (1–22) i rampy (0–100 %), pasek pozycji A→B.
- **Krzywa:** edytor na cały ekran: oś pozioma = czas ruchu (w %), pionowa = położenie od A (dół) do B (góra). Dotknięcie pustego miejsca = nowy punkt; dotknięcie punktu = uchwyty Béziera (kwadraty) do ustawiania ramp; „Gładki" = symetryczne uchwyty; „Usuń punkt"; gotowe układy (A→B, A→B→A, zygzak); zapis krzywych w telefonie; czas ruchu w sekundach.
- **Wysyłanie:** „Wyślij do Kawaleta" wgrywa krzywą (`CURVE BEGIN`, `K …`, `CURVE END`), „Start" dodatkowo wysyła `CURVE RUN` (dziś Teensy odpowiada, że ruch po krzywej nie jest włączony; strona pokazuje komunikat).
- **Motywy kolorów (przycisk 🎨 w nagłówku):** Szkło (domyślny, ciemne szkło z pomarańczowym akcentem), Jasny, Warsztat (czerń z bursztynem, duży kontrast), Morski. Wybór zapamiętuje się w telefonie. Kolory zdefiniowane są jako zmienne CSS na początku pliku (`:root` i `html[data-theme=…]`); można dopisać własny motyw.
- **Bezpieczeństwo strony:** po ukryciu strony wysyła `STOP`; `PING` co sekundę (bez niego Teensy nie rozsyła statusu).

## Użycie
1. Otwórz stronę w **Bluefy**: https://mr302u8.github.io/Kawalet/ (opublikowana 18.11.2026 na GitHub Pages, repozytorium publiczne `Kawalet`; zawiera tylko plik `index.html`).
2. „Połącz" → wybierz moduł (nazwa np. „AT-09", „HMSoft", „BT05").
3. Status w nagłówku: tryb, stan (`IDLE`, `GOTO`, `JOG`, `HOME`, `ESTOP`, `NOHOME`).

## Test lokalny (bez Bluetootha)
```bash
cd "$HOME/Documents/Claude - Arduino/Kawalet/aplikacja_telefon"
python3 -m http.server 8765 --bind 127.0.0.1
# otwórz http://127.0.0.1:8765/index.html  (tryb: symulacja)
```

## Protokół
`../dokumentacja/Kawalet_protokol_BLE.md`.

## Aktualizacja opublikowanej strony
Po zmianie `index.html` wgraj go ponownie do repozytorium na GitHubie (Add file > Upload files, nadpisz `index.html`, Commit). Po ok. minucie zmiana jest pod adresem https://mr302u8.github.io/Kawalet/. Pamiętaj, że Bluefy może trzymać starą wersję w pamięci podręcznej (odśwież stronę).
