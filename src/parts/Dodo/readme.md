Installation

* Install PostgreSQL (I installed 9.6 on Windows, if you are trying this on Linux, run PSQL to create a proper account after done), change postgres password to "postgres"

* Install JRE 8
* Download Camunda from https://camunda.org/download/ (I installed TomCat 8 zip)
* Extract the content of the camunda zip to a folder ( I picked C:\camunda-bpm-tomcat-latest\ )
* Find a postgresql jdbc driver (postgresql-42.1.1.jar) and put it in C:\camunda-bpm-tomcat-latest\server\apache-tomcat-8.0.24\lib
* Editing configuration file (C:\camunda-bpm-tomcat-latest\server\apache-tomcat-8.0.24\conf\server.xml) and modify the database connection
<pre>
  <Resource name="jdbc/ProcessEngine"
              auth="Container"
              type="javax.sql.DataSource" 
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              uniqueResourceName="process-engine"
              driverClassName="org.postgresql.Driver" 
              url="jdbc:postgresql://localhost:5432/camunda"
              defaultTransactionIsolation="READ_COMMITTED"
              username="postgres"  
              password="postgres"
              maxActive="20"
              minIdle="5" />
</pre>
 * Run "PgAdmin4" and connect to local server, creating an empty database, I named it "camunda"
 * On this empty database, execute the postgres_engine_7.7.0.sql and postgres_identity_7.7.0.sql from C:\camunda-bpm-tomcat-latest\sql\create
 * Now you can run start-camunda.bat from C:\camunda-bpm-tomcat-latest from command line and it will open several windows, that's fine. 
 * Check your localhost:8080 and you should see it up and running.

 * Clone https://github.com/rlrnd/Sparrow/tree/master/src/parts/Dodo (or just clone the whole https://github.com/rlrnd/Sparrow/)
 * Open the solution in VS.NET 2017 
 * Create dodoApp database in PgAdmin4 and execute db.sql from the root of the solution, it should create the tables for dodoApp
 * Build the whole solution and run the test InitializeData, which should populate some basic data into those tables.
  * In Dodo.web, and go admin/workflow, paste the whole xml from $solution/risk.bpmn.xml and click load and then click publish
 * Go to http://localhost:8080/camunda/app/cockpit/default/#/processes check if deployment is successful.
 * Then back to Dodo, go new/new incident, click submit, a new process should be created, you can see that in camunda cockpit
 * In Dodo.CamundaCompanion, set breakpoint in notificationAdapter.execute, it should hit right away since the first external task from the bpmn is system task. 
 * Set another breakpoint in program.cs, line#117, Let the execution resume, it will stop here. This is where we got the human tasks from Camunda and create our own tasks. (Based upon the file content and task parameters)
 * Once completed, switch back to Dodo.Web, go /tasks, you should see a task link there.
 * click on the task, it should bring you to a fake follow-up form, check the "complete the task" and click "submit"
 * You should notice the notification.execute get called again, this is the 2nd external system task.

 Conclusion:
 * A BA editable BPMN can be deployed and executed using a hybrid of camunda and C# code.
 * Both system tasks (without waiting) and human  tasks (need to wait) can be retrieved and executed.
 * ProcessInstance can be created when submission happens.
 * When human tasks completes, process will continue.
 
 Guesses:
 * Eliminate the need of camundaCompanion using Java code and deploy directly into engine? 
 * Which way to go? Using their security/multi-tenancy or our own?

 Next Steps:
 * Bug while execute both in debug mode in same VS.NET. 
 * Need to ensure same task doesnot get imported twice.
 

