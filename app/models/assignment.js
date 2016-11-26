'use strict';

module.exports = function(sequelize, DataTypes) {

	var Assignment = sequelize.define('Assignment', {
			Year: DataTypes.STRING,
			Semester: DataTypes.STRING
		},{
			freezeTableName: true
		}
	);

	return Assignment;
};
