import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config';
import readline from "readline/promises";
import {HumanMessage ,tool,createAgent} from "langchain"
import * as z from "zod"
import { sendEmail } from "./mail.services.js";


const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const emailTool=tool(
  sendEmail,
  {
    name:'email_tool',
    description:"use this tool to send email",
    schema:z.object({
      to:z.string().describe("the recipient's email"),
      subject:z.string().describe("subject of email"),
      html:z.string().describe("the HTML content of the email (information)")
    })
  }
)

const agent=createAgent({
  model,
  tools:[emailTool]
})
const messages=[];
export async function testAI() {
  while(true){
      const userInput=await rl.question("you:-")
      messages.push(new HumanMessage(userInput))
      const response=await agent.invoke({messages})
      // messages.push(response.content)
       console.log(response.messages[response.messages.length-1].text)
      // console.log(response)
  }
  rl.close()
}