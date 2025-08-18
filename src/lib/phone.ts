export function normalizePhone(input: string) {
  const digits = input.replace(/[^\d+]/g, "").trim();
  // لو المستخدم كتب 0 في بداية الرقم المحلي، شيله
  return digits.replace(/^00/, "+");
}
export function isValidPhone(p: string) {
  // بسيط: يبدأ بـ + ثم 8-15 رقم
  return /^\+\d{8,15}$/.test(p);
}
