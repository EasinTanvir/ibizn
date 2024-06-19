async function convertTedCurrency(amount, currentUnit) {
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currentUnit}&to=USD`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }

    const data = await res.json();

    if (!data.rates || !data.rates.USD) {
      throw new Error("Invalid response data");
    }

    return data.rates.USD;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { convertTedCurrency };
