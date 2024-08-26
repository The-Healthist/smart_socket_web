import { defineStore } from "pinia";

export type ThemeRounded = "base" | "muted";

export const useRoundedStore = defineStore({
  id: "themeRounded",
  state: () => ({
    roundeds: ["base", "muted"] as ThemeRounded[],
    rounded: "base" as ThemeRounded
  }),
  getters: {
    getRounded: state => state.rounded,
    getRoundeds: state => state.roundeds
  },
  actions: {
    setRounded(theme: ThemeRounded) {
      console.log("setRounded", theme);
      this.rounded = theme;
    }
  }
});
