import { getRequest, postRequest } from "@/requests";
import type { artistType } from "@/types";

export function getArtists(): Promise<artistType[]> {
	return getRequest("/artist").catch(() => null) as Promise<artistType[]>;
}

export function postArtist(artist: artistType): Promise<artistType> {
	return postRequest("/artist", artist).catch(() => null) as Promise<artistType>;
}
