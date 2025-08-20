import "../../styles/chat.css"
import { BrushCleaning } from "lucide-react"
import { api } from "../../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useEffect } from "react"
import { useAnonUser } from "./AnonUserContext"
import { useState, useCallback, useRef } from "react"
import { TruckElectric } from "lucide-react"


const currentThreadIdStoragekey = "shawnbot_current_thread_id"

export default function Chat() {
  const anonUser = useAnonUser()
  const hasInitialized = useRef(false)
  const [currentThreadId, setCurrentThreadId] = useState(
  () => localStorage[currentThreadIdStoragekey] || null
  )

console.log('anon user', anonUser)
  const createThread = useMutation(api.shawnbot.mutation.createThreadForUser)

  const handleCreateThread = useCallback(async ()=> {
console.log('inside handle create thread')
    console.log('inside', anonUser, hasInitialized.current)
    if (!anonUser || hasInitialized.current) return
    

    hasInitialized.current = true
    try{
      const id = await createThread({ userId: anonUser._id })
      localStorage[currentThreadIdStoragekey] = id
      setCurrentThreadId(id)
    } catch (error) {
      console.error(error)
      hasInitialized.current =false
    }
    }, [anonUser, createThread])
    

  useEffect(() => {
    if (!anonUser) return

   if(!currentThreadId) {
    handleCreateThread()
   }
  }, [anonUser, currentThreadId, handleCreateThread])



  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-avatar">
          <img
          src="/src/assets/avatars/me.jpg"
          alt="Assistant Avatar"
           />
        </div>
        <div className="chat-header-content">
          <h2 className="chat-header-title">Shawn's bot</h2>
        </div>
        <button
        className="chat-header-new-thread-btn"
        title="Start new conversation"
        >
          <BrushCleaning size={16}/>
        </button>
      </div>

      <div className="chat-message-container">
        {/* <MessagesList

        /> */}
      </div>
    </div>
  )
}