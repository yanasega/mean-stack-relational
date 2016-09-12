'use strict';

module.exports = function(sequelize, DataTypes) {

	var Instructor = sequelize.define('Instructor', {
			First_name: DataTypes.STRING,
			Last_name: DataTypes.STRING
		}
	);

	return Instructor;
};
