import { getRequest } from "@/utility/requests";
import { type animalType } from "@/utility/types";

export function getAnimals(): Promise<animalType[]> {
	return getRequest("/animal").catch(() => null) as Promise<animalType[]>;
}

export function getAnimal(animalId: string): Promise<animalType> {
	return getRequest(`/animal/${animalId}`).catch(() => null) as Promise<animalType>;
}
