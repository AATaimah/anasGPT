import dotenv from 'dotenv';
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI();

export default openai;