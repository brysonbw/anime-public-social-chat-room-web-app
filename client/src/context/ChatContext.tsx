import axios from "axios";
import { createContext, useContext, useEffect, useState} from "react";
import io from "socket.io-client";
import { IMessage } from "../types";
import { imageCategoryList } from "../utils/ImageCategoryList";

const socket = `https://anime-social-chat.herokuapp.com/`

const socketConnect = io(socket, {transports: ['websocket'], upgrade: false})   

const ChatContext = createContext<any | null>(null);


export const ChatProvider = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    const [connection, setConnection] = useState<boolean>(false);
    const [animeImageUrl, setAnimeImageUrl] = useState<null | string>(null)
    const [messages, setMessages] = useState<IMessage[]>([])
    const randomCategory = imageCategoryList[Math.floor(Math.random() * imageCategoryList.length)]

    // socket connection and events
    useEffect(() => {
        socketConnect.on('connect', () => {
            console.log('socket client connected')
            setConnection(true)
          });
          socketConnect.on('disconnect', () => {
            console.log('error: socket client disconnected')
            setConnection(false)
          });
    
         socketConnect.on('display-messages', (data) => {
         setMessages(data)
         })

         socketConnect.on('add-message', function(msg) {
          setMessages((currentMessages) => [...currentMessages, msg])
        });
      
          return () => {
            socketConnect.off('connect');
            socketConnect.off('disconnect');
            socketConnect.off('display-messages');
            socketConnect.off('add-message');
          };

      },[])

      // fetch anime url: docs https://waifu.pics/docs
      useEffect(() => {
        const fetchAnimeImage = async () => {
          try {
           const res = await axios.get(`https://api.waifu.pics/sfw/${randomCategory}`)
           const data = res.data 
            setAnimeImageUrl(data.url)
          } catch (error: any) {
            console.log(error.message + ": Unable to fetch data")
          }
        } 
        fetchAnimeImage()
      }, [])
    

     
      

      return <ChatContext.Provider value={{socketConnect, connection, animeImageUrl, messages, setMessages}}>{children}</ChatContext.Provider>

  }

  export const useSocket = () => useContext(ChatContext);