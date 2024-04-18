import config from "./chatbot-config/config";
import MessageParser from "./chatbot-config/MessageParser";
import ActionProvider from "./chatbot-config/ActionProvider";
import {Chatbot} from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import './App.css'


export default function App() {
    return (
        <div className="App-container">
            <h1> Try ChatBot </h1>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                placeholderText={'Écrivez votre message ici'}
                headerText={'Conversation avec Bot'}
            />
        </div>
    );
};
