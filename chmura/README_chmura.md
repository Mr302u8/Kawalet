# Kawalet - zapis krzywych w chmurze (Cloudflare Workers + KV)

1. Cloudflare -> **Workers & Pages** -> **Create** -> **Create Worker** -> nazwa np. `kawalet` -> Deploy -> **Edit code**; wklej zawartosc `worker.js`, **Deploy**.
2. **Storage & Databases -> KV -> Create namespace** (np. `kawalet-krzywe`).
3. W workerze: **Settings -> Bindings -> Add -> KV namespace**; nazwa zmiennej dokladnie **KV**, wybierz namespace z p.2.
4. **Settings -> Variables and Secrets -> Add** -> typ **Secret**, nazwa **KAWALET_PASS**, wartosc = Twoje haslo (wymysl; nie wysylaj go w czacie). Deploy.
5. Adres workera (np. `https://kawalet.TWOJE-KONTO.workers.dev`) podaj w aplikacji; haslo wpisujesz tylko w aplikacji.
