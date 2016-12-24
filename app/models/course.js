'use strict';
module.exports = function(sequelize, DataTypes) {

	var Course = sequelize.define('Course', {
            Id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            Name : DataTypes.STRING,
            CreditPoints : DataTypes.DOUBLE,
			CourseType: {
				type:   DataTypes.ENUM,
				values: ['mandatory','mandatory_choice','design_choice','special_projects','general_choice','free_choice','extra']
			}
		},{
			freezeTableName: true
		}
	);

 return Course;
};
