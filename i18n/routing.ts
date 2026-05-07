import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en", "it", "de"],
  defaultLocale: "es",
});
