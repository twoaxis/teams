import AuthService from "../services/AuthService";

const AuthMiddleware = async (req, res, next) => {

	const { token } = req.cookies;

	if(token) {
		try {
			const authService = new AuthService();

			const data = await authService.validateToken(token);

			req.uid = data["id"];
			req.username = data["sub"];
			req.permissions = data["permissions"];

			next();
		}
		catch {
			res.clearCookie("token").redirect("/");
		}
	}
	else {
		res.redirect("/");
	}
}

export default AuthMiddleware;