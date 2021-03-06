import '@babel/polyfill';
import './db';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
