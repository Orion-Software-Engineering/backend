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

### Sign Up

End Point: /api/auth/signup <br>
Method: POST <br>
Request Body: <br>

```json
{
    "username": " ",
    "email": " ",
    "password": " ",
    "dob": " ",
    "roles": [
        " ",
        " ",
        " "
    ]
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

### Listing All Users

End Point: /api/test/users <br>
Method: GET <br>

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

End Point: /api/user/profile <br>
Method: GET <br>
Request Body:

```json
{
    "userId": ""
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

End Point: /api/message Method: GET <br>
Request Body:

```json
{
    "messageId": ""
}
```

#### Get Messages From Conversation

End Point: /api/messages Method: GET <br>
Request Body:

```json
{
    "conversationId": ""
}
```

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

#### Remove User From Conversation

End Point: /api/conversation/user <br>
Method: DELETE <br>
Request Body:

```json
{
    "userId": "",
    "conversationId": ""
}
```

#### Get Users of Conversation

End Point: /api/conversation/users/all <br>
Method: GET <br>
Request Body:

```json
{
    "conversationId": ""
}
```

#### Get Conversations Of User

End Point: /api/conversation/user/all <br>
Method: GET <br>
Request Body:

```json
{
    "userId": ""
}
```
