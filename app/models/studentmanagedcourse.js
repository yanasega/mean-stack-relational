'use strict';
module.exports = function(sequelize, DataTypes) {

	var StudentInCourse = sequelize.define('StudentManagedCourse', {
            IdStudent: DataTypes.INTEGER,
            IdCourse: DataTypes.INTEGER,
			Name : DataTypes.STRING,
			CreditPoints : DataTypes.INTEGER,
			CourseType: {
				type:   DataTypes.ENUM,
				values: ['mandatory','mandatory_choice','design_choice','special_projects','general_choice','free_choice','extra']
			}
            },{
			freezeTableName: true
		    }
    );

 return StudentInCourse;
};