import Markdown from 'react-markdown' 
import '../../../styles/chat/bubble-message-content.css'
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'



function BubbleMessageContent({ message, isLoading }) {
  return (
    <div className='bubble-message-content'>
        <div className='bubble-message-content-markdown'>
            <Markdown
            components={{
                a: ({ ...props}) => <a {...props} target='_blank' rel='noopener noreferrer' />,
            }}
            
            
            >
                {message}
            </Markdown>
        </div>

        {
            isLoading ? (
                <div className='bubble-message-content-loading'>
                    <div className='bubble-message-content-loading-spinner'>
                        
                   <Bouncy
                   size="45"
                   speed="1.75"
                   color="white" 
                   />
                        </div>
                    </div>
            ): null
        }
      
    </div>
  )
}

export default BubbleMessageContent
