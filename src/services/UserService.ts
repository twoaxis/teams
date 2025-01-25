import Permission from "../models/Permission";
import User from "../models/User";

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
}

export default UserService;