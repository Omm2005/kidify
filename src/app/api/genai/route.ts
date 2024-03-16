import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";
export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  console.log(reqBody);
  const prompt = reqBody.data.prompt;

  const genAI = new GoogleGenerativeAI(env.API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
  const streamingResponse = await model.generateContentStream("Explain Like I am 5: " + prompt);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}