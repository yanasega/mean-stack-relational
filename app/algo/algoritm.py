import math
import json
import pprint
import mysql.connector
import sys
from pulp import *

class Algorithm:

    def __init__(self):

        # connection to sql
        self.db = mysql.connector.connect(host="127.0.0.1",    # your host, usually localhost
                                         user="root",         # your username
                                         password="Password1",  # your password
                                         database="sakila")        # name of the data base


    def get_preferences(self, year, semester):

        try:
            # Cursor object. you execute all the queries you need
            cur = self.db.cursor()

            # Use all the SQL you like
            query = " select P.Id, P.IdS, P.Rate, S.Gender from Preferences P, Students S " + \
                    " where P.Id = S.Id and P.StudentYear in " + str(year) + " and P.semester= '" + str(semester) + \
                    " '      and P.createdAt >= (select max(StartDate) from Registration) " + \
                    "       and P.createdAt <= (select max(EndDate) from Registration)" + \
                    " order by S.Gender, P.Id"

            cur.execute(query)

            # query for table Preferences
            # need to take only from specific year in field where
            # return only columns of pref, id

            return cur.fetchall()

        except Exception as e:
                print e

    def get_information_student(self, year, semester, num_of_studio):

        try:

            # Cursor object. you execute all the queries you need
            cur = self.db.cursor()

            # Use all the SQL you like
            query = " select Id, Gender, GeneralAverage, LastStudioGrade from students " + \
                    " where CurrentYear in" + str(year) + \
                    " order by Gender, Id"

            cur.execute(query)
            result = cur.fetchall()

            # query for table Students (join with preferences)
            # return columns of id, gender, grade

            num_of_female   = 0
            num_of_male     = 0
            num_of_students = len(result)

            # dictionary that keeps all the information about the students
            students_information = {}

            # list that keep all the avarege grades and last studio grades of the students
            student_general_average = []
            student_studio_average = []
            sum_general_average = 0
            sum_studio_average = 0

            # calculate information on the students
            for line in result:
                id_student      = line[0]
                gender          = line[1]
                general_average = int(round(line[2]))
                studio_average  = int(round(line[3]))

                sum_general_average += general_average
                sum_studio_average += studio_average

                # insert all information to dictionary
                students_information[id_student] = {"id": id_student, "gender": gender, "average": line[2],
                                                    "grade in studio": line[3]}

                if gender == 'female':
                    num_of_female += 1
                else:
                    num_of_male += 1

                # create a list of students and their grades
                student_general_average.append([id_student,general_average])
                student_studio_average.append([id_student,studio_average])

            female_in_studio = float(num_of_female) / num_of_studio
            male_in_studio = float(num_of_male) / num_of_studio
            general_average_calculation = round(sum_general_average / num_of_students)
            studio_average_calculation = round(sum_studio_average / num_of_students)

            # floor = round down
            # lower bound of female and male in each studio
            lb_female = math.floor(female_in_studio)
            lb_male = math.floor(male_in_studio)

            lb_students = 10
            ub_students = 12
            # if the year is 5, we need to calculate the number of students in each group
            if year == 5:
                num_of_groups = len(self.get_studio_id(5, semester))
                num_of_students_in_group = num_of_students / float(num_of_groups)
                lb_students = math.floor(num_of_students_in_group - 1)
                ub_students = math.floor(num_of_students_in_group + 1)

            return [student_general_average, student_studio_average, lb_female, lb_male, num_of_students, num_of_female,
                    num_of_male, lb_students, ub_students, students_information, general_average_calculation,
                    studio_average_calculation]

        except Exception as e:
            self.db.close()
            print e

    def remove_records(self, rates, year):

        try:

            # Cursor object. you execute all the queries you need
            cur1 = self.db.cursor(buffered=True)
            cur2 = self.db.cursor()

            # query for table studio and student_in_studio
            # return from studio table : ID of studio and instructor
            # return from student_in_studio : id of student and

            if year == (3,4):

                query1 = " select IdStudent, Studio, Instructor from StudentInStudio " + \
                         " where IdStudent in (select IdStudent from Students" + \
                                            " where CurrentYear in " + str(year) + " )"

                query2 = " select Instructor, id, Subject from Studio " + \
                         " where IsActive = True and RelevantYears = '3,4' "

                cur1.execute(query1)
                cur2.execute(query2)

                # dictionary of all the instructors and the studio they teach
                instructor_in_studio = {}
                # dictionary of all the students and the instructors that teached them in the past
                student_with_instructor = {}
                # dictionary of all studios with their subject
                subject_of_studio = {}

                for line in cur2.fetchall():
                    studio      = line[1]
                    instructor  = line[0]
                    subject = line[2]

                    if studio not in subject_of_studio:
                        subject_of_studio[studio] = subject
                    if studio in instructor_in_studio:
                        instructor_in_studio[studio].append(instructor)
                    else:
                        instructor_in_studio[studio] = [instructor]

                # dictionary that count how many times student get the same subject
                counter = {}
                for line in cur1.fetchall():
                    student     = line[0]
                    studio      = line[1]
                    instructor  = line[2]

                    if student in student_with_instructor:
                        student_with_instructor[student].append(instructor)
                    else:
                        student_with_instructor[student] = [instructor]

                    if student in counter:
                        if subject_of_studio[studio] in counter[student]:
                            counter[student][subject_of_studio[studio]] += 1
                        else:
                            counter[student][subject_of_studio[studio]] = 1
                    else:
                        counter[student] = {subject_of_studio[studio]: 1}

                # check if student already been with specific instructor
                # if yes - he can't choose this instructor again
                for student, studios in rates.iteritems():
                    for studio, rate in studios.iteritems():
                        current_instructor = instructor_in_studio[studio]
                        for item in current_instructor:
                            if student in student_with_instructor:
                                if item in student_with_instructor[student]:
                                    rates[student][studio] = 2000000
                                else:
                                    continue

                        # if student get 2 times the same subject of studio he can't choose him again
                        if rates[student][studio] < 1000000:
                            if student in counter and subject_of_studio[studio] in counter[student]:
                                if counter[student][subject_of_studio[studio]] >= 2:
                                    rates[student][studio] = 1500000

            if year == 5:

                # get all the previous assigning of the students for studio
                # and for each studio- his subject
                query1 = " select IdStudent, Studio, Subject from StudentInStudio SIS, Studio S " + \
                         " where SIS.IdStudent in (select IdStudent from Students" + \
                                            "      where CurrentYear = 5 and IsValid = True " + \
                         " and SIS.Studio = S.id " + \
                         " and S.RelevantYears = '3,4' "

                # get all the groups in the project course
                # for each group - his subject
                query2 = " select id, Subject from Studio " + \
                         " where IsActive = True and RelevantYears = '5'"

                cur1.execute(query1)
                cur2.execute(query2)

                # dictionary of all the students with the subject they already choose
                subject_of_student = {}
                # dictionary of all studios with their subject
                subject_of_studio  = {}

                for line in cur1.fetchall():
                    student = line[0]
                    studio  = line[1]
                    subject = line[2]

                    if studio not in subject_of_studio:
                        subject_of_studio[studio] = subject

                    if student in subject_of_student:
                        subject_of_student[student].append(subject)
                    else:
                        subject_of_student[student] = [subject]

                # dictionary of all groups in the project course with their subject
                subject_of_group_in_project = {}
                for line in cur2.fetchall():
                    group   = line[0]
                    subject = line[1]

                    if group not in subject_of_group_in_project:
                        subject_of_group_in_project[group] = subject

                # student can sign a group in project only if he took before
                # studio with the same subject of the group
                # check for this condition :
                for student, groups in rates:
                    for group, rate in groups:

                        if rates[student][studio] < 1000000:
                            if subject_of_group_in_project[group] in subject_of_student[student]:
                                continue
                            else:
                                rates[student][studio] = 1000000

            return rates

        except Exception as e:
            self.db.close()
            print e

    def get_studio_id(self, year, semester):

        try:
            # Cursor object. you execute all the queries you need
            cur = self.db.cursor()

            # query for table Studio
            # need to take only from specific year and semester( date.today) in field where
            # IsActive = true
            if year == (3,4) :
                query = " select id from Studio " + \
                        " where RelevantYears = '3,4' and Semester ='" + str(semester) + "' and IsActive = true "

            if year == 5:
                query = " select id from Studio " + \
                        " where RelevantYears = '5' and Semester ='" + str(semester) + "' and IsActive = true "

            cur.execute(query)
            result = []
            for line in cur.fetchall():
                result.append(line[0])

            return result

        except Exception as e:
            self.db.close()
            print e

    def run_algorithm(self, year, semester, num_studios, rates, list_id_studio):

        try:
            result = self.get_information_student(year, semester, num_studios)
            # return student_general_average, student_studio_average, lb_female, lb_male, num_of_students,
            # num_of_female, num_of_male, lb_students, ub_students, students_information, general_average_calculation,
            # studio_average_calculation
            # list of general_average : [[id1,grade1],[id2,grade2],...]
            general_average = result[0]
            studio_average  = result[1]
            lb_female       = result[2] - 2
            lb_male         = result[3] - 2
            num_students    = result[4]
            num_of_female   = result[5]
            num_of_male     = result[6]
            lb_students     = result[7]
            ub_students     = result[8]
            students_information        = result[9]
            general_average_calculation = result[10]
            studio_average_calculation  = result[11]
            lb_general_average = general_average_calculation - 2
            ub_general_average = general_average_calculation + 2
            lb_studio_average  = studio_average_calculation - 2
            ub_studio_average  = studio_average_calculation + 2
            start_value = 100

            # initialize coefficients
            # coeff_num_of_students_in_studio = [1] * num_students
            # coeff_num_of_female_in_studio = [1] * num_of_female
            # coeff_num_of_male_in_studio = [1] * num_of_male

            coeff_general_average_of_students = []
            for item in general_average:
                coeff_general_average_of_students.append(item[1])

            coeff_last_grade_in_studio = []
            for item in studio_average:
                coeff_last_grade_in_studio.append(item[1])

            # dictionary that save for each student his prefernces by permanent order
            coeff_preferences_of_students = {}

            # dictionary that save the map between the students id's and their index in the linear problem
            students_map = {}

            # that start value is where the index of the students start in the linear problem
            i = start_value
            # the list general_average keeps all the students in permanent order
            # we want all the coefficients to be in the same order of students
            for item in general_average:
                id_student = item[0]
                order_rates = []
                for id_studio in list_id_studio:
                    if id_student not in rates:
                        print "error: student id " +str(id_student) + "not in the preferences table"
                        continue

                    order_rates.append(rates[id_student][id_studio])


                coeff_preferences_of_students[i] = order_rates
                students_map[i] = id_student
                # print str(i) +" " + str(id_student)
                i += 1

            students = range(start_value,  start_value + num_students)
            studios = range(1, num_studios + 1)

            # Linear Programming
            prob = LpProblem("SchedulingProblem", LpMinimize)
            x = {}

            # subject variables
            for i in studios:
                for j in students:

                    x[i, j] = LpVariable(name= "x_%d_%d" %(i, j), cat= LpBinary)

            # target function
            target_function = pulp.lpSum([coeff_preferences_of_students[j][i-1] * x[i,j] for j in students for i in studios])
            #pprint.pprint(general_average)
            #pprint.pprint(studio_average)
            #pprint.pprint(target_function)

            # initialize constraints
            # each student need to be in exactly 1 studio
            condition_each_student = {}
            for j in students:
                condition_each_student[j] = pulp.lpSum([x[i, j] for i in studios]) == 1

            # number of students in studio
            condition_num_student_in_studio1 = {}
            condition_num_student_in_studio2 = {}
            for i in studios:
                condition_num_student_in_studio1[i] = lb_students <= pulp.lpSum([x[i, j] for j in students])
                condition_num_student_in_studio2[i] = pulp.lpSum([x[i, j] for j in students]) <= ub_students

            # number of females in studio
            # female: 1-num_of_female
            condition_num_female_in_studio = {}
            range_females = range(start_value , start_value + num_of_female)
            for i in studios:
                condition_num_female_in_studio[i] = pulp.lpSum([ x[i, j] for j in range_females]) >= lb_female

            # number of males in studio
            # male: num_of_female+1-num_students
            condition_num_male_in_studio = {}
            range_males = range( start_value + num_of_female,  start_value + num_students)
            for i in studios:
                condition_num_male_in_studio[i] = pulp.lpSum([x[i, j] for j in range_males]) >= lb_male

            # average general grade in each studio
            condition_general_average1 = {}
            condition_general_average2 = {}
            for i in studios:
                numerator = pulp.lpSum([coeff_general_average_of_students[j-start_value-1] * x[i, j] for j in students])
                denominator = pulp.lpSum([x[i, j] for j in students])
                condition_general_average1[i] = lb_general_average * denominator <= numerator
                condition_general_average2[i] = numerator <= ub_general_average * denominator

            # average last studio grade in each studio
            condition_studio_grade1 = {}
            condition_studio_grade2 = {}
            for i in studios:
                numerator = pulp.lpSum([coeff_last_grade_in_studio[j-start_value-1]* x[i, j] for j in students])
                denominator = pulp.lpSum([x[i, j] for j in students])
                condition_studio_grade1[i] = lb_studio_average * denominator <= numerator
                condition_studio_grade2[i] = numerator <= ub_studio_average * denominator

            # add the target function to the problem
            prob += target_function

            for i in range(1, num_studios+1):
                prob += condition_num_student_in_studio1[i]
                prob += condition_num_student_in_studio2[i]
            #    prob += condition_num_female_in_studio[i]
            #    prob += condition_num_male_in_studio[i]
                prob += condition_general_average1[i]
                prob += condition_general_average2[i]
                prob += condition_studio_grade1[i]
                prob += condition_studio_grade2[i]

            for j in students:
                prob += condition_each_student[j]

            prob.writeLP("SchedulingProblem.lp")
            prob.solve()
            #print("Status:", LpStatus[prob.status])

            temp_solution = {}
            for v in prob.variables():
                # print(v.name, "=", v.varValue)
                value_variable = int(v.varValue)
                if value_variable == 1:
                    temp_name 	  = v.name.split("_")
                    student_index = int(temp_name[2])
                    studio_id	  = temp_name[1]
                    student_id 	  = students_map[student_index]

                    if studio_id in temp_solution:
                        temp_solution[studio_id].append(students_information[student_id])
                    else:
                        temp_solution[studio_id] = [students_information[student_id]]

            # write the solution to json format
            # when every studio have the following information: ids, average grade,
            # average studio grade, number of female, number of male
            final_solution = []
            for studio, list_info in temp_solution.iteritems():
                sum_average      = 0
                sum_studio_grade = 0
                num_female       = 0
                num_male         = 0
                total_in_studio  = 0
                list_id_student  = []

                for item in list_info:
                    total_in_studio += 1
                    list_id_student.append([item["id"], rates[item["id"]][int(studio)]])
                    sum_average += item["average"]
                    sum_studio_grade += item["grade in studio"]
                    if item["gender"] == 'female':
                        num_female += 1
                    else:
                        num_male += 1

                total_average        = float(sum_average / total_in_studio)
                total_studio_average = float(sum_studio_grade / total_in_studio)

                final_solution.append({"studio": studio, "id_list": list_id_student, "general_average": total_average,
                                          "studio_average": total_studio_average, "female": num_female, "male": num_male,
                                          "total_in_studio": total_in_studio})

            print json.dumps(final_solution)
            return json.dumps(final_solution)

        except Exception as e:
            print e

    def sort_records(self, year, semester):

        # studios = []

        # get all the relevant studios

        if year in (3,4):
            year = (3,4)

        list_studio = self.get_studio_id(year, semester) # receive from db

        # create list of all the active studios
        # for line in list_studio:
        #     studios.append(line[0])

        preferences_dic = self.get_preferences(year, semester)
        # dictionary of all rates per student
        rates = {}

        # determine what is the bound for the preferences of the students
        # in year 3,4 - student can get only one of the first 4 preferences
        # in year 5 - student can get only one of the first 2 preferences
        if year == (3,4):
            bound = 4
        if year == 5:
            bound = 2

        # summarize all the rates for each studio
        num_of_studio = len(list_studio)
        for line in preferences_dic:
            # initialize rates = { id1 :{}, id2 :{},...}
            id_student = line[0]
            id_studio = line[1]
            rate = line[2]

            # if the preference of the studio is rate greater then the bound - we don't want to
            # include him so we initialize the rate to 0
            if rate > bound:
                rate = 1000000
            if id_student in rates:
                rates[id_student][id_studio] = rate
            else:
                rates[id_student] = {id_studio: rate}

            # sum of rates per studio
            # studios[id_studio] += rate

        # list of all studios with the sum of rates
        # rate_list = []
        # for studio, rate in studios.iteritems():
        #     rate_list.append([studio, rate])

        # sort list of rates
        # rate_list = sorted(rate_list, key=lambda x: x[1])

        new_rates = self.remove_records(rates, year)

        result = self.run_algorithm(year, semester, num_of_studio, new_rates, list_studio)

