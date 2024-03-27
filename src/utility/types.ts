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
};

export type enclosureType = {
	enclosureId: string;
	name: string;
	length: number;
	width: number;
	height: number;
};
