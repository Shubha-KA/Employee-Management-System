FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=root123
ENV MYSQL_DATABASE=employee_db
ENV MYSQL_USER=ems_user
ENV MYSQL_PASSWORD=ems_pass

# This is the key line 👇
COPY init.sql /docker-entrypoint-initdb.d/