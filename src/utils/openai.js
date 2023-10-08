import OpenAI from 'openai';
import { OPENAI_GPT_KEY } from './constants';

const openai = new OpenAI({
	apiKey: OPENAI_GPT_KEY, // defaults to process.env["OPENAI_API_KEY"]
	dangerouslyAllowBrowser: true
});

export default openai;
