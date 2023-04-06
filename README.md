# Project 2 - Animal Training App

## Description
For this project, you will create an animal training management app! Your job for the app, is to build out backend functionality to manage different users, animals, and training logs. Schemas for these data models can be found in `Schemas.md`

## Submission
- Present your final project during lecture on 4/13/2023
- **Due: 4/13/2023**

## Getting Started
- Fork this repository into your own account
- Install the Dependencies: `npm install`
- create a `.env.local` file in the root for your environment variables
- Start the HTTP server: `npm run dev`
- Navigate to `localhost:3000/`
- To test your API we recommend using [Postman](https://www.postman.com)

## Level 0: Setup
- (0) Setup a MongoDB database - **Complete**
- (1) Create a GET endpoint at `/api/health` to test whether your API server is functioning and healthy
    - This can return a JSON with `{"healthy": true}` - **Complete**

## Level 1: Easy
- (2) Create a POST endpoint at `/api/user` to create a user in the database based on information passed into the body - **Complete**
- (3) Create a POST endpoint at `/api/animal` to create an animal in the database based on information passed into the body - **Pennon In Progress**
- (4) Create a POST endpoint at `/api/training` to create a training log in the database based on information passed into the body - **Complete**
- Note these requests will have a similar request body and response statuses:
    - Body: A JSON containing the user/animal/training log information for the user/animal/training log we want to create
    - Response:
        - **Status 200 (Success):** If the body contains all of the information and is able to create the user/animal/training log
        - **Status 400:** If the body contains incorrect information
        - **Status 500:** For any other errors that occur

## Level 2: Medium
- (5) In the training log creation endpoint (3), we want to add in a check to ensure that the animal specified in the training log belongs to the user specified in the training log. Add in code to do this. - **Parker**
    - Response:
        - **Status 400:** If the training log animal is not owned by specified user
- We want to add admin functionality to this backend API to allow the admins to view all the data in the database
    - (6) Create a GET endpoint at `/api/admin/users` which will return all of the users in the database (not with their passwords) - **Complete**
    - (7) Create a GET endpoint at `/api/admin/animals` which will return all of the animals in the database - **Complete**
    - (8) Create a GET endpoint at `/api/admin/training` which will return all of the training logs in the database - **Complete**
    - Response:
        - **Status 200 (Success):** If we are able to retrieve the users/animals/training logs
        - **Status 500**: For any other errors
    - **Note:** These endpoints must implement pagination -- ideally using the document IDs or some other property that has natural ordering (i.e. take a look at approach 2 in this [article](https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr))
- (9) We want to create a resuable middleware function that takes in an `allowedMethods` array of strings i.e. `['POST', 'GET', 'DELETE']` and a `method` string with the current method being used in the request. This function should check if `method` is in `allowedMethods` - **Justin In Progress**
	- Response
		- **Status 400**: If the request `method` is not in `allowedMethods`
		- **return NextResponse.next()** - let the request through

## Level 3: Hard
- (10) We want to add user authentication. In the user creation endpoint (1), add code that allows a password to be accepted. Encrypt this password using an encryption library (we recommend using [bcrypt](https://www.npmjs.com/package/bcrypt)) and save it in the database under the user's password field
- (11) Create a POST endpoint at `/api/user/login` that accepts an email and password and tests whether the password is valid for the given email.
    - Response:
        - **Status 200 (Success):** If the email/password combo is valid
        - **Status 403**: If the email password combo is invalid
- (12) We are going to make our application even more secure by adding JSON Web Token (JWT) functionality to secure our endpoints. Create a POST endpoint at `/api/user/verify` that issues a JSON Web Token to the user if they issue the correct email/password combination.
    - Response:
        - **Status 200 (Success):** If the email/password combo is valid + issue a JWT that includes the entirety of their profile information
        - **Status 403**: If the email password combo is invalid
- (13) In each of our endpoints, verify the JWT and only allow execution of the endpoint if the JWT is not expired and is valid 
- (14) Because the JWT includes information about the user making the request, refactor your endpoints to draw information from the JWT rather than the body of the request
    - i.e. we no longer need to manually specifiy a user id when creating a service animal beacuse we can pull from the info encoded into the JWT.
    
## Level 4: Above and Beyond
- Create a frontend for the application using React. Add styling, components, pagination UI, search boxes, etc.
