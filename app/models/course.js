'use strict';

module.exports = function(sequelize, DataTypes) {

	var Course = sequelize.define('Course', {
            id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            Name : DataTypes.STRING,
            CreditPoints : DataTypes.INTEGER,
            IsMandatory : DataTypes.STRING //yana change to bool
		}
	);

	return Course;
};
