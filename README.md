# Orion Meet Backend
⚡Express

<br>

### Production ✨
Reviewed and tested stable app version
https://orion-meet.herokuapp.com/

### Testing 💫
Staging area for new features
https://orion-meet-testing.herokuapp.com/

<br><br>

## API Documentation
Main URL: https://orion-meet.herokuapp.com/

### Sign In
End Point: /api/auth/signin <br>
Method: POST <br>
Request Body:<br>
```json 
{
    "username" : " ",
    "password" : " "
}
```
Response: 200 Ok <br>
```json
{
  "roles" : [" "],
  "id" : "",
  "username" : "",
  "email" : " ",
  "accessToken" : ""
}
```

### Sign up
End Point: /api/auth/signup <br>
Method: POST <br>
Request Body: <br>
```json
{
    "username" : " ",
    "email" : " ",
    "password" : " ", 
    "dob": " ",
    "roles" : [" "," ", " "]
}
```
NB: When user signs up a mail is sent to their email address for email verification. For calls made from the app, ```roles...``` should be committed.<br>
Response: 200 Ok<br>
```json
{
  "message" : "user registered successfully",
  "useId" : " "
}
```

### Request for re-setting password
End Point: /api/resetPassword <br>
Method: POST <br>
Request Body:
```json
{
  "email" : " "
}
```
Response: 200 Ok <br>
```Password Reset link has been sent to your mail. ```

### Request for admin content.
End Point: /api/test/admin <br>
Method: GET <br>
Request Header:
```
Host
User-Agent
Accept
Accept-Encoding
Connection
x-access-token
```
NB: In Request headers access token for the admin should be set in order to make a successful request.

### Request for public content
End Point: /api/test/all <br>
Method: GET <br>
Request Header:
```
Host
User-Agent
Accept
Accept-Encoding
Connection
```

### Request for moderator content
End Point: /api/test/mod <br>
Method: GET <br>
Request Header:
```
Host
User-Agent
Accept
Accept-Encoding
Connection
x-access-token
```

### Request for user content
End Point: /api/test/all <br>
Method: GET <br>
Request Header:
```
Host
User-Agent
Accept
Accept-Encoding
Connection
x-access-token
```

### Listing all users .
End Point: /api/test/users <br>
Method: GET <br>
Request Headers: <br>
```
x-acces-token
```
Response: 200 Ok <br>
```json
{
  "users": [
    {
      "id": " ",
      "username": " ",
      "password": " ",
      "dateOfBirth": " ",
      "isMailVerified": " ",
      "createdAt": " ",
      "updatedAt": " "
    }
  ]
}
```

### Interests
NB: "ID" is the user ID for the user.

#### Set Interests of a user.
End Point: /api/interest/ID <br>
Method: POST <br>
Request Body:
```json
{
    "interests" : ["sports","photography"]
}
```
Response: 200 Ok <br>
```json
[
  [
    {
      "userId" : " ",
      "roleId" : " ",
      "createdAt" : " ",
      "updatedAt" : " "
    }
  ]
]
```

#### Adding Interests for a particular user.
End Point: /api/interests/ID <br>
Method: PUT <br>
Request Body:
```json
{
"interests" : ["science"]
}
```
Response: 200 Ok<br>
```json
[
    {
        "userId": " ",
        "roleId": " ",
        "createdAt": " ",
        "updatedAt": " "
    }
]
```

#### Removing interests for a particular user.
End Point: /api/interests/ID <br>
Method: DELETE <br>
Request Body:
```json
{
    "interests":["sorts"]
}
```
Response: 200 Ok <br>
```1```

#### Request for all interests of a particular user
End Point: /api/interests/ID <br>
Method: GET <br>
Response: 200 Ok <br>
```json
[
    {
        "id": " ",
        "name": " ",
        "createdAt": " ",
        "updatedAt": " ",
        "user_interests": {
            "createdAt": " ",
            "updatedAt": " ",
            "userId": " ",
            "roleId": " "
        }
    }
]
```
