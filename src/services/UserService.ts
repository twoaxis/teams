import Permission from "../models/Permission";

class UserService {
	async getUserPermissions(id: string) {
		const permissions = await Permission.findAll({
			where: {
				userId: id,
			}
		});

		return permissions.map((permission) => permission["name"]);
	}
}

export default UserService;