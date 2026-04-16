import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req) {
  const state = await req.json();

  const client = new Anthropic();

  const prompt =
    'take the below redux state tree, summarize and consolidate the notes if they have things in common, ' +
    'then return a new state tree that holds the new notes and sets their x&y coordinates for a nice layout. ' +
    'Do not add any intro message, e.g. Here is the new state tree with consolidated notes and updated layout coordinates: ' +
    'When you are making a list and using dashses as bullets, do not put a space after the dash. ' +
    'Also I want you to generate new uuids in the same format that they are given to you. ' +
    'Return only raw JSON with no markdown formatting or code fences. ' +
    JSON.stringify(state.notes);

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  // Strip markdown code fences if Claude wraps the response
  const response = message.content[0].text
    .replace(/^```json\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  console.log('[sort] response:', response);

  return new Response(JSON.stringify({ notes: response }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
