# Project Abstract

This project is based upon the camunda-dot-net-showcase example provided by Camunda. The purpose is to explore the possibility of build an C#/Asp.Net Core application around an end-user customizable workflow engine.

# How to get it working

* Download camunda community version. [https://camunda.org/release/camunda-bpm/tomcat/7.7/camunda-bpm-tomcat-7.7.0.zip]
* (Optional) - if you need to play it on PgSQL, you need to do several things:
  * change the jdbc configuration in server\apache-tomcat-8.0.24\conf\server.xml, change the following node to 
    <Resource name="jdbc/ProcessEngine"
              auth="Container"
              type="javax.sql.DataSource" 
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              uniqueResourceName="process-engine"
              driverClassName="org.postgresql.Driver" 
              url="jdbc:postgresql://localhost:5432/{YourDbNameWithoutBracket}"
              defaultTransactionIsolation="READ_COMMITTED"
              username="postgres"  
              password="postgres"
              maxActive="20"
              minIdle="5" />
  * Copy the postgresql JDBC drvier [https://jdbc.postgresql.org/download/postgresql-42.1.1.jar] to server\apache-tomcat-8.0.24\lib
  * Create the postgreSQL database your self and run sql\create\postgres_engine_something.sql  and postgres_identity_something.sql
* The designer can be find at [https://camunda.org/download/modeler/]. The web designer can be find at [https://github.com/bpmn-io/bpmn-js]. Run the exe version and open testRule.bpm in WorkflowCompanion. 

* Now you can run start-camunda.bat
* Run the code WorkflowCompanion in VS.NET

# Key concepts

* Workflow - A BPMN 2.0 file, could be edited in web modeler, it is a flow-chart and an XML file. A workflow can call other workflow, or can call complex logic function (DMN) 
* Deployment - We can deploy one or many workflow file to the Camunda REST server, which later can be used by application.
* Instance - We can create an instance of a given workflow, which will execute the flow-chart and do all the automation. It can be viewed as a long running thread. 
* ServiceTask - In the flowchart, some tasks are carried out automatically (i.e. Notifying Patient),  these tasks can be carried out in C# code. (NotificationAdapter.cs). Once executed, the flow continues.
* UserTask - Other tasks are specifically assigned to a person, which until it is specifically marked as "complete", the flow will wait. In this case, we want to create rlx task if a new user task is created and figure out who to assigned to (using tenantId, locationId, roleName...) and complete the camunda task once the rlx task is completed. 

# More works to be done

* Not using Camunda's buildin security mechanism might limit our ability to expose any of the cockpit functionalities. need to check.
* There is no call back, both service tasks and user tasks are polled by C# code. Maybe it's better to write a tiny TaskListener in Java and configure the camunda to call it. Similar to [https://github.com/camunda/camunda-bpm-reactor/tree/master/examples/bpmn-task-listener]


