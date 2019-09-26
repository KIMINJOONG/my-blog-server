import '@babel/polyfill';
import "./db";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import http from 'http';
import https from 'https';
import fs from 'fs';

const PORT = process.env.PORT || 3000;

// const handleListening = () =>
  // console.log(`Listening on: http://localhost:${PORT}`);

// app.listen(PORT, handleListening);
const options = {
  key: fs.readFileSync(process.env.KEY),
};

http.createServer(app).listen(PORT);

https.createServer(options,app).listen(443);
