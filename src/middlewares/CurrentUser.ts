import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getCurrentSubdomain } from "../utils/domain";

interface UserPayload {
	id: string;
	email: string;
	role: string;
	subdomain: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const subdomain = getCurrentSubdomain(req);

	if (
		!req.session ||
		!req.session[subdomain] ||
		!req.session[subdomain].jwt
	) {
		return next();
	}

	try {
		const payload = jwt.verify(
			req.session[subdomain].jwt,
			process.env.JWT_TOKEN!
		) as UserPayload;

		req.currentUser = payload;
	} catch (err) {}

	next();
};
