import axios from "axios";

export interface Tag {
  name: string;
  count: number;
}

export async function fetchTags(
  pageSize: number,
  page: number,
  sortOrder: "asc" | "desc",
  sortBy: "name" | "popular"
): Promise<Tag[]> {
  try {
    const response = await axios.get(
      `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${sortOrder}&sort=${sortBy}&site=stackoverflow`
    );
    return response.data.items.map((item: any) => ({
      name: item.name,
      count: item.count,
    }));
  } catch (error) {
    throw new Error("Failed to fetch tags");
  }
}
