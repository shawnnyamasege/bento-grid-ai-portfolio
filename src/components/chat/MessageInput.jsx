import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api' 
import { optimisticallySendMessage } from '@convex-dev/agent/react'
import { Send } from 'lucide-react'
import "../../styles/chat/message-input.css" 

function MessageInput({ userId, threadId, defaultMessage}) {
    const [message, setMessage] = useState(defaultMessage || "")

    const sendMessage = useMutation(
        api.shawnbot.mutation.sendMessageToThreadFromUser
    ).withOptimisticUpdate((store, args) => {
        optimisticallySendMessage(api.shawnbot.queries.listMessagesForUserThread)(store, {
            threadId: args.threadId,
            prompt: args.message
        })
    })

    const handleSubmit = () => {
        if (!userId || !threadId || !message) return

        sendMessage({ threadId, userId, message})
        setMessage("")
    }

    const canSubmit = !!userId && !!threadId && !!message

    


  return (
    <div className='message-input-container'>
        <div className='message-input-textarea-container'>
            <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                    e.preventDefault()
                    handleSubmit()
                }
                })}
                placeholder='Your Message'
                className='message-input-textarea'
            
            
            
            />
            <button
                onClick={handleSubmit}
                className='message-input-button'
                disabled={!canSubmit}
                >
                <Send />

            </button>

            
        </div>
      
    </div>
  )
}

export default MessageInput
