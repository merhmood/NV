export const COOLDOWN_KEY = "lastAdTime";
export const COOLDOWN_SECONDS = 15;

export const canShowAd = (): boolean => {
  return getCooldownRemaining() <= 0;
};

export const getCooldownRemaining = (): number => {
  const last = localStorage.getItem(COOLDOWN_KEY);
  if (!last) return 0;
  const elapsed = (Date.now() - Number(last)) / 1000;
  return Math.max(0, Math.ceil(COOLDOWN_SECONDS - elapsed));
};

export const updateCooldown = () => {
  localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
};
