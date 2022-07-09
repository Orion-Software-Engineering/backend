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
    "roles" : [" "," ", " "]
}
```
NB: When user signs up a mail is sent to their email address for email verification. For calls made from the app, ```roles...``` should be ommitted.

### 
