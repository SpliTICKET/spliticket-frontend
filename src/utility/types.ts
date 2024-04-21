export type userType = {
	username: string;
	password?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	moderator?: boolean;
};

export type addressType = {
	street: string;
	houseNumber: string;
	city: string;
	postalCode: string;
	country: string;
};

export type artistType = {
	artistId?: string;
	name?: string;
	events?: eventType[];
};

export type eventType = {
	eventId?: string;
	price?: string;
	name?: string;
	venue?: venueType;
	artists?: artistType[];
	website?: string;
};

export type splitType = {
	splitId?: string;
	owner?: userType;
	event?: eventType;
	splitParticipants?: splitParticipantType[];
	locked?: string;
};

export type venueType = {
	venueId?: string;
	name?: string;
	address?: addressType;
	events?: eventType[];
	website?: string;
};

export type splitParticipantType = {
	splitParticipantId?: string;
	name?: string;
	hasPaid?: boolean;
};
