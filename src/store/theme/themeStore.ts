// store/themeStore.ts
import { defineStore } from "pinia";

export type Theme = "orange" | "green" | "red" | "white";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    themes: ["orange", "green", "red", "white"] as Theme[],
    activeTheme: "orange" as Theme
  }),
  getters: {
    getTheme: state => state.activeTheme
  },
  actions: {
    setTheme(theme: Theme) {
      this.activeTheme = theme;
    }
  }
});
