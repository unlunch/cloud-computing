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

## Forgot User API

Endpoint : POST /api/user/forgot-password

Request Body :

```json
{
    "email": "rahasia@gmail.com"
}
```

Request Body Success :

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

Request Body Error :

```json
{
    "message": "Email Not Registered"
}
```

## Forgot User Verify API

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
