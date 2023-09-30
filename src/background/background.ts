import { setStoredCities, setStoredOptions } from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    hasStorageOverlay: false,
    homeCity: "Toronto",
    tempScale: "metric",
  });
});
