import { APP_URL, shareLines } from "../data/content.js";

export async function shareSpotflex(tone = "neutral") {
  const text = tone === "cork" ? shareLines[0] : shareLines[1];
  const payload = { title: "Spotflex", text, url: window.location.origin || APP_URL };

  try {
    if (navigator.share) {
      await navigator.share(payload);
      return { ok: true, method: "native" };
    }
  } catch (err) {
    if (err?.name === "AbortError") return { ok: false, method: "native" };
  }

  try {
    await navigator.clipboard.writeText(`${text} ${payload.url}`);
    window.dispatchEvent(new CustomEvent("spotflex:toast", { detail: "Link copied — paste it in WhatsApp" }));
    return { ok: true, method: "clipboard" };
  } catch {
    window.dispatchEvent(new CustomEvent("spotflex:toast", { detail: "Couldn't copy — try again" }));
    return { ok: false, method: "clipboard" };
  }
}

export async function copyAppLink() {
  try {
    await navigator.clipboard.writeText(window.location.origin);
    return true;
  } catch {
    return false;
  }
}
