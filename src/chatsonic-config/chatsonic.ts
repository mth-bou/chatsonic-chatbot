const base_url = 'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium';
const token = process.env.REACT_APP_CHATSONIC_API_KEY;

let getChatsonicResponse = async (prompt: String, history_data: Object) => {

    const data = {
        input_text: prompt,
        enable_memory: true,
        enable_google_results: true,
        history_data
    }

    const response = await fetch(base_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': `${token}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export {
    getChatsonicResponse
}
