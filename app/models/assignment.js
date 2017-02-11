'use strict';

module.exports = function(sequelize, DataTypes) {

	var Assignment = sequelize.define('Assignment', {
			Year: DataTypes.STRING,
			Semester: DataTypes.STRING,
			IsShow: DataTypes.BOOLEAN,
			IdR: DataTypes.INTEGER
		},{
			freezeTableName: true
		}
	);

	return Assignment;
};
