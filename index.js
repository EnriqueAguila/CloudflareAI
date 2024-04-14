//Import libraries
const { TextToSpeech } = require(' watson -developer-cloud');
const { CloudFunctions } = require(' cloudflare -workers');

// Access credentials from environment variables
const username = process.env.WATSON _USERNAME ;
const password = process.env.WATSON _PASSWORD ;
const url = 'https://stream.watsonplatform.net/text-to-speech/api ' ;

// Initialize Watson TextToSpeech client
const tts = new TextToSpeech ( {
username,
password,
  url ,
});

// CloudFunctions instance
const cf = new CloudFunctions ( );

// Function to generate audio from text
async function generateText ( prompt, model, temperature, maxTokens ) {
try {
const response = await tts.synthesize ({
text:prompt,
voice: model,
temperature,
      max_tokens ,
});
return response.audio ;
  } catch (error) {
    console.error ('Error generating text :', error);
    // Handle the error appropriately (eg, return an error response)
return new Response( 'Error generating text', { status: 500 });
}
}

// Function to handle HTTP requests
async function handleRequest (request) {
const { prompt , model, temperature, maxTokens } = await request.json ();

const audio = await generateText ( prompt, model, temperature, maxTokens );

return new Response( audio, {
headers: {
'Content-Type': 'audio/wav',
},
});
}

// Register the HTTP request handler
cf.registerRoute ('POST', '/', handleRequest );

// Export the CloudFunctions instance
module.exports = cf ;
