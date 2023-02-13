import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}
	next();
};

export function permit(...permittedRoles: Array<string>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { currentUser } = req;
		if (currentUser && permittedRoles.includes(currentUser.role)) {
			next();
		} else {
			throw new NotAuthorizedError();
		}
	};
}
