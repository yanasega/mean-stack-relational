'use strict';

module.exports = function(sequelize, DataTypes) {

	var StudentInStudio = sequelize.define('StudentInStudio', {
			IdStudent: {
				type: DataTypes.UUID,
				primaryKey: true
			},
			Studio: {
				type: DataTypes.UUID,
				primaryKey: true
			},
			Instructor: DataTypes.INTEGER,
		},{
			freezeTableName: true
		}
	);

	return StudentInStudio;
};