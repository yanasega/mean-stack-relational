'use strict';

module.exports = function(sequelize, DataTypes) {

	var Registration = sequelize.define('Registration', {
			Start_date: DataTypes.DATE,
			End_date: DataTypes.DATE,
            Semester:DataTypes.STRING,
			IsActive: DataTypes.BOOLEAN
		}
	);

	return Registration;
};
