import { getRequest } from "@/requests";
import type { userType } from "@/types";

export function self(): Promise<userType | null> {
	return getRequest("user").catch(() => null) as Promise<userType | null>;
}
