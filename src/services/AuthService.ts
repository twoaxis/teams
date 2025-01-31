import User from "../models/User";
import UserAlreadyExistsException from "../exceptions/UserAlreadyExistsException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthInvalidCredentialsException from "../exceptions/AuthInvalidCredentialsException";
import Permissions from "../enums/Permissions";
import UserService from "./UserService";
import RevokedToken from "../models/RevokedToken";
import Permission from "../models/Permission";

class AuthService {
	async createUser(name: string, username: string, password: string, reportingTo: number): Promise<void> {
		const user = await User.findOne({
			where: {
				username
			}
		});
		if (user) throw new UserAlreadyExistsException();

		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			name,
			username,
			password: hashedPassword,
			reportingTo,
		});
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
	async logOut(token: string) {
		await RevokedToken.create({
			token
		});
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
	async validateToken(token: string) {

		const revokedToken = await RevokedToken.findOne({
			where: {
				token
			}
		});
		if (revokedToken) throw new AuthInvalidTokenException();

		return jwt.verify(token, process.env.JWT_SECRET);
	}
	async addPermission(userId: number, permission: Permissions) {
		await Permission.create({
			userId,
			name: permission
		});
	}
	async removePermission(userId: number, permission: Permissions) {
		await Permission.destroy({
			where: {
				userId,
				name: permission
			}
		});
	}
}

export default AuthService;