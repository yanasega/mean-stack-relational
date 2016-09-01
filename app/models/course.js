'use strict';

module.exports = function(sequelize, DataTypes) {

	var Course = sequelize.define('Course', {
            Id_c: {
				type: DataTypes.INTEGER,
				unique: true
			},
            Name : DataTypes.STRING,
            CreditPoints : DataTypes.INTEGER
            //IsMandatory : DataTypes.STRING //yana change to bool
		}
	);

	return Course;
};
