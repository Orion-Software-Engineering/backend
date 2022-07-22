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

NB: When user signs up a mail is sent to their email address for email verification. For calls made from the
app, ```roles...``` should be ommitted.

### Request for re-setting password

End Point: /api/resetPassword <br>
Method: POST <br>
Request Body:

```json
{
  "email" : " "
}
```

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

### Interests

NB: "ID" is the user ID for the user.

#### Get interests of a user.

End Point: /api/interest/ID <br>
Method: GET <br>

#### Set Interests of a user.

End Point: /api/interest/ID <br>
Method: POST <br>
Request Body:

```json
{
    "interests" : ["sports","photography","comedy"]
}
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

#### Removing interests for a particular user.

End Point: /api/interests/ID <br>
Method: DELETE <br>
Request Body:

```json
{
    "interests":["sorts"]
}
```

