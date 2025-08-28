import React from 'react';
import '../../../styles/chat/welcome-message.css'
import { portfolioPrompts } from '../../../data/portfolioPrompts'
import { optimisticallySendMessage } from "@convex-dev/agent/react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";






function WelcomeMessage({ threadId, userId }) {

    const sendMessage = useMutation(
        api.shawnbot.mutation.sendMessageToThreadFromUser,
      ).withOptimisticUpdate((store, args) => {
        optimisticallySendMessage(api.shawnbot.queries.listMessagesForUserThread)(store, {
            threadId: args.threadId,
            prompt: args.message,
        });
    });

    return(
        <div className="message-list-container welcome-container">
            <div className="welcome-message">
                <h2 className="welcome-title">Hi there, what should we dive into today?</h2>
                <div className="suggested-prompts">
                    {portfolioPrompts.reduce((rows, prompt, index) => {
                        const rowIndex = Math.floor(index/4);
                        if (!rows[rowIndex]) {
                            rows[rowIndex] = [];
                        }
                        rows[rowIndex].push(prompt);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className="prompts-row">
                            {row.map((prompt) => (
                                <button
                                key={prompt.id}
                                className="prompt-button"
                                onClick={() => sendMessage({ threadId, userId, message: prompt.text})}
                                >
                                    {prompt.text}
                                </button>
                            ))}
            </div>
                    ))}
        </div>
        </div>
        </div>
    );
}

export default WelcomeMessage;
    