import React from 'react'
import { useState } from 'react' 
import { api } from '../../../../convex/_generated/api'
import { useAction } from 'convex/react'
import MessageList from './MessageList'

function ThreadView({threadId}) {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const sendMessageToAgent = useAction(api.demo.chat.sendMessageToAgent)
  return (
    <div>
        <MessageList threadId={threadId} />
        <form
            onSubmit={(e) => {
                e.preventDefault()
                setLoading(true)
                sendMessageToAgent({
                   threadId,
                   prompt: message.trim()
                }).finally(() => setLoading(false)) 
            }}
        >
            <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            placeholder='Type your message here...'
            disabled={loading}
            >
            </input>
            <button type='submit'>
                Send
            </button>
        </form>
    </div>
  )
}

export default ThreadView
