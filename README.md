# Pagination

#### Server side: Node.js with express
#### Client side: React

## Server
A simple application that reads 2 large json files,   
each file stores information about users.  
the server reads the json files and match users from both files.

## Client 
display a users table with the data received from the server.  
Becuase of the large size of the json file , i've implemented Pagination.  
UI options:
- next / previos buttons.
- goto specific page number.
- change number of records per page.
