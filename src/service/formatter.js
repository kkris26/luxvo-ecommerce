export function currencyFormat(value) {
  if (!value) {
    return;
  }
  const number = typeof value === "string" ? Number(value) : value;
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}
