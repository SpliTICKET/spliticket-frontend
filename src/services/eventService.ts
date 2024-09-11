import { getRequest, patchRequest } from "@/requests";
import type { eventType } from "@/types";

export function getEvents(): Promise<eventType[]> {
	return getRequest("/event").catch(() => null) as Promise<eventType[]>;
}

export function getEvent(eventId: string): Promise<eventType> {
	return getRequest(`/event/${eventId}`).catch(() => null) as Promise<eventType>;
}

export function patchEvent(eventId: string, event: eventType) {
	return patchRequest(`/event/${eventId}`, event).catch(() => null) as Promise<eventType>;
}
