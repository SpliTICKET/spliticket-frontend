import { getRequest, patchRequest, postRequest } from "@/requests";
import type { splitParticipantType, splitType } from "@/types";

export function getSplits(): Promise<splitType[]> {
	return getRequest("/split").catch(() => null) as Promise<splitType[]>;
}

export function postSplit(split: splitType): Promise<splitType> {
	return postRequest("/split", split).catch(() => null) as Promise<splitType>;
}

export function getSplit(splitId: string): Promise<splitType> {
	return getRequest(`/split/${splitId}`).catch(() => null) as Promise<splitType>;
}

export function patchSplit(splitId: string, split: splitType) {
	return patchRequest(`/split/${splitId}`, split).catch(() => null) as Promise<splitType>;
}

export function postSplitParticipant(splitId: string, splitParticipant: splitParticipantType): Promise<splitType> {
	return postRequest(`/split/${splitId}/splitParticipant`, splitParticipant).catch(() => null) as Promise<splitType>;
}
