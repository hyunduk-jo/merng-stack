import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateSecret = () => {
  const random = Math.floor(Math.random() * nouns.length);
  return `${adjectives[random]} ${nouns[random]}`;
}

const sendMail = (email) => {
  const auth = {
    auth: {
      api_key: process.env.MG_API_KEY,
      domain: process.env.MG_DOMAIN
    }
  }
  const client = nodemailer.createTransport(mg(auth));
  return client.sendMail(email);
}

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'merng@test.com',
    to: address,
    subject: "Test mail Secret",
    html: `${secret}`
  }
  return sendMail(email);
}

export const generateToken = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET);