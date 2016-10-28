'use strict';
module.exports = function(sequelize, DataTypes) {

	var Student = sequelize.define('Student', {
			FirstName: DataTypes.STRING,
			id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            LastName: DataTypes.STRING,
            Email:DataTypes.STRING,
            Semester: DataTypes.STRING,			
            Gender: DataTypes.STRING,
            CurrentYear : DataTypes.INTEGER,
			IsValid : DataTypes.BOOLEAN,
			Generalaverage: DataTypes.DOUBLE,
			LastStudioGrade: DataTypes.DOUBLE
        },{
            associate: function(models) {
				Student.belongsTo(models.User, {foreignKey: 'id'});
			}
        }
    );

 return Student;
};