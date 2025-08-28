import AssistantMessage from './AssistantMessage'
import UserMessage from './UserMessage'
import '../../../styles/chat/message-row.css'
import { useRef } from 'react'


function MessageRow({ message }) {
    const messageRef = useRef(null)
    if(!message.message) return "Message missing"

    if(message.message.role === "assistant") {
        return <AssistantMessage ref={messageRef} message={message} status={message.status} />
    }

    if(message.message.role == "tool") {
        return null;
    }

    if(message.message.role === 'user') {
        return <UserMessage ref={messageRef} message={message} />
    }
  if (message.message.role ==='system') return null

  return "Unknown message"
}

export default MessageRow
