'use strict';

module.exports = function(sequelize, DataTypes) {

	var SubjectMap = sequelize.define('SubjectMap', {
			Subject: DataTypes.STRING
		},{
			freezeTableName: true
		}
	);

	return SubjectMap;
};
