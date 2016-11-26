import os
import csv
import mysql.connector
from datetime import datetime
import sys

class ArcDBInsert():
    
	def __init__(self):
        
		# Connect to MySQL
		self.db = mysql.connector.connect(	host="127.0.0.1",    # your host, usually localhost
											user="root",         # your username
											password="Password1", # your password
											database="sakila")    # name of the data base
  
	def insert_ids(self, file_path):		

		cur = self.db.cursor()
		# taking all the files from the folder
		#filelist = [ f for f in os.listdir(file_path) ]
		  
		# Going over the files
		#for curr_file in filelist:
		      
		try:
			# Reading the curr_file and save the result to the table MobileIntentResults
			f = open(file_path , 'rb')
			reader = csv.reader(f)

			for row in reader:
				id         = row[0]
				created_at = datetime.now()
				updated_at = datetime.now()

				# read results from file and write the results to the table
				query = ("""
						Insert into tz (id, createdAt, updatedAt) values(%s, %s, %s)
						""")
				cur.execute(query, (int(id), str(created_at), str(updated_at) ))

			self.db.commit()

			return "done"
		except Exception as e:
			return "error: could not open file " + str(file_path)

if __name__ == '__main__':
 
	insert_class = ArcDBInsert()
	result = insert_class.insert_ids(sys.argv[1])
