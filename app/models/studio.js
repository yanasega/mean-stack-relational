'use strict';

module.exports = function(sequelize, DataTypes) {

	var Studio = sequelize.define('Studio', {
			IdC: DataTypes.INTEGER,
			Name: DataTypes.STRING,
			Instructor: DataTypes.INTEGER,
			Subject: DataTypes.INTEGER,
            Semester: DataTypes.STRING,
            IsActive: DataTypes.BOOLEAN,
            LinkSylabus:DataTypes.STRING,
            RelevantYears:DataTypes.STRING

		},{
			freezeTableName: true
		}
	);

	return Studio;
};
