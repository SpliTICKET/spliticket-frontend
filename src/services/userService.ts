import { getRequest } from "@/utility/requests";
import type { userType } from "@/utility/types";

export function self(): Promise<userType | null> {
	return getRequest("user").catch(() => null) as Promise<userType | null>;
}
