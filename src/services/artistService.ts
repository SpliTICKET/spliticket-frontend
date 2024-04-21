import { getRequest } from "@/utility/requests";
import type { artistType } from "@/utility/types";

export function getArtists(): Promise<artistType[]> {
	return getRequest("/artist").catch(() => null) as Promise<artistType[]>;
}
