1. Register as a new employer using "name": and "password"
2. Login with the credentials and get the token in response;
3. Access the /employees page by sending the token in either  req.body.token, req.query.token or req.headers["x-access-token"]