import { useState, useRef, useEffect } from "react";
import {
  US, FR, DE, ES, IN, CN, JP, RU, IT, BR, SA, KR, TR, IR, PK, BD,
  CA, MX, ZA, NG, AR, CL, CO, EG, ID, TH, VN, IL, PL, NL, SE, NO,
  FI, DK, GR, PT, BE, CH, AT, CZ, HU, RO, UA, SK, HR, RS, BG
} from "country-flag-icons/react/3x2";

interface CountryType {
  code: string;
  name: string;
  Flag: React.ComponentType<any>;
  langCode: string;
}

const countries: CountryType[] = [
  { code: "US", name: "English", Flag: US, langCode: "en" },
  { code: "FR", name: "Français", Flag: FR, langCode: "fr" },
  { code: "DE", name: "Deutsch", Flag: DE, langCode: "de" },
  { code: "ES", name: "Español", Flag: ES, langCode: "es" },
  { code: "IN", name: "हिन्दी", Flag: IN, langCode: "hi" },
  { code: "CN", name: "中文 (Chinese)", Flag: CN, langCode: "zh-CN" },
  { code: "JP", name: "日本語 (Japanese)", Flag: JP, langCode: "ja" },
  { code: "RU", name: "Русский", Flag: RU, langCode: "ru" },
  { code: "IT", name: "Italiano", Flag: IT, langCode: "it" },
  { code: "BR", name: "Português (Brasil)", Flag: BR, langCode: "pt" },
  { code: "SA", name: "العربية", Flag: SA, langCode: "ar" },
  { code: "KR", name: "한국어", Flag: KR, langCode: "ko" },
  { code: "TR", name: "Türkçe", Flag: TR, langCode: "tr" },
  { code: "IR", name: "فارسی", Flag: IR, langCode: "fa" },
  { code: "PK", name: "اردو", Flag: PK, langCode: "ur" },
  { code: "BD", name: "বাংলা", Flag: BD, langCode: "bn" },
  { code: "CA", name: "Français (Canada)", Flag: CA, langCode: "fr" },
  { code: "MX", name: "Español (México)", Flag: MX, langCode: "es" },
  { code: "ZA", name: "Afrikaans", Flag: ZA, langCode: "af" },
  { code: "NG", name: "Yorùbá", Flag: NG, langCode: "yo" },
  { code: "AR", name: "Español (Argentina)", Flag: AR, langCode: "es" },
  { code: "CL", name: "Español (Chile)", Flag: CL, langCode: "es" },
  { code: "CO", name: "Español (Colombia)", Flag: CO, langCode: "es" },
  { code: "EG", name: "العربية (Egypt)", Flag: EG, langCode: "ar" },
  { code: "ID", name: "Bahasa Indonesia", Flag: ID, langCode: "id" },
  { code: "TH", name: "ไทย", Flag: TH, langCode: "th" },
  { code: "VN", name: "Tiếng Việt", Flag: VN, langCode: "vi" },
  { code: "IL", name: "עברית", Flag: IL, langCode: "iw" },
  { code: "PL", name: "Polski", Flag: PL, langCode: "pl" },
  { code: "NL", name: "Nederlands", Flag: NL, langCode: "nl" },
  { code: "SE", name: "Svenska", Flag: SE, langCode: "sv" },
  { code: "NO", name: "Norsk", Flag: NO, langCode: "no" },
  { code: "FI", name: "Suomi", Flag: FI, langCode: "fi" },
  { code: "DK", name: "Dansk", Flag: DK, langCode: "da" },
  { code: "GR", name: "Ελληνικά", Flag: GR, langCode: "el" },
  { code: "PT", name: "Português", Flag: PT, langCode: "pt" },
  { code: "BE", name: "Nederlands (Belgium)", Flag: BE, langCode: "nl" },
  { code: "CH", name: "Deutsch (Swiss)", Flag: CH, langCode: "de" },
  { code: "AT", name: "Deutsch (Austria)", Flag: AT, langCode: "de" },
  { code: "CZ", name: "Čeština", Flag: CZ, langCode: "cs" },
  { code: "HU", name: "Magyar", Flag: HU, langCode: "hu" },
  { code: "RO", name: "Română", Flag: RO, langCode: "ro" },
  { code: "UA", name: "Українська", Flag: UA, langCode: "uk" },
  { code: "SK", name: "Slovenčina", Flag: SK, langCode: "sk" },
  { code: "HR", name: "Hrvatski", Flag: HR, langCode: "hr" },
  { code: "RS", name: "Српски", Flag: RS, langCode: "sr" },
  { code: "BG", name: "Български", Flag: BG, langCode: "bg" },
];

const LanguageSelector = () => {
  const [selected, setSelected] = useState<CountryType>(countries[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Load Google Translate Script
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false as any },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Change Language
  const changeLanguage = (country: CountryType) => {
    setSelected(country);
    setOpen(false);

    const applyLanguage = () => {
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (combo) {
        combo.value = country.langCode;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }
      return false;
    };

    let tries = 0;
    const interval = setInterval(() => {
      tries++;
      if (applyLanguage() || tries > 20) clearInterval(interval);
    }, 300);
  };

  const filteredList = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div id="google_translate_element" className="hidden"></div>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-black transition"
      >
        <selected.Flag className="w-6 h-4" />
        <span>{selected.name}</span>

        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-black text-white border border-white rounded-md shadow-lg z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-white rounded-md bg-transparent"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredList.map((country) => (
              <button
                key={country.code}
                onClick={() => changeLanguage(country)}
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-600"
              >
                <country.Flag className="w-6 h-4" />
                <span>{country.name}</span>
              </button>
            ))}

            {filteredList.length === 0 && (
              <p className="text-center py-3 text-gray-400">No match found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
