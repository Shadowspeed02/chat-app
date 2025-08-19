import React, {useContext, useEffect, useState, useRef} from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../context/ChatContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

// hello world

const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)
    console.log("Messages", messages);

    const scrollEnd = useRef()
    const [input, setInput] = useState('')

    // handle sending a message
    const handleSendMessage = async (e)=>{
        // allow both form submit and img click (mouse event)
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if(input.trim() === "") return null;
        try {
          await sendMessage({text: input.trim()})
          setInput("")
        } catch (err) {
          console.error("sendMessage failed:", err);
          toast.error("Failed to send message")
        }
    }

    // handel sending an image
    const handleSendImage = async (e)=>{
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")){
            toast.error("Select an image file")
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async ()=>{
            try {
              await sendMessage({image: reader.result})
              e.target.value = ""
            } catch (err) {
              console.error("sendMessage image failed:", err);
              toast.error("Failed to send image")
            }
        }
        reader.readAsDataURL(file)
    }

    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    },[selectedUser])

    useEffect(() => {
      if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({behavior: "smooth"})
      }
    }, [messages])

  return selectedUser ?  (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
        {/* header */}
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
            <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full"/>
            <p className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
                {selectedUser.fullName}
                {onlineUsers.includes(selectedUser._id) && (<span className="w-2 h-2 rounded-full bg-green-500"></span>)}
            </p>
            <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7'/>
            <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
        </div>

        {/* chat area */}
        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
            {(messages || []).map((msg, index)=> {
                // defensive guard: skip invalid items
                if (!msg || typeof msg !== 'object') {
                  console.warn('Skipping invalid message at index', index, msg);
                  return null;
                }

                const isMine = msg.senderId === authUser._id;

                // safe createdAt handling
                const createdAtDate = msg.createdAt ? new Date(msg.createdAt) : null;
                const timeText = (createdAtDate && !Number.isNaN(createdAtDate.getTime()))
                  ? formatMessageTime(msg.createdAt) // keep using your existing formatter
                  : 'Sending...';

                return (
                  <div key={msg._id || index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
                      {msg.image ? (
                          <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
                      ):(
                          <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${isMine ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                            {msg.text}
                          </p>
                      )}
                      <div className='text-center text-xs'>
                          <img src={isMine ? (authUser?.profilePic || assets.avatar_icon) : (selectedUser?.profilePic || assets.avatar_icon)} alt="" className='w-7 rounded-full'/>
                          <p className='text-gray-500'>{timeText}</p>
                      </div>
                  </div>
                )
            })}
            <div ref={scrollEnd}></div>
        </div>

        {/* bottom area */}
        <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
            <div className='flex-1 flex items-center justify-center bg-gray-100/12 px-3 rounded-full'>
                <input onChange={(e)=> setInput(e.target.value)} value={input}
                onKeyDown={(e)=>e.key === 'Enter' ? handleSendMessage(e) : null} type="text" placeholder='Send a message' 
                className='flex-1 text-sm p-2 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
                <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden/>
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt="" className='w-5 mr-3 mt-2 cursor-pointer'/>
                </label>
            </div>
            <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer'/>
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} className='max-w-16' alt="" />
        <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}
export default ChatContainer
