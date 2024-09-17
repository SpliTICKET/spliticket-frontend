import { getRequest, patchRequest, postRequest } from "@/requests";
import type { venueType } from "@/types";

export function getVenues(): Promise<venueType[]> {
	return getRequest("/venue").catch(() => null) as Promise<venueType[]>;
}

export function getVenue(venueId: string): Promise<venueType> {
	return getRequest(`/venue/${venueId}`).catch(() => null) as Promise<venueType>;
}

export function postVenue(venue: venueType): Promise<venueType> {
	return postRequest("/venue", venue).catch(() => null) as Promise<venueType>;
}

export function patchVenue(venueId: string, venue: venueType): Promise<venueType> {
	return patchRequest(`/venue/${venueId}`, venue).catch(() => null) as Promise<venueType>;
}
