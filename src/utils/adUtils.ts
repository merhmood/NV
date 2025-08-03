import { cloudStorage } from "@telegram-apps/sdk-react";

export const COOLDOWN_KEY = "lastAdTime";
export const COOLDOWN_SECONDS = 15;

export async function canShowAd(): Promise<boolean> {
  const cd = await getCooldownRemaining();
  return cd <= 0;
}

export async function getCooldownRemaining(): Promise<number> {
  if (!cloudStorage.isSupported() || !cloudStorage.getItem.isAvailable()) {
    return 0;
  }
  const last = await cloudStorage.getItem(COOLDOWN_KEY);
  if (!last) return 0;

  const elapsed = (Date.now() - Number(last)) / 1000;
  return Math.max(0, Math.ceil(COOLDOWN_SECONDS - elapsed));
}

export async function updateCooldown(): Promise<void> {
  if (!cloudStorage.setItem.isAvailable()) {
    console.warn("Cannot update cooldown; storage not available");
    return;
  }
  await cloudStorage.setItem(COOLDOWN_KEY, Date.now().toString());
}
