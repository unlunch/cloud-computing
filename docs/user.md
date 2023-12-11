# User API Spec

## Register User API

Endpoint : POST /api/user/register

Request Body :

```json
{
    "name": "john",
    "email": "john@example.com",
    "password": "rahasia",
    "phone": "+6285312345678"
}
```

Response Body Success :

```json
{
    "data": {
        "id": "unique-uuid",
        "name": "john",
        "email": "john@example.com"
    },
    "message": "Registration successful. Please check your email for verification."
}
```

Response Body Error :

```json
{
    "errors": "Email already registered"
}
```

## Email Verification User

Endpoint : GET /api/user/verify/:id/:token

Response Body Success :

```json
{
    "message": "Email verification successful, please log in."
}
```

Response Body Error :

```json
{
    "errors": "Invalid verification token."
}
```

## Login User API

Endpoint : POST /api/user/login

Request Body :

```json
{
    "email": "rahasia@gmail.com",
    "password": "rahasia"
}
```

Response Body Success :

```json
{
    "data": {
        "token": "unique-token"
    },
    "message": "Log in Successful"
}
```

Response Body Email Error :

```json
{
    "message": "Email Not Registered"
}
```

Response Body Password Error :

```json
{
    "message": "Email or password wrong"
}
```

Response Body if JWT token Already :

```json
{
    "data": {
        "statusLogin": true
    },
    "message": "You are logged."
}
```

### ========================================

# LUAR PAGE

## Forgot User API

<!-- lagi dipikirkan  -->

Endpoint : POST /api/user/forgot-password

Request Body :

```json
{
    "email": "rahasia@gmail.com",
    "redirect_url": "myandroidapp://path/to/formupdatepassword"
}
```

Response Body Success :

```json
{
    "data": {
        "id": "unique-uuid",
        "token": "unique-token",
        "email": "rahasia@gmail.com"
    },
    "message": "Please check your email for verification."
}
```

Response Body Error :

```json
{
    "message": "Email Not Registered"
}
```

## Forgot User Verify API

### Gak jadi

Endpoint : GET /api/user/forgot-password/verify/:id/:token

Response Body Success :

```json
{
    "message": "Email verification successful."
}
```

Response Body Error :

```json
{
    "errors": "Invalid verification token."
}
```

### ========================================

## Current User API

Endpoint : GET /api/user/current-login

Response Success :

```json
{
    "Message": {
        "id": "uuid",
        "name": "john smith",
        "email": "example@gmail.com ",
        "token": "unique-token"
    }
}
```

Response Error :

```json
{
    "errors": "Invalid or expired verification token, Please Login."
}
```

### =======================================

## Update Password User API

Endpoint : POST /api/user/forgot-password

Request Body :

```json
{
    "password": "rahasia"
}
```

Response Body Success :

```json
{
    "message": "Password has been changed."
}
```

Response Body Error :

```json
{
    "errors": "Password cannot be changed."
}
```

### ========================================

## Logout USER API

Endpoint : POST /api/user/logout/:token

Headers :

-   Authorization : token

Response Body Success :

```json
{
    "message": "you have logged out"
}
```

Response Body if Token not ready :

```json
{
    "errors": "User not found."
}
```

## Update Password USER API

Endpoint : POST /api/user/logout/:id

Headers :

-   Authorization : token

Request Body :

```json
{
    "password": "rahasia",
    "password_confirmation": "rahasia"
}
```

Response Body Success :

```json
{
    "message": "successfully changed the password"
}
```

Response Body Error if password_confirmed not :

```json
{
    "errors": "\"password_confirmation\" does not match"
}
```
