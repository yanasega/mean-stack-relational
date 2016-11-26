'use strict';

module.exports = function(sequelize, DataTypes) {

	var Preference = sequelize.define('Preference', {
            Id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            IdS:{
                type: DataTypes.UUID,
				primaryKey: true               
            },
            IdR:{
                type: DataTypes.UUID,
				primaryKey: true               
            },
            StudentYear : DataTypes.INTEGER,
            Semester : DataTypes.STRING,
            Rate :DataTypes.INTEGER
		}
	);

	return Preference;
};
