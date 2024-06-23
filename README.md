# ft_transcendence

Project contains the following modules

Web
- Major module: Use a Framework as backend.
- Minor module: Use a front-end framework or toolkit.
- Minor module: Use a database for the backend.

User Management
- Major module: Implementing a remote authentication.

AI-Algo
- Major module: Introduce an AI Opponent.

Cybersecurity
- Major module: Implement Two-Factor Authentication (2FA) and JWT

Devops
- Major module: Designing the Backend as Microservices.

Accessibility
- Minor module: Expanding Browser Compatibility.
- Minor module: Multiple language supports.


# API DOC

`POST` /api/loginWithIntra
## Request
```
{
  code: "I43HBU94H939H439UFH32FD2F2"
}
```
## Reponse
```
{
  status: "OK"
  access-token: "VU3RVY832RFV8238F2IFJ3WIBFU33F3F"
}
```

`GET` /api/me
## Header
```
{
  access-token: "VU3RVY832RFV8238F2IFJ3WIBFU33F3F"
}
```
## Response
```
{
  username: "fkhan",
  is2faEnabled: false,
  language: "EN"
}
```

`POST` /api/save-settings
## Header
```
{
  access-token: "VU3RVY832RFV8238F2IFJ3WIBFU33F3F"
}
```
## Request
```
{
  is2faEnabled: true,
  language: 'EN'
}
```
## Response
```
{
  status: "OK"
}
```
