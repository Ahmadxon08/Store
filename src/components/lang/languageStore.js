import { create } from "zustand";

const useLanguageStore = create((set) => ({
  selectedLanguage: {
    value: "en",
    label: "EN",
    icon: "/assets/images/eng.png",
  },
  setLanguage: (lang) => {
    set((state) => {
      const selectedLang = state.languages.find(
        (language) => language.value === lang
      );
      if (selectedLang) {
        localStorage.setItem("language", lang);
        localStorage.setItem("selected", lang);
        return { selectedLanguage: selectedLang };
      }
    });
  },
  languages: [
    {
      value: "en",
      label: "EN",
      icon: "/assets/images/eng.png",
    },
    {
      value: "ru",
      label: "RU",
      icon: "/assets/images/ru.png",
    },
    {
      value: "uz",
      label: "UZ",
      icon: "/assets/images/uz.png",
    },
  ],
}));

export default useLanguageStore;
