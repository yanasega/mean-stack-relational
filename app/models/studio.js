'use strict';

module.exports = function(sequelize, DataTypes) {

	var Studio = sequelize.define('Studio', {
			Id_s: DataTypes.INTEGER,
			Name: DataTypes.STRING,
			Instructor: DataTypes.STRING,
            Description:DataTypes.STRING,
            Relevant_years:DataTypes.STRING,
            Semester: DataTypes.STRING,
            IsActive: DataTypes.BOOLEAN,
            LinkSylabus:DataTypes.STRING

		}
	);

	return Studio;
};
