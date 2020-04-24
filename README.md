# Courza

## WORK IN PROGRESS

Find and discuss course-related topics and resources easily!

Will support course-wide polls, file uploads, chat groups and maybe more.

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

This starts up the Webpack dev bundler and runs the server. Make sure the `mongod` service is running (you can start it with `sudo service mongod start`).

If the app runs fine, you should see the following lines logged at the end:

```
[server] Started server at port 8000
[db] Successfully connected to database.
```

### Starting the web-app

```
cd web
yarn start
```

**Note:** Chrome has a security feature that disables setting cookies on localhost, so login will not work. To work around this, run Chrome with web security disables as follows:

`google-chrome --disable-web-security --user-data-dir=<some temp dir>`

There are alternative workarounds mentioned on the web. If you can get any to work, please share!
