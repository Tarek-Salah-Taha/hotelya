// export async function getUserPreferencesFromCountry(country: string): Promise<{
//   language: string;
//   currency: string;
//   flag: string;
// }> {
//   let language = "en";
//   let currency = "USD";
//   let flag = "https://flagcdn.com/eg.svg";

//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     const data = await res.json();
//     const countryInfo = data?.[0];

//     if (countryInfo) {
//       if (countryInfo.currencies) {
//         const firstCurrency = Object.keys(countryInfo.currencies)[0];
//         if (firstCurrency) currency = firstCurrency;
//       }

//       if (countryInfo.languages) {
//         language = Object.values(countryInfo.languages)[0] as string;
//       }

//       flag = countryInfo.flags?.svg || "https://flagcdn.com/eg.svg";
//     }
//   } catch (err) {
//     console.error("Failed to fetch country info:", err);
//   }

//   return { language, currency, flag };
// }
