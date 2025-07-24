export function currencyFormat(value) {
  const number = typeof value === "string" ? Number(value) : value;
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}
