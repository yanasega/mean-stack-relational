'use strict';

module.exports = function(sequelize, DataTypes) {

	var Instructor = sequelize.define('Instructor', {
			FirstName: DataTypes.STRING,
			LastName: DataTypes.STRING
		},{
			freezeTableName: true
		}
	);

	return Instructor;
};
