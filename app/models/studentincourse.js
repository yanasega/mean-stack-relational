'use strict';
module.exports = function(sequelize, DataTypes) {

 var StudentInCourse = sequelize.define('StudentInCourse', {

            Id: {
				type: DataTypes.UUID,
				primaryKey: true
   },

            Id_c: {
				type: DataTypes.INTEGER,
				unique: true

   },
            Name : DataTypes.STRING,
            CreditPoints : DataTypes.INTEGER
            //IsMandatory : DataTypes.STRING //yana change to bool
  }
 );

 return StudentInCourse;
};
