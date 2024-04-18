import React, {useState} from 'react';
import {getChatsonicResponse} from "../chatsonic-config/chatsonic";

interface Props {
    children: any
    actions: any
}

const MessageParser = ({children, actions}: Props) => {

    const [historyData, setHistoryData] = useState<any>([])

    const parse = async (message: string) => {

        setHistoryData((prev: any) => ([
            ...prev,
            {is_sent: true, message: message}
        ]))

        try {
            const resp = await getChatsonicResponse(message, historyData)
            setHistoryData((prev: any) => ([
                ...prev,
                {is_sent: false, message: resp.message}
            ]))
            actions.handleMessage(resp.message)
        } catch (e) {
            actions.handleMessage('Un problème est survenu')
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions: {},
                });
            })}
        </div>
    );
};

export default MessageParser;
