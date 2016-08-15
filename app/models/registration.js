'use strict';

module.exports = function(sequelize, DataTypes) {

	var Registration = sequelize.define('Registration', {
			startdate: DataTypes.DATE,
			enddate: DataTypes.DATE,
            semester:DataTypes.STRING
		}
	);

	return Registration;
};
