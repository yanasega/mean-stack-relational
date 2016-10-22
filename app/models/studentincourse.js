'use strict';
module.exports = function(sequelize, DataTypes) {

	var StudentInCourse = sequelize.define('StudentInCourse', {
            IdStudent: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            IdCourse: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            IsDone : DataTypes.BOOLEAN
            },{
			freezeTableName: true
		    }
    );

 return StudentInCourse;
};