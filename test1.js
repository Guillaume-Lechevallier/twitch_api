const axios = require('axios');

// Remplacez 'YOUR_API_KEY' par votre clé API GPT-3
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/babbage/completions';

// Texte pour lequel vous souhaitez générer une continuation
const prompt = 'Quelle est la signification de la vie?';

// Appel à l'API GPT-3
async function callGPT3() {
  try {
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API GPT-3:', error.response ? error.response.data : error.message);
  }
}

// Appeler la fonction
callGPT3();

