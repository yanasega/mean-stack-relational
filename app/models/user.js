'use strict';

/**
	* User Model
	*/

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', 
		{
			// name: DataTypes.STRING,
			// email: DataTypes.STRING,
			// username: DataTypes.STRING,
			// hashedPassword: DataTypes.STRING,
			FirstName: DataTypes.STRING,
            LastName: DataTypes.STRING,
            Email:DataTypes.STRING,
			id: {
				type: DataTypes.UUID,
				primaryKey: true
			},			
            Gender: DataTypes.STRING,
            hashedPassword: DataTypes.STRING,
            CurrentYear : DataTypes.INTEGER,
			IsValid : DataTypes.BOOLEAN,
			Generalaverage: DataTypes.DOUBLE,
			LastStudioGrade: DataTypes.DOUBLE,
			provider: DataTypes.STRING,
			salt: DataTypes.STRING, 
			facebookUserId: DataTypes.INTEGER,
			twitterUserId: DataTypes.INTEGER,
			twitterKey: DataTypes.STRING,
			twitterSecret: DataTypes.STRING,
			github: DataTypes.STRING,
			openId: DataTypes.STRING
		},
		{
			instanceMethods: {
				toJSON: function () {
					var values = this.get();
					delete values.hashedPassword;
					delete values.salt;
					return values;
				},
				makeSalt: function() {
					return crypto.randomBytes(16).toString('base64'); 
				},
				authenticate: function(plainText){
					return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
				},
				encryptPassword: function(password, salt) {
					if (!password || !salt) {
                        return '';
                    }
					salt = new Buffer(salt, 'base64');
					return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
				}
			},
			associate: function(models) {
				User.hasMany(models.Article);
			}
		}
	);

	return User;
};
