FROM tomcat:8.0.20-jre8
EXPOSE 8080
COPY tomcat-users.xml /usr/local/tomcat/conf
COPY target/*.war /usr/local/tomcat/webapps/praveen.war
