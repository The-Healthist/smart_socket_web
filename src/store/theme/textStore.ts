import { defineStore } from "pinia";

export type ThemeText =
  | "NotoSansHK"
  | "NotoSerifHK"
  | "CactusClassicalSerifHK"
  | "LXGWWenKaiMonoTCHK";

export const useTextStore = defineStore({
  id: "text",
  state: () => ({
    texts: [
      "NotoSansHK",
      "NotoSerifHK",
      "CactusClassicalSerifHK",
      "LXGWWenKaiMonoTCHK"
    ] as ThemeText[],
    activeText: "NotoSansHK" as ThemeText
  }),
  getters: {
    getText: state => state.activeText,
    getTexts: state => state.texts
  },
  actions: {
    setText(text: ThemeText) {
      this.activeText = text;
    }
  }
});
