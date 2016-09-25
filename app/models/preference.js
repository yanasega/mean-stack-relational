'use strict';

module.exports = function(sequelize, DataTypes) {

	var Preference = sequelize.define('Preference', {
            id: {
				type: DataTypes.UUID,
				primaryKey: true
			},
            idS:{
                type: DataTypes.UUID,
				primaryKey: true               
            },
            idR:{
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
