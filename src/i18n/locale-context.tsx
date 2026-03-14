import { createContext, useContext, useState, type ReactNode } from "react"
import { TRANSLATIONS, type TranslationKey } from "./translations"

export type Locale = "zh" | "en"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "zh",
  setLocale: () => {},
  t: (key) => TRANSLATIONS[key]?.zh ?? key,
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh")

  const t = (key: TranslationKey): string => {
    return TRANSLATIONS[key]?.[locale] ?? TRANSLATIONS[key]?.zh ?? key
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
