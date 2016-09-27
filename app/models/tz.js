'use strict';

module.exports = function(sequelize, DataTypes) {

	var SubjectMap = sequelize.define('Tz', {
        id: {
                type: DataTypes.UUID,
				primaryKey: true
			}
		},{
			freezeTableName: true
		}
	);

	return SubjectMap;
};
