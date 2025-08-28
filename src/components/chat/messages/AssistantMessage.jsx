import { useSmoothText } from '@convex-dev/agent/react'
import '../../../styles/chat/assistant-message.css'
import BubbleMessageContent from './BubbleMessageContent'
import ToolMessage from './ToolMessage'

function AssistantMessage({message, status}) {
    const [visibleText] = useSmoothText(message.text ?? "")

if(message.tool) return<ToolMessage message={message} />


  return (
    <div className='assistant-message'>
        <div className='assistant-avatar'>
            <img src='/src/assets/avatars/me.jpg' alt='Assistant Avatar' />
        </div>

        <div className='assistant-message-container'>
            <div className='assistant-message-bubble'>
                <BubbleMessageContent message={visibleText} isLoading={status === "pending"} />
            </div>
        </div>
    </div>
  )
}

export default AssistantMessage
