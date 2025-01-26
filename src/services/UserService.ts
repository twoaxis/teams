import Permission from "../models/Permission";
import User from "../models/User";
import UserNotFoundException from "../exceptions/UserNotFoundException";

class UserService {
	async getUserPermissions(id: string) {
		const permissions = await Permission.findAll({
			where: {
				userId: id,
			}
		});

		return permissions.map((permission) => permission["name"]);
	}
	async getAllUsers() {
		return await User.findAll({
			attributes: [
				"id",
				"name",
				"username"
			]
		});
	}
	async getAllUsersUnderManager(id: number) {
		return await User.findAll({
			attributes: [
				"id",
				"name",
				"username"
			],
			where: {
				reportingTo: id
			}
		});
	}
	async getUsersReportingToUser(id: string) {
		return await User.findAll({
			attributes: [
				"id",
				"name",
				"username"
			],
			where: {
				reportingTo: id
			}
		});
	}
	async getUser(id: number) {
		const user = await User.findOne({
			attributes: [
				"id",
				"name",
				"username",
				"createdAt",
			],
			where: {
				id
			},
			include: {
				model: User,
				foreignKey: "reportingTo",
				as: "manager"
			}
		});

		if(!user) throw new UserNotFoundException();

		return user;
	}
}

export default UserService;