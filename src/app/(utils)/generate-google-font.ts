import { Logo } from "@/app/(types)/logo";

/**
 * Generates a Google Fonts URL to preload all unique font families and weights
 * found in the provided logo data.
 *
 * @param data An array of Logo objects.
 * @returns A string representing the Google Fonts URL.
 */
export function generateGoogleFont(data: Logo[]): string {
  // Use a Set to store unique font family/weight combinations to avoid duplicates
  const fontQueries = new Set<string>();

  data.forEach(({ styles }) => {
    if (styles.fontFamily) {
      const fontFamilyQuery = `family=${styles.fontFamily.replaceAll(
        " ",
        "+"
      )}`;
      // Include weight if available, otherwise just the family
      const query = styles.fontWeight
        ? `${fontFamilyQuery}:wght@${styles.fontWeight}`
        : fontFamilyQuery;
      fontQueries.add(query);
    }
  });

  // Join the unique queries
  const fontsQueryString = Array.from(fontQueries).join("&");

  // Return the full URL
  return `https://fonts.googleapis.com/css2?${fontsQueryString}&display=swap`;
}
