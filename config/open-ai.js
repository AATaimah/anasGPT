import dotenv from 'dotenv';
import OpenAI from "openai";
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

export default openai;