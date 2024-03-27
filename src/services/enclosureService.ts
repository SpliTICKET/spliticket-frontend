import { getRequest } from "@/utility/requests";
import { type enclosureType } from "@/utility/types";

export function getEnclosures(): Promise<enclosureType[]> {
	return getRequest("/enclosure").catch(() => null) as Promise<enclosureType[]>;
}

export function getEnclosure(enclosureId: string): Promise<enclosureType> {
	return getRequest(`/enclosure/${enclosureId}`).catch(() => null) as Promise<enclosureType>;
}
