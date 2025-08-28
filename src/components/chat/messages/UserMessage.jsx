import BubbleMessageContent from './BubbleMessageContent'
import '../../../styles/chat/user-message.css'

function UserMessage({ message }) {
    if (!message.text) return null
    let UserMessage = message.text ?? ""

    try {
        UserMessage = JSON.parse(message.text).message
        // eslint-disable-next-line no-unused-vars, no-empty 
    } catch (e) {}
    
  return (
    <div className='user-message'>
        <div className='user-message.content'>
            <div className='user-message-bubble'>
                <BubbleMessageContent message={UserMessage} />
            </div>
        </div>
    </div>
  )
}

export default UserMessage
