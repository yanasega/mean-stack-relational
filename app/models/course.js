'use strict';

module.exports = function(sequelize, DataTypes) {

	var DegreeCalculator = sequelize.define('DegreeCalculator', {
            coursename: DataTypes.STRING,
            coursenumber: DataTypes.INTEGER,
            creditpoints: DataTypes.INTEGER,
            grade: DataTypes.INTEGER
		}
	);

	return DegreeCalculator;
};
