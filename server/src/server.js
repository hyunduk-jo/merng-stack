import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import morgan from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middleware';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(authenticateJwt);


const server = new ApolloServer({ schema, context: ({ req }) => ({ req, isAuthenticated }) })

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGO_STRING, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, () => console.log(`✅ MongoDB Connected`));
app.listen(PORT, () => console.log(`🚀 Server Running on http://localhost:${PORT}/graphql`));