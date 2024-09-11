import { getRequest } from "@/requests";
import type { userType } from "@/types";

export function self(): Promise<userType | null> {
	return getRequest("user/self").catch(() => null) as Promise<userType | null>;
}
