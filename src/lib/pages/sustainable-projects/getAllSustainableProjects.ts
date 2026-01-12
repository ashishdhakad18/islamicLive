import qs from "qs";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { transformStrapiResponse } from "@/utils/strapiHelpers";

/**
 * Minimal populate for navigation/header needs
 */
const MINIMAL_POPULATE = {
  Config: {
    fields: ["slug", "title"],
  },
};

export interface ProjectNavigationItem {
  slug: string;
  title: string;
}

/**
 * Fetches all sustainable projects (educations) for navigation
 */
export async function getAllSustainableProjects(
  locale: string = "en"
): Promise<ProjectNavigationItem[]> {
  try {
    const query = qs.stringify(
      {
        locale,
        populate: {
          Config: "*",
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${STRAPI_URL}/api/educations?${query}`;
    console.log("Fetching All Sustainable Projects from:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      //   next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch sustainable projects list:",
        response.statusText
      );
      return [];
    }

    const data = await response.json();
    const flattened = transformStrapiResponse<any[]>(data);

    return (
      flattened?.map((item: any) => {
        const rawSlug = item.Config?.slug || item.slug || "";
        // Normalize slug: remove leading/trailing slashes
        const normalizedSlug = rawSlug.replace(/^\/|\/$/g, "");

        return {
          slug: normalizedSlug,
          title: item.Config?.title || "Untitled Project",
        };
      }) || []
    );
  } catch (error) {
    console.error("Error fetching sustainable projects list:", error);
    return [];
  }
}