=======
	def __init__(self):

		# connection to sql
		self.db = mysql.connector.connect(host     = "127.0.0.1",             # your host, usually localhost
										  user     = "root",                  # your username
										  password = "we1are2the3champions",  # your password
										  database = "sakila")                # name of the data base

										  
		self.errors = {}
		self.remark = []

	def get_preferences(self, year, semester):

		try:
			# Cursor object. you execute all the queries you need
			cur = self.db.cursor(buffered=True)
			if year == 5:
				year = (5, 5)
			# Use all the SQL you like
			query = " SELECT P.Id, P.IdS, P.Rate, S.Gender FROM Preferences P, Students S " + \
					" WHERE P.Id = S.Id and P.StudentYear in " + str(year) + " and P.semester= '" + str(semester) + "' and " + \
						   "P.createdAt >= (SELECT max(StartDate) FROM Registration) and " + \
					       "P.createdAt <= (SELECT max(EndDate) FROM Registration)" + \
					" ORDER BY S.Gender, P.Id"

			cur.execute(query)

			# query for table Preferences
			# need to take only from specific year in field where
			# return only columns of pref, id



			return cur.fetchall()

		except Exception as e:
			self.errors['get_preferences'] = 'database error: ' + str(e)
			# print e

	def get_information_student(self, year, semester, num_of_studio, rates):

		try:

			if year == 5: year = (5, 5)
			# Cursor object. you execute all the queries you need
			cur = self.db.cursor()

			# Use all the SQL you like
			# query for table Students (join with preferences)
			# return columns of id, gender, grade
			query = "select Id, Gender, GeneralAverage, LastStudioGrade from students " + \
					"where CurrentYear in " + str(year) + " and Semester='" + semester + "' " + \
					"order by Gender, Id"
			if year == (5, 5): year = 5

			cur.execute(query)
			result = cur.fetchall()
			num_of_female   = 0
			num_of_male     = 0
			num_of_students = len(result)
			
		except Exception as e:
			self.errors['get_information_student-sql'] = 'database error: ' + str(e)

		try:
			# dictionary that keeps all the information about the students
			students_information = {}

			# list that keep all the avarege grades and last studio grades of the students
			student_general_average = []
			student_studio_average = []
			sum_general_average = 0
			sum_studio_average = 0

			# calculate information on the students
			for line in result:
				id_student      = line[0]
				gender          = line[1]
				general_average = int(round(line[2]))
				studio_average  = int(round(line[3]))

				# check if student have preferences
				# if student don't have preferences-
				# do not add him to all the information lists
				if id_student not in rates:
					self.remark.append(id_student)
					num_of_students -= 1
				else:
					sum_general_average += general_average
					sum_studio_average  += studio_average

					# insert all information to dictionary
					students_information[id_student] = {"id": id_student,
														"gender": gender,
														"average": line[2],
														"grade in studio": line[3]}
					if gender == 'female':
						num_of_female += 1
					else:
						num_of_male += 1

					# create a list of students and their grades
					student_general_average.append([id_student,general_average])
					student_studio_average.append([id_student,studio_average])

			female_in_studio = float(num_of_female) / num_of_studio
			male_in_studio = float(num_of_male) / num_of_studio
			general_average_calculation = round(sum_general_average / num_of_students)
			studio_average_calculation = round(sum_studio_average / num_of_students)

			# floor = round down
			# lower bound of female and male in each studio
			lb_female = math.floor(female_in_studio)
			lb_male = math.floor(male_in_studio)
			
			# Because the num of students is dynamic and
			# therefore the number of students in each group 
			num_of_groups = len(self.get_studio_id(year, semester))
			num_of_students_in_group = num_of_students / float(num_of_groups)
			lb_students = math.floor(num_of_students_in_group - 1)
			ub_students = math.floor(num_of_students_in_group + 1)

			return [student_general_average, student_studio_average, lb_female, lb_male, 
					num_of_students, num_of_female, num_of_male, 
					lb_students, ub_students, students_information, 
					general_average_calculation, studio_average_calculation]

		except Exception as e:
			self.errors['get_information_student-calculation'] = str(e)
			self.db.close()
			# print e

	def update_preferences_by_conditions(self, rates, year):

		try:

			# Cursor object. you execute all the queries you need
			cur1 = self.db.cursor(buffered=True)
			cur2 = self.db.cursor()

			# query for table studio and student_in_studio
			# return from studio table : ID of studio and instructor
			# return from student_in_studio : id of student and studio

			if year == (3,4):

				query1 = " select IdStudent, Studio, Instructor from StudentInStudio " + \
						 " where IdStudent in (select IdStudent from Students" + \
											" where CurrentYear in " + str(year) + " )"

				query2 = " select Instructor, id, Subject from Studio " + \
						 " where IsActive = True and RelevantYears = '3,4' "

				cur1.execute(query1)
				cur2.execute(query2)
			
				# dictionary of all the instructors and the studio they teach
				instructor_in_studio = {}
				# dictionary of all the students and the instructors that teached them in the past
				student_with_instructor = {}
				# dictionary of all studios with their subject
				subject_of_studio = {}

				for line in cur2.fetchall():
					studio      = line[1]
					instructor  = line[0]
					subject = line[2]

					if studio not in subject_of_studio:
						subject_of_studio[studio] = subject
					if studio in instructor_in_studio:
						instructor_in_studio[studio].append(instructor)
					else:
						instructor_in_studio[studio] = [instructor]

				# dictionary that count how many times student get the same subject
				counter = {}
				for line in cur1.fetchall():
					student     = line[0]
					studio      = line[1]
					instructor  = line[2]

					if student in student_with_instructor:
						student_with_instructor[student].append(instructor)
					else:
						student_with_instructor[student] = [instructor]

					if student in counter:
						if subject_of_studio[studio] in counter[student]:
							counter[student][subject_of_studio[studio]] += 1
						else:
							counter[student][subject_of_studio[studio]] = 1
					else:
						counter[student] = {subject_of_studio[studio]: 1}

				# check if student already been with specific instructor
				# if yes - he can't choose this instructor again
				for student, studios in rates.iteritems():
					for studio, rate in studios.iteritems():
						current_instructor = instructor_in_studio[studio]
						for item in current_instructor:
							if student in student_with_instructor:
								if item in student_with_instructor[student]:
									rates[student][studio] = 2000000
								else:
									continue

						# if student get 2 times the same subject of studio he can't choose him again
						if rates[student][studio] < 1000000:
							if student in counter and subject_of_studio[studio] in counter[student]:
								if counter[student][subject_of_studio[studio]] >= 2:
									rates[student][studio] = 1500000

			if year == 5:

				# get all the previous assigning of the students for studio
				# and for each studio- his subject
				query1 = " SELECT IdStudent, Studio, Subject " + \
						 " FROM StudentInStudio SIS, Studio S " + \
						 " WHERE SIS.IdStudent in (SELECT IdStudent " + \
												 " FROM Students		" + \
												 " WHERE CurrentYear = 5 and IsValid = True " + \
						 " and SIS.Studio = S.id " + \
						 " and S.RelevantYears = '3,4' "

				# get all the groups in the project course
				# for each group - his subject
				query2 = " SELECT id, Subject " +\
						 " FROM Studio " + \
						 " WHERE IsActive = True and RelevantYears = '5'"

				cur1.execute(query1)
				cur2.execute(query2)

				# dictionary of all the students with the subject they already choose
				subject_of_student = {}
				# dictionary of all studios with their subject
				subject_of_studio  = {}

				for line in cur1.fetchall():
					student = line[0]
					studio  = line[1]
					subject = line[2]

					if studio not in subject_of_studio:
						subject_of_studio[studio] = subject

					if student in subject_of_student:
						subject_of_student[student].append(subject)
					else:
						subject_of_student[student] = [subject]

				# dictionary of all groups in the project course with their subject
				subject_of_group_in_project = {}
				for line in cur2.fetchall():
					group   = line[0]
					subject = line[1]

					if group not in subject_of_group_in_project:
						subject_of_group_in_project[group] = subject

				# student can asign to a group in project only if he
				# took before studio with the same subject of the group
				# check for this condition :
				for student, groups in rates:
					for group, rate in groups:

						if rates[student][studio] < 1000000:
							if subject_of_group_in_project[group] in subject_of_student[student]:
								continue
							else:
								rates[student][studio] = 1000000

			return rates

		except Exception as e:
			self.errors['update_preferences_by_conditions'] = 'database error: ' + str(e)
			self.db.close()
			# print e

	def get_studio_id(self, year, semester):

		try:
			# Cursor object. you execute all the queries you need
			cur = self.db.cursor()

			# query for table Studio
			# need to take only from specific year and semester( date.today) in field where
			# IsActive = true
			if year == (3, 4):
				query = "SELECT id FROM Studio " + \
						"WHERE RelevantYears = '3,4' and Semester ='" + str(semester) + "' and IsActive = true "

			if year == 5:
				query = "SELECT id FROM Studio " + \
						"WHERE RelevantYears = '5' and Semester ='" + str(semester) + "' and IsActive = true "

			cur.execute(query)
			result = {}
			i = 1
			for line in cur.fetchall():
				result[i] = line[0]
				i += 1

			return result

		except Exception as e:
			self.errors['get_studio_id'] = 'database error: ' + str(e)
			self.db.close()
			print e

	def run_algorithm(self, year, semester, num_studios, rates, original_rates, list_id_studio, dic_studio):

		try:
			result = self.get_information_student(year, semester, num_studios, rates)
			# return student_general_average, student_studio_average, lb_female, lb_male, num_of_students,
			# num_of_female, num_of_male, lb_students, ub_students, students_information, general_average_calculation,
			# studio_average_calculation
			# list of general_average : [[id1,grade1],[id2,grade2],...]
			if result is None:
				self.errors['run_algorithm'] = 'no results from get_information_student'
				return False
			general_average = result[0]
			studio_average  = result[1]
			lb_female       = result[2] - 2
			if lb_female < 0: lb_female = 0
			lb_male         = result[3] - 2
			if lb_male < 0: lb_male = 0
			num_students    = result[4]
			num_of_female   = result[5]
			num_of_male     = result[6]
			lb_students     = result[7]
			ub_students     = result[8]
			students_information        = result[9]
			general_average_calculation = result[10]
			studio_average_calculation  = result[11]
			lb_general_average = general_average_calculation - 2
			ub_general_average = general_average_calculation + 2
			lb_studio_average  = studio_average_calculation - 2
			ub_studio_average  = studio_average_calculation + 2
			start_value = 100

			# initialize coefficients
			coeff_general_average_of_students = []
			for item in general_average:
				coeff_general_average_of_students.append(item[1])

			coeff_last_grade_in_studio = []
			for item in studio_average:
				coeff_last_grade_in_studio.append(item[1])

			# dictionary that save for each student his prefernces by permanent order
			coeff_preferences_of_students = {}

			# dictionary that save the map between the students id's and their index in the linear problem
			students_map = {}

			# that start value is where the index of the students start in the linear problem
			i = start_value
			# the list general_average keeps all the students in permanent order
			# we want all the coefficients to be in the same order of students
			for item in general_average:
				id_student = item[0]
				order_rates = []
				for id_studio in list_id_studio:
					order_rates.append(rates[id_student][id_studio])

				coeff_preferences_of_students[i] = order_rates
				students_map[i] = id_student
				# print str(i) +" " + str(id_student)
				i += 1

			# define the ranges of the subject variables in the linear programming 
			students = range(start_value,  start_value + num_students)
			studios = range(1, num_studios + 1)

			# Linear Programming
			# naming the problem
			prob = LpProblem("SchedulingProblem", LpMinimize)
			x = {}

			# define subject variables
			for i in studios:
				for j in students:

					x[i, j] = LpVariable(name= "x_%d_%d" %(i, j), cat= LpBinary)

			# define target function
			target_function = pulp.lpSum([coeff_preferences_of_students[j][i-1] * x[i,j] for j in students for i in studios])

			# initialize constraints
			# each student need to be in exactly 1 studio
			condition_each_student = {}
			for j in students:
				condition_each_student[j] = pulp.lpSum([x[i, j] for i in studios]) == 1

			# number of students in studio between lower bound to upper bound
			condition_num_student_in_studio1 = {}
			condition_num_student_in_studio2 = {}
			for i in studios:
				condition_num_student_in_studio1[i] = lb_students <= pulp.lpSum([x[i, j] for j in students])
				condition_num_student_in_studio2[i] = pulp.lpSum([x[i, j] for j in students]) <= ub_students

			# number of females in studio between lower bound to upper bound
			# female: 1-num_of_female
			if num_of_female > 0:
				condition_num_female_in_studio = {}
				range_females = range(start_value , start_value + num_of_female)
				for i in studios:
					condition_num_female_in_studio[i] = pulp.lpSum([ x[i, j] for j in range_females]) >= lb_female

			# number of males in studio between lower bound to upper bound
			# male: num_of_female+1-num_students
			if num_of_male > 0:
				condition_num_male_in_studio = {}
				range_males = range( start_value + num_of_female,  start_value + num_students)
				for i in studios:
					condition_num_male_in_studio[i] = pulp.lpSum([x[i, j] for j in range_males]) >= lb_male

			# average general grade in each studio
			condition_general_average1 = {}
			condition_general_average2 = {}
			for i in studios:
				numerator = pulp.lpSum([coeff_general_average_of_students[j-start_value-1] * x[i, j] for j in students])
				denominator = pulp.lpSum([x[i, j] for j in students])
				condition_general_average1[i] = lb_general_average * denominator <= numerator
				condition_general_average2[i] = numerator <= ub_general_average * denominator

			# average last studio grade in each studio
			condition_studio_grade1 = {}
			condition_studio_grade2 = {}
			for i in studios:
				numerator = pulp.lpSum([coeff_last_grade_in_studio[j-start_value-1]* x[i, j] for j in students])
				denominator = pulp.lpSum([x[i, j] for j in students])
				condition_studio_grade1[i] = lb_studio_average * denominator <= numerator
				condition_studio_grade2[i] = numerator <= ub_studio_average * denominator

			# add the target function to the problem
			prob += target_function

			# add the conditions to the problem
			for i in range(1, num_studios+1):
				prob += condition_num_student_in_studio1[i]
				prob += condition_num_student_in_studio2[i]
				if num_of_female > 0:
					prob += condition_num_female_in_studio[i]
				if num_of_male > 0:
					prob += condition_num_male_in_studio[i]
				prob += condition_general_average1[i]
				prob += condition_general_average2[i]
				prob += condition_studio_grade1[i]
				prob += condition_studio_grade2[i]

			for j in students:
				prob += condition_each_student[j]

			prob.writeLP("SchedulingProblem.lp")
			prob.solve()
			# print("Status:", LpStatus[prob.status])

			temp_solution = {}
			for v in prob.variables():
				# print(v.name, "=", v.varValue)
				value_variable = int(v.varValue)
				if value_variable == 1:
					temp_name 	  = v.name.split("_")
					student_index = int(temp_name[2])
					studio_id	  = temp_name[1]
					student_id 	  = students_map[student_index]

					if studio_id in temp_solution:
						temp_solution[studio_id].append(students_information[student_id])
					else:
						temp_solution[studio_id] = [students_information[student_id]]

			# write the solution to json format
			# when every studio have the following information: id of student and his preference of the studio,
			# average grade, average studio grade, number of female, number of male
			final_solution = []
			for studio, list_info in temp_solution.iteritems():
				sum_average      = 0
				sum_studio_grade = 0
				num_female       = 0
				num_male         = 0
				total_in_studio  = 0
				list_id_student  = []

				for item in list_info:
					total_in_studio += 1
					list_id_student.append([item["id"], original_rates[item["id"]][dic_studio[int(studio)]]])
					sum_average += item["average"]
					sum_studio_grade += item["grade in studio"]
					if item["gender"] == 'female':
						num_female += 1
					else:
						num_male += 1

				total_average        = float(sum_average / total_in_studio)
				total_studio_average = float(sum_studio_grade / total_in_studio)

				final_solution.append({"studio": dic_studio[int(studio)], "id_list": list_id_student, "general_average": total_average,
									   "studio_average": total_studio_average, "female": num_female, "male": num_male,
									   "total_in_studio": total_in_studio})

			final_solution.append({"errors": self.errors, "no_preferences": self.remark})

			#pprint.pprint(final_solution)
			print json.dumps(final_solution)
			return json.dumps(final_solution)

		except Exception as e:
			self.errors['run_algorithm'] = str(e)
			print e

	def sort_records(self, year, semester):

		try:
			if year in (3, 4):
				year = (3, 4)
			
			# get all the relevant studios
			# receive from db
			dic_studio  = self.get_studio_id(year, semester)
			list_studio = dic_studio.values()

			# create list of all the active studios
			# for line in list_studio:
			#     studios.append(line[0])

			preferences_dic = self.get_preferences(year, semester)
			if len(preferences_dic) == 0:
				self.errors['sort_records'] = 'the preferences are empty'
			# duplicate dictionaries of all rates per student
			# original_rates - for return the original prefernce of the
			# student in the solution
			rates		   = {}
			original_rates = {}

			# determine what is the bound for the preferences of the students
			# in year 3,4 - student can get only one of the first 4 preferences
			# in year 5 - student can get only one of the first 2 preferences
			if year == (3,4):
				bound = 4
			if year == 5:
				bound = 2

			# summarize all the rates for each studio
			num_of_studio = len(list_studio)
			for line in preferences_dic:
				# initialize rates = { id1 :{}, id2 :{},...}
				id_student 			= line[0]
				id_studio 			= line[1]
				rate, original_rate = line[2], line[2]

				# if the preference of the studio is rate greater then the bound - we don't want to
				# include him so we initialize the rate to 0
				if rate > bound:
					rate = 1000000
				if id_student in rates:
					rates[id_student][id_studio] 		  = rate
					original_rates[id_student][id_studio] = original_rate
				else:
					rates[id_student] 		   = {id_studio: rate}
					original_rates[id_student] = {id_studio: original_rate}

			# update preferences of students according to the desired conditions
			if year == (3, 4):
				new_rates = self.update_preferences_by_conditions(rates, year)
			elif year == 5:
				# for now the faculty didn't use this condition for assigning
				# so we ignore this section
				new_rates = rates

			result = self.run_algorithm(year, semester, num_of_studio, new_rates, original_rates, list_studio, dic_studio)
			if result is False:
				return json.dumps('no success')
			self.db.close()
			
		except Exception as e:
			self.errors['sort_records'] = str(e)
			self.db.close()

		return json.dumps(result)
		
>>>>>>> refs/remotes/origin/development
if __name__ == '__main__':

	# initialize object from type Algorithm
	algorithm = Algorithm()
	#x = algorithm.sort_records(3, 'spring')
	x = algorithm.sort_records(int(sys.argv[1]), sys.argv[2])

