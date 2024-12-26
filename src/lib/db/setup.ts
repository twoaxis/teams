import sequelize from "./sequelize";

const setup = async () => {
	await sequelize.authenticate();

	if(process.env.NODE_ENV !== 'production') {
		await sequelize.sync();
	}
}

export default setup;