# Courza

## WORK IN PROGRESS

Find and discuss course-related topics and resources easily!

Will support course-wide polls, file uploads, thread groups and maybe more.

## Instructions

You need Node and Yarn installed on your system.

### Setting up keys

Create the directory `src/server/keys`, and add two new files `public.key` and `private.key`.

Generate a 512-bit RSA key pair, and store the public key in `public.key`, and private key in `private.key`, in PEM format.

### Running the server

To run the server:

```
cd server
yarn start
```

This starts up the Webpack dev bundler and runs the server. Make sure the MongoDB service is running on your system.

If the app runs fine, you should see the following lines logged at the end:

```
[server] Started server at port 8000
[db] Successfully connected to database.
[aws] Credentials loaded successfully
```

### Starting the web-app

```
cd web
yarn start
```
