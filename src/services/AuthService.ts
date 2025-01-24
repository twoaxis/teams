import User from "../models/User";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthInvalidCredentialsException from "../exceptions/AuthInvalidCredentialsException";
import Permissions from "../enums/Permissions";
import UserService from "./UserService";

class AuthService {
	async signUp(username: string, password: string): Promise<string> {
		let user = await User.findOne({
			where: {
				username
			}
		});
		if (user) throw new UserAlreadyExistsException();

		const hashedPassword = await bcrypt.hash(password, 10);

		user = await User.create({
			username,
			password: hashedPassword,
		});

		return this.generateToken(user["id"], username);

	}
	async signIn(username: string, password: string): Promise<string> {
		let user = await User.findOne({
			where: {
				username
			}
		});

		if (!user) throw new AuthInvalidCredentialsException();

		const isValid = await bcrypt.compare(password, user["password"]);

		if (!isValid) throw new AuthInvalidCredentialsException();

		const userService = new UserService();
		const permissions = await userService.getUserPermissions(user["id"]);

		return this.generateToken(user["id"], username, permissions);

	}
	private generateToken(id: string, username: string, permissions: Permissions[] = []): string {
		return jwt.sign({
			id,
			permissions
		}, process.env.JWT_SECRET, {
			subject: username,
			issuer: "teams.twoaxis.xyz",

			expiresIn: "12h"
		});
	}
}

export default AuthService;