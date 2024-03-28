export type userType = {
	username: string;
	password?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
};

export type animalType = {
	animalId: string;
	name: string;
	species: string;
	enclosureId?: string;
	enclosure?: enclosureType;
};

export type enclosureType = {
	enclosureId: string;
	name: string;
	length: number;
	width: number;
	height: number;
	residents?: animalType[];
};
