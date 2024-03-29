import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;
  const promptArray = prompt.split('---');

  const genAI = new GoogleGenerativeAI(env.API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const streamingResponse = await model.generateContentStream(`Explain Like I am ${promptArray[1]}: ` + promptArray[0]);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}