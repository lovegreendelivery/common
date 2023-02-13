import { Request } from "express";

export const getCurrentSubdomain = (req: Request): string => {
	let origin = req.get("origin") || req.hostname;
	origin = origin.replace('https://', '').replace('http://', '');
	const subdomain = origin.split(".")[0];
	return subdomain;
};
