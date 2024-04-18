/*const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);*/

const API_BASE_URL = "https://api.openai.com/v1/completions";

const DEFAULT_PARAMS = {
    "model": "text-davinci-002",
    "temperature": 0.7,
    "max_tokens": 2048,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
}

const buildQuery = async (params = {}) => {
    const _params = {...DEFAULT_PARAMS, ...params};
    const response = await fetch(
        API_BASE_URL,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.REACT_APP_OPENAI_API_KEY
            },
            body: JSON.stringify(_params)
        }
    );
    return await response.json();
}

const getTextToCommand = async (command: any) => {
    let params = {
        model: "text-davinci-003",
        prompt: command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.2,
        presence_penalty: 0.0
    }
    return await buildQuery(params);
}

const getExtractKeywordsFromText = async (command: any) => {
    let params = {
        model: "text-davinci-003",
        prompt: "Extrait les mots clés de ce texte : " + command,
        temperature: 0.5,            // Lower = get keywords / higher = generate related keywords
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0
    }
    return await buildQuery(params);
}

const getProductNameGenerator = async (command: any) => {
    let params = {
        model: "text-davinci-003",
        prompt: "Description du produit : " + command,
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }
    return await buildQuery(params);
}

const getCreatorRecipeFromList = async (command: any) => {
    let params = {
        model: "text-davinci-003",
        prompt: "Ecris une recette basée sur ces ingrédients et/ou instructions : " + command,
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }
    return await buildQuery(params);
}

const getJavascriptToPython = async (command: any) => {
    let params = {
        model: "text-davinci-002",
        prompt: "Javascript to Python :\n Javascript : \n " + command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }
    return await buildQuery(params);
}

const getJavascriptChatBot = async (command: any) => {
    let params = {
        model: "text-davinci-002",
        prompt: "Javascript to Python :\n Javascript : \n " + command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"]
    }
    return await buildQuery(params);
}

const getPythonBugFixer = async (command: any) => {
    let params = {
        model: "text-davinci-002",
        prompt: "#### Fix bugs in the below function \n \n ### Buggy Python \n " + command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["###"]
    }
    return await buildQuery(params);
}

const getCodeExplain = async (command: any) => {
    let params = {
        model: "text-davinci-002",
        prompt: "#### Fix bugs in the below function \n \n ### Buggy Python \n " + command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""]
    }
    return await buildQuery(params);
}

const getTranspileProgrammingLanguages = async (languageTarget: any, command: any) => {
    let params = {
        model: "text-davinci-002",
        prompt: "Translate the code below into " + languageTarget + " : \n " + command,
        temperature: 0,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["###"]
    }
    return await buildQuery(params);
}

const getAIResponseFromPrompt = async (command: any) => {
    let params = {
        model: "text-davinci-003",
        prompt: command,
        temperature: 0.9,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6
    }
    return await buildQuery(params);
}

export {
    // Content creation

    // General
    getTextToCommand,
    getExtractKeywordsFromText,
    getProductNameGenerator,
    getCreatorRecipeFromList,
    getAIResponseFromPrompt,

    // Development
    getJavascriptToPython,
    getJavascriptChatBot,
    getPythonBugFixer,
    getCodeExplain,
    getTranspileProgrammingLanguages
}