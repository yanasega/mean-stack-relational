'use strict';

module.exports = function(sequelize, DataTypes) {

	var Registration = sequelize.define('Registration', {
			StartDate: DataTypes.DATE,
			EndDate: DataTypes.DATE,
            Semester:DataTypes.STRING,
			IsActive: DataTypes.BOOLEAN
		},{
			freezeTableName: true
		}
	);

	return Registration;
};
