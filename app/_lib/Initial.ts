export async function getInitialUserPreferences(): Promise<{
  language: string;
  country: string;
  currency: string;
  flag: string;
}> {
  let language = "EN";
  let country = "USA";
  let currency = "USD";
  let flag = `https://cdn.ipwhois.io/flags/us.svg`;

  try {
    if (typeof navigator !== "undefined") {
      const navLang = navigator.language || "EN";
      language = navLang.split("-")[0].toUpperCase();
    }

    const geoRes = await fetch("https://ipwhois.app/json/");
    const geoData = await geoRes.json();

    if (geoData?.country) {
      country = geoData.country;
      flag = geoData.country_flag;
      currency = geoData.currency_code;
    }
  } catch (err) {
    console.error("Error detecting user preferences:", err);
  }

  return { language, country, currency, flag };
}
