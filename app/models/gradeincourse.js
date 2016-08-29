'use strict';

module.exports = function(sequelize, DataTypes) {

	var GradeInCourse = sequelize.define('GradeInCourse', {
            coursename: DataTypes.STRING,
            coursenumber: DataTypes.INTEGER,
            creditpoints: DataTypes.INTEGER,
            grade: DataTypes.INTEGER
		}
	);

	return GradeInCourse;
};
