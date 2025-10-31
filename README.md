# 🔥 ProfessionalWeld - Strona Firmy Spawalniczej

Profesjonalna strona internetowa dla firmy świadczącej usługi spawalnicze. Projekt stworzony w oparciu o nowoczesne technologie webowe z fokusem na responsywność i user experience.

## 🚀 Demo

Strona dostępna pod adresem: [https://username.github.io/company-site.github.io](https://username.github.io/company-site.github.io)

## 🎯 Funkcjonalności

### ✨ Główne sekcje:
- **Hero Section** - Atrakcyjna sekcja powitalna z animacjami
- **O nas** - Prezentacja firmy i wartości
- **Usługi** - Szczegółowy opis oferowanych usług spawalniczych
- **Portfolio** - Galeria zrealizowanych projektów z filtrowaniem
- **Kalkulator wyceny** - Interaktywny kalkulator kosztów spawania
- **Opinie klientów** - Prezentacja opinii z Google Reviews
- **Kontakt** - Formularz kontaktowy z integracją Google Maps

### 🔧 Zaawansowane funkcje:
- **Responsive Design** - Pełna kompatybilność z urządzeniami mobilnymi
- **Smooth Scroll Navigation** - Płynna nawigacja między sekcjami
- **Lightbox Gallery** - Elegancka galeria zdjęć z powiększaniem
- **Email Integration** - Automatyczne wysyłanie formularzy przez EmailJS
- **Google Maps** - Interaktywna mapa z lokalizacją firmy
- **SEO Optimized** - Optymalizacja dla wyszukiwarek
- **Performance** - Zoptymalizowana wydajność i szybkość ładowania

## 🛠️ Technologie

### Frontend:
- **HTML5** - Semantyczna struktura strony
- **CSS3** - Zaawansowane stylowanie z CSS Grid i Flexbox
- **JavaScript ES6+** - Nowoczesny JavaScript z modułami
- **Font Awesome** - Ikony
- **Google Fonts** - Typografia (Inter)

### Integracje:
- **Google Maps API** - Mapa lokalizacji
- **EmailJS** - Wysyłanie formularzy kontaktowych
- **Google Reviews API** - Pobieranie opinii klientów

### Hosting:
- **GitHub Pages** - Darmowy hosting statyczny

## 📁 Struktura projektu

```
company-site.github.io/
├── index.html              # Strona główna
├── css/
│   ├── styles.css          # Główne style
│   └── responsive.css      # Style responsywne
├── js/
│   ├── main.js            # Główna logika
│   ├── calculator.js      # Kalkulator wyceny
│   ├── maps.js           # Integracja Google Maps
│   └── contact.js        # Formularz kontaktowy
├── images/
│   ├── gallery/          # Zdjęcia portfolio
│   ├── company/          # Zdjęcia firmy
│   └── icons/            # Ikony i logo
├── data/
│   └── reviews.json      # Dane opinii klientów
├── info.txt              # Kontekst projektu
└── README.md             # Dokumentacja
```

## 🚀 Instalacja i uruchomienie

### Wymagania:
- Przeglądarka internetowa
- Serwer lokalny (opcjonalnie)
- Klucze API Google Maps i EmailJS

### Kroki instalacji:

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/username/company-site.github.io.git
   cd company-site.github.io
   ```

2. **Konfiguracja API:**
   
   **Google Maps API:**
   - Uzyskaj klucz API na [Google Cloud Console](https://console.cloud.google.com/)
   - Zamień `YOUR_API_KEY` w `index.html` na swój klucz
   
   **EmailJS:**
   - Zarejestruj się na [EmailJS.com](https://www.emailjs.com/)
   - Skonfiguruj usługę email i szablon
   - Zaktualizuj konfigurację w `js/contact.js`

3. **Uruchomienie lokalnie:**
   
   **Opcja A - Python (proste):**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Opcja B - Node.js:**
   ```bash
   npx http-server
   ```
   
   **Opcja C - PHP:**
   ```bash
   php -S localhost:8000
   ```

4. **Otwórz w przeglądarce:**
   ```
   http://localhost:8000
   ```

## ⚙️ Konfiguracja

### 1. Dane firmy
Edytuj dane kontaktowe w następujących plikach:
- `index.html` - Podstawowe informacje
- `js/maps.js` - Lokalizacja na mapie
- `js/contact.js` - Konfiguracja EmailJS

### 2. Portfolio
Dodaj zdjęcia do galerii:
- Umieść pliki w folderze `images/gallery/`
- Zaktualizuj dane w `js/main.js` (sekcja portfolio)

### 3. Opinie klientów
Zaktualizuj opinie w pliku `data/reviews.json`

### 4. Kolory i branding
Dostosuj kolory w `css/styles.css`:
```css
:root {
    --primary-color: #ff6b35;    /* Kolor główny */
    --secondary-color: #2c3e50;  /* Kolor pomocniczy */
    --accent-color: #f39c12;     /* Kolor akcentujący */
}
```

## 📱 Responsywność

Strona jest w pełni responsywna i testowana na:
- **Desktop** - 1920px+
- **Laptop** - 1024-1919px
- **Tablet** - 768-1023px
- **Mobile** - 320-767px

## 🔧 Kalkulator spawalniczy

### Funkcje:
- Wycena na podstawie rodzaju spawania (TIG, MIG/MAG)
- Kalkulacja kosztów materiałów
- Uwzględnienie stopnia skomplikowania
- Predefiniowane projekty (balustrady, bramy, konstrukcje)
- Walidacja danych wejściowych

### Stawki (można dostosować w `js/calculator.js`):
- Spawanie TIG: 80 zł/h
- Spawanie MIG/MAG: 60 zł/h
- Konstrukcje stalowe: 70 zł/h
- Balustrady: 65 zł/h
- Naprawy: 75 zł/h

## 📧 Formularz kontaktowy

### Funkcje:
- Walidacja w czasie rzeczywistym
- Integracja z EmailJS
- Automatyczne odpowiedzi
- Zabezpieczenie przed spamem
- Powiadomienia o statusie wysyłki

### Pola formularza:
- Imię i nazwisko (wymagane)
- Email (wymagane)
- Telefon (opcjonalne)
- Rodzaj usługi
- Wiadomość (wymagane)
- Zgoda na przetwarzanie danych (wymagane)

## 🗺️ Integracja Google Maps

### Funkcje:
- Interaktywna mapa z lokalizacją firmy
- Niestandardowy marker
- Okno informacyjne z danymi kontaktowymi
- Przycisk "Wyznacz trasę"
- Funkcja udostępniania lokalizacji
- Fallback dla przypadku braku API

## 📊 SEO i Performance

### Optymalizacje SEO:
- Semantyczne tagi HTML5
- Meta tagi dla social media
- Struktura nagłówków H1-H6
- Alt teksty dla obrazów
- Schema.org markup (można dodać)

### Performance:
- Lazy loading obrazów
- Minifikacja CSS i JS
- Optymalizacja obrazów
- CDN dla bibliotek zewnętrznych
- Gzip compression (konfiguracja serwera)

## 🔒 Bezpieczeństwo

### Zabezpieczenia:
- Walidacja po stronie klienta i serwera
- Sanityzacja danych wejściowych
- Zabezpieczenie przed XSS
- HTTPS (GitHub Pages)
- Polityka prywatności RODO

## 🧪 Testowanie

### Browser Support:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Testowanie responsywności:
```bash
# Użyj narzędzi deweloperskich przeglądarki
# Lub narzędzi online jak:
# - ResponsiveDesignChecker.com
# - BrowserStack.com
```

## 🚀 Deployment

### GitHub Pages:
1. Przejdź do ustawień repozytorium
2. Sekcja "Pages"
3. Wybierz źródło: "Deploy from a branch"
4. Branch: "main"
5. Folder: "/ (root)"

### Własny hosting:
1. Skopiuj pliki na serwer
2. Skonfiguruj serwer web (Apache/Nginx)
3. Włącz HTTPS
4. Skonfiguruj kompresję GZIP

## 🔄 Aktualizacje

### Regularne aktualizacje:
- [ ] Portfolio - nowe realizacje
- [ ] Opinie klientów
- [ ] Ceny w kalkulatorze
- [ ] Dane kontaktowe
- [ ] Treści SEO

### Planowane funkcje:
- [ ] Blog firmowy
- [ ] System rezerwacji terminów
- [ ] Panel administracyjny
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] Wielojęzyczność

## 📞 Wsparcie

### Kontakt z deweloperem:
- **Email:** support@softwareone.pl
- **Phone:** +48 123 456 789
- **GitHub:** [@developer](https://github.com/developer)

### Zgłaszanie błędów:
Użyj GitHub Issues z tagami:
- `bug` - błędy
- `enhancement` - ulepszenia
- `question` - pytania

## 📄 Licencja

Ten projekt jest licencjonowany na licencji MIT. Zobacz plik [LICENSE](LICENSE) dla szczegółów.

---

### ⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę na GitHub!

**Wykonane przez:** [Software One](https://github.com/softwareone)  
**Data utworzenia:** Październik 2025  
**Wersja:** 1.0.0
Messing with GitHub Copilot part 2
