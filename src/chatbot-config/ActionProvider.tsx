import React from 'react';
import "./ChatBot.css";

interface Props {
    createChatBotMessage: any
    setState: any
    children: any
}

const ActionProvider = ({createChatBotMessage, setState, children}: Props) => {

    const handleMessage = (prompt: string) => {
        const botMessage = createChatBotMessage(prompt);

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div className="Chatbot-container">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleMessage
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;