sequelize.sync().success(function () {
        registration.create({
        Id_r: 2,
        Start_date: $scope.startdate,
        End_date: $scope.enddate,
        Current_year: 2016,
        Semester: $scope.semester,
        IsActive: 1,
        }).success(function (data) {
        console.log(data.values) 
        })
});