# SSL certificate based mutual authentication

Inspired by [this article](https://engineering.circle.com/https-authorized-certs-with-node-js-315e548354a2)

* API is written in nodejs.  
* Using OpenSSL for self-signing certificate (Need to using FIPS140-2?)
* Using local revoke list
* Can throw message onto Kafka queue (not done yet)
* We still need to verify the incoming clientID from the client certificate

* The client side is written in C#.
* Need to convert key/cer from separate PEM file to pfx format. (First comment in main function)
* How to verify if server is good?
* Using the [previous example](https://svn.rlsolutions.com/svn/research/Phoenix/Jsonizer/Program.cs) for serialize MetaDataSet into JSON? 


