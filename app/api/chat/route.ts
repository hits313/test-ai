import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages, apiKey } = await req.json();

  const systemMessage = {
    role: 'system',
    content: `You are Cybercook-o1, an AI assistant specializing in cybersecurity. You help students and IT professionals with topics related to blue team, red team, compliance, purple team, and general cybersecurity concepts. Provide informative and engaging responses to help users learn in a fun way. If you're unsure about something, admit it and suggest where the user might find more information.`
  };

  const result = streamText({
    model: openai('gpt-4-turbo', apiKey),
    messages: [systemMessage, ...messages],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return result.toDataStreamResponse();
}