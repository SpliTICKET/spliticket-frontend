import { getRequest } from "@/utility/requests";
import type { eventType } from "@/utility/types";

export function getEvents(): Promise<eventType[]> {
	return getRequest("/event").catch(() => null) as Promise<eventType[]>;
}
