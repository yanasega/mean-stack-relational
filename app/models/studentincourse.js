'use strict';
module.exports = function(sequelize, DataTypes) {

	var StudentInCourses = sequelize.define('StudentInCourses', {
            id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            Name : DataTypes.STRING,
            CreditPoints : DataTypes.INTEGER
            //IsMandatory : DataTypes.STRING //yana change to bool
  }
 );

 return StudentInCourses;
};