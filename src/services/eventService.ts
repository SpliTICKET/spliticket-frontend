import { getRequest } from "@/requests";
import type { eventType } from "@/types";

export function getEvents(): Promise<eventType[]> {
	return getRequest("/event").catch(() => null) as Promise<eventType[]>;
}
