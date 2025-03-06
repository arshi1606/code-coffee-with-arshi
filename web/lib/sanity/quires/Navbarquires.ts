import { client } from "../sanity";

export async function getNavbar() {
  const query = `*[_type == "navbar"][0]{ menuItems }`;
  return await client.fetch(query);
}
