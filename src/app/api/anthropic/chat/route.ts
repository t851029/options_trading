import { AnthropicStream, StreamingTextResponse } from 'ai';
import { anthropic } from '@anthropic-ai/sdk';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const anthropicClient = new anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const response = await anthropicClient.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1000,
    messages,
    stream: true,
  });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}
