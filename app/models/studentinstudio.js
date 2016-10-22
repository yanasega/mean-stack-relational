'use strict';

module.exports = function(sequelize, DataTypes) {

	var StudentInStudio = sequelize.define('StudentInStudio', {
			IdStudent: DataTypes.INTEGER,
			Studio: DataTypes.INTEGER,
			Instructor: DataTypes.INTEGER,
			AId:DataTypes.INTEGER
			
		},{
			freezeTableName: true
		}
	);

	return StudentInStudio;
};