'use strict';

module.exports = function(sequelize, DataTypes) {

	var Course = sequelize.define('Course', {
            coursename: DataTypes.STRING,
            coursenumber: DataTypes.INTEGER,
            creditpoints: DataTypes.INTEGER,
            grade: DataTypes.INTEGER
		}
	);

	return Course;
};
