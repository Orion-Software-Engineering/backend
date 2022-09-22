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
    "roles": [
        " "
    ],
    "id": "",
    "username": "",
    "email": " ",
    "accessToken": ""
}
```

### Sign Up

End Point: /api/auth/signup <br>
Method: POST <br>
Request Body: <br>

NB: with gender male == true and female == false

```json
{
    "username": " ",
    "email": " ",
    "password": " ",
    "dob": " ",
    "gender": "true",
    "roles": [
        " ",
        " ",
        " "
    ]
}
```

NB: When user signs up a mail is sent to their email address for email verification. For calls made from the
app, ```roles...``` should be omitted.<br>
Response: 200 Ok<br>

```json
{
    "message": "user registered successfully",
    "userId": " "
}
```

NB: When user signs up a mail is sent to their email address for email verification. For calls made from the
app, ```roles...``` should be ommitted.

### Request For Re-setting Password

End Point: /api/resetPassword <br>
Method: POST <br>
Request Body:

```json
{
    "email": " "
}
```

Response: 200 Ok <br>
```Password Reset link has been sent to your mail. ```

### Request For Admin Content

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

### Request For Public Content

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

### Request For Moderator Content

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

### Request For User Content

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

### Get User Matches

End Point: /api/test/matches/ID <br>
Method: GET <br>
No request body. <br>

### Listing All Users

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

### Get Username From ID

End Point: /api/user <br>
Method: GET <br>
Request Body:

```json
{
    "userId": ""
}
```

### Get User Profile

End Point: /api/user/profile/ID <br>
Method: GET <br>
Request Body: null

### Update User Bio

End Point: /api/user/bio <br>
Method: POST <br>
Request Body: <br>

```json
{
    "userId": "",
    "bio": ""
}
```

### Interests

NB: "ID" is the user ID for the user.

#### Get Interests Of A User.

End Point: /api/interest/ID <br>
Method: GET <br>

#### Set Interests Of A User.

End Point: /api/interest/ID <br>
Method: POST <br>
Request Body:

```json
{
    "interests": [
        "sports",
        "photography",
        "comedy"
    ]
}
```

Response: 200 Ok <br>

```json
[
    [
        {
            "userId": " ",
            "roleId": " ",
            "createdAt": " ",
            "updatedAt": " "
        }
    ]
]
```

#### Adding Interests For A User.

End Point: /api/interests/ID <br>
Method: PUT <br>
Request Body:

```json
{
    "interests": [
        "science"
    ]
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

#### Removing Interests For A Particular User.

End Point: /api/interests/ID <br>
Method: DELETE <br>
Request Body:

```json
{
    "interests": [
        "sorts"
    ]
}
```

### Instant Messaging

#### Create Conversation

End Point: /api/conversation/ <br>
Method: PUT <br>
Request Body:

```json
{
    "userId": ""
}
```

#### Get Conversation

End Point: /api/conversation/:conversationId <br>
Method: GET <br>
Request Body: null

#### Get Message

End Point: /api/message/ID <br>
Method: GET <br>
Request Body: null

#### Get Messages From Conversation

End Point: /api/messages/ID <br>
Method: GET <br>
Request Body: null

#### Get Last Message From Conversation

End Point: /api/message/last/:ID <br>
Method: GET <br>
Request Body: null

#### Add Message To Conversation

End Point: /api/messages/ <br>
Method: PUT <br>
Request Body:

```json
{
    "userId": "",
    "messageText": "",
    "conversationId": ""
}
```

#### Remove Message From Conversation

End Point: /api/message <br>
Method: DELETE <br>
Request Body:

```json
{
    "messageId": ""
}
```

Response: 200 Ok <br>
```1```

#### Add User To Conversation

End Point: /api/conversation/user <br>
Method: PUT <br>
Request Body:

```json
{
    "userId": "",
    "conversationId": ""
}
```

### Events

#### Upload Event

End Point: /api/event <br>
Method: POST <br>
Request Body: <br>

```json
{
    "name": "",
    "date": "",
    "time": "",
    "venue": "",
    "location":  "longitude latitude",
    "organizers": "",
    "mcs": "",
    "guests": "",
    "age_restriction": "",
    "description": "",
    "organizer": "",
    "cover_image": "",
    "ticket_price": decimal,
    "interests": [
        "",
        "",
        ""
    ]
}
```

#### Get Event

End Point: /api/event/id <br>
Method: GET <br>

#### Get All Events

End Point: /api/events <br>
Method: GET <br>

#### Delete Event

End Point: /api/event/id <br>
Method: DELETE <br>

#### Update Event

End Point: /api/event/id <br>
Method: PUT <br>
Request Body: <br>

```json
{
    "name": "",
    "date": "",
    "time": "",
    "venue": "",
    "location": "latitude longitude",
    "organizers": "",
    "mcs": "",
    "guests": "",
    "age_restriction": "",
    "description": "",
    "organizer": "",
    "cover-image": "",
    "ticket_price": decimal,
    "interests": [
        "",
        "",
        ""
    ]
}
```

## Get event matches
End Point: /api/events/:id <br>
Method: GET <br>
No Request Body.

## Like an event
End Point: /api/event/like <br>
Method: POST <br>
Request Body: <br>
```json
{
  "eventId": "",
  "userId": ""
}
```

## Unlike and event
End Point: /api/event/unlike <br>
Method: POST <br>
Request Body: <br>
```json
{
  "eventId": "",
  "userId": ""
}
```

## Get number of likes for an event
End Point: /api/event/likes/:id <br>
Method: GET <br>
No Request Body

#### Remove User From Conversation

End Point: /api/conversation/user <br>
Method: DELETE <br>
Request Body: <br>

```json
{
    "userId": "",
    "conversationId": ""
}
```

#### Get Users of Conversation

End Point: /api/conversation/users/all/ID <br>
Method: GET <br>
Request Body: null <br>

#### Get Conversations Of User

End Point: /api/conversation/user/all/ID <br>
Method: GET <br>
Request Body: null <br>

#### Delete user Account

End Point: /api/account/delete <br>
Method: POST <br>
Request Body: <br>
```json
{
  "usedId" : "",
  "username": "",
  "password": ""
}
```

