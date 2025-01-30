import os,sys

try:
    import pymysql, bcrypt
except:
    os.system("pip install bcrypt pymysql")

db_host = input('Enter database host : ')
db_username = input('Enter database username : ')
db_password = input('Enter database password : ')
db_name = input('Enter database name : ')
admin_username = input('Enter admin username : ')
admin_password = input('Enter admin password : ')

if sys.argv[0] not in os.listdir(os.getcwd()):
    env_file = f"""
    PORT=3000

    DB_HOST={db_host}
    DB_USERNAME={db_username}
    DB_PASSWORD={db_password}
    DB_NAME={db_name}

    JWT_SECRET=testOneTwoThreeFour
    """

    with open(".env","w") as file:
        file.write(env_file)
        file.close()


salt = bcrypt.gensalt(10)
enc_hashed_password = bcrypt.hashpw(admin_password.encode(), salt)
hashed_password=enc_hashed_password.decode()

conn = pymysql.connect( 
    host=db_host, 
    user=db_username, 
    password = db_password, 
    db=db_name, 
    )

cur = conn.cursor() 
cur.execute("INSERT INTO users (username,password) VALUES (%s,%s)",(admin_username,hashed_password)) 
output = conn.commit()  
conn.close()