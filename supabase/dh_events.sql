-- dominikheilig.com — eine anhängende Ereignistabelle, sonst nichts.
-- Einmal im eigenen Supabase-Projekt der Seite ausführen (SQL Editor).
--
-- Was hier NICHT steht, ist der Punkt: keine IP, kein User-Agent, kein
-- Pfad mit Parametern, keine Kennung, die zwei Besuche verbindet. Die
-- Seite schreibt nichts auf das Gerät des Besuchers (siehe lib/analytics.ts),
-- deshalb braucht sie keine Einwilligung — und deshalb muss jede Spalte
-- hier für sich genommen harmlos sein.

create table if not exists dh_events (
  id bigint generated always as identity primary key,

  -- Feste Liste, keine Freitexte.
  type text not null check (type in ('pageview', 'duration', 'filter', 'outbound')),

  -- Zufällige Kennung je SEITENAUFRUF, nur in einer JS-Variablen gehalten.
  -- Sie verbindet Ereignisse innerhalb eines Besuchs und sonst nichts:
  -- ein Neuladen ist bauartbedingt ein neuer Besuch.
  session_id text,

  -- Nicht umkehrbarer sha256 aus IP + User-Agent + Tagesdatum. Er dient nur
  -- der Näherung „wie viele Menschen", rotiert um Mitternacht UTC und ist
  -- nirgends in die IP zurückzurechnen. Die rohe IP wird für genau diesen
  -- einen Hash gelesen und danach verworfen.
  visitor_id text,

  -- Welche Fläche: 'home' | 'about' | 'project' | 'privacy'.
  page text,

  -- Bei 'project' das Kürzel des Projekts, bei 'filter' die Richtung,
  -- bei 'outbound' das Ziel ('github' | 'linkedin' | 'visit'). Immer eine
  -- Kategorie aus einer bekannten Menge, nie ein freier Wert.
  label text,

  -- Nur bei 'duration': ganze Sekunden sichtbarer Zeit auf einer Fläche.
  seconds integer,

  -- Nur der verweisende Hostname ("google.com"), nie die volle Adresse.
  -- null heißt: direkt aufgerufen, Lesezeichen, oder Sprung innerhalb der Seite.
  referrer text,

  -- Zweibuchstabiges Land aus Vercels Edge-Geolocation. Die IP wird dafür
  -- am Rand ausgewertet und erreicht unseren Code nie.
  country text,

  -- 'mobile' | 'tablet' | 'desktop', am Server aus dem User-Agent abgeleitet.
  -- Die volle Zeichenkette wird nie gespeichert.
  device text,

  -- Zwei Buchstaben aus dem Accept-Language-Kopf, den der Browser ohnehin
  -- mitschickt. Bewusst nicht über navigator.language abgefragt: eine Abfrage
  -- am Gerät wäre der einwilligungspflichtige Zugriff, ein mitgelieferter
  -- Kopf ist es nicht. Nur die Hauptsprache — die Reihenfolge des vollen
  -- Kopfes ist ein Wiedererkennungsmerkmal, die zwei Buchstaben sind es nicht.
  language text,

  created_at timestamptz not null default now()
);

-- Abfragen der Übersicht laufen immer über Zeit, oft gefiltert nach Art.
create index if not exists dh_events_created_at_idx on dh_events (created_at desc);
create index if not exists dh_events_type_created_idx on dh_events (type, created_at desc);

-- RLS an, keine Regeln: damit kommt ausschließlich der Service-Role-Schlüssel
-- an die Tabelle, und der liegt nur serverseitig. Der anon-Schlüssel, der im
-- Browser landen könnte, sieht nichts.
alter table dh_events enable row level security;

-- Aufbewahrung: Zeilen älter als 400 Tage löschen. Als geplante Aufgabe
-- einrichten (Supabase → Database → Cron), oder von Hand ausführen.
--   delete from dh_events where created_at < now() - interval '400 days';
