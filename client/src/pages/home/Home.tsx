import React from 'react'
import luffy from '../../assets/luffy-one-piece.png'
import {useSocket} from '../../context/ChatContext'
import * as y from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IMessage } from '../../types';
import toast from 'react-hot-toast';
import Moment from 'react-moment';

type Props = {}

// message validation
const validationSchema = y.object({
    message: y.string().min(1).max(55).trim().required('❗'),
    name: y.string().min(1).max(35).trim().required('❗')
   });

const Home = (props: Props) => {
    const {socketConnect, connection, animeImageUrl, messages} = useSocket()
    
    // submit form values -> emit values/socket data
    function onSubmit(values: {name: string, message: string, image: string},  action: any ) {
      values.image = animeImageUrl
        try {
            if(connection) {
                socketConnect.emit('add-message', {
                  message: values.message,
                  name: values.name,
                  image: values.image
                })
                toast.success("Message added successfully.\n\nMessages are set (server-side) to auto delete/expire (for project/test purposes).",
                {
                  duration: 8000,
                })
                action.resetForm()
            }
        } catch (error: any) {
            toast.error(error.message + ": Unable to send message")
           }
    }
  return (
    <>
       <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full">
   <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">

   {/** Header/Navbar */}
      <div className="relative flex items-center space-x-4 p-3">
         <div className="relative">  
         <img  src={luffy} alt="luffy-one-piece-img" className="w-14 sm:w-16 h-10 sm:h-16 rounded-full" />
         </div>
         <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
               <span className="text-white mr-3">Anime Real-Time Public Social Chat Room</span>
            </div>
            <span className="text-lg text-gray-300">Chat With Other Anime Enthusiasts</span>
         </div>
      </div>
     
   </div>

{/** Chat list/Messages */}
   <div id="messages" className="flex flex-col space-y-4 p-3 my-4 overflow-y-auto h-[30rem] scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch " >
   {messages?.map((message: IMessage) => (
      <div key={message._id} className="chat-message">
         <div className="flex items-end">
            <div className="flex flex-col space-y-1 text-xs max-w-xs mx-2 order-2 items-start px-4 py-2 rounded-lg  rounded-bl-none bg-gray-300 text-gray-600">
            <h1 className="text-[.75rem]">{message.name} ∙ <span><Moment fromNow>{message.createdAt}</Moment></span></h1>
                  <span className="text-[#121212]">{message.message}</span>
            </div>
            <img src={`${message.image}`} alt="My profile" className="w-6 h-6 rounded-full order-1"/>
         </div>
      </div>
      ))}
   </div>


{/** Chat Input/ Form */}
   <div className="border-t-2 border-gray-200 fixed w-[95%] md:ml-0 ml-2 bottom-0 px-4 pt-4 mb-2 sm:mb-0 ">
   <div className="relative flex">
   <Formik
    initialValues={{
        message: '',
        name: '',
        image: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
          {(formProps ) => (
    <Form className='md:flex md:mb-3'>
      {/** Name  */}
      <ErrorMessage name="name">
         { msg => <div className="absolute my-4 text-red-600 text-xs">{msg}</div> }
         </ErrorMessage>
         <Field type="text" placeholder="Enter name" name='name' className="w-full mb-3 md:mb-0 md:mr-3 focus:outline-none  focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" />
         {/** Message */}
         <ErrorMessage name="message">
         { msg => <div className="absolute mt-[1.3em] md:ml-[22.15em] md:mt-[1.3em] text-red-600 text-xs">{msg}</div> }
         </ErrorMessage>
         <Field type="text" placeholder="Write your your message!" name='message' className="w-full mb-2 md:mb-0 focus:outline-none  focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-3 bg-gray-200 rounded-md py-3" />
         <div className="mt-2 mb-2 md:mb-0 md:mt-0 md:pl-3 items-center inset-y-0 sm:flex">
            <button
            disabled={!formProps.isValid}
            type="submit" 
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-green-700 hover:bg-green-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-700">
               <span className="font-bold">{formProps.isSubmitting ? 'Sending...' : 'Send'}</span>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
    </Form>
     )}
    </Formik>
    </div>
   </div>



</div>
        </>
  )
}

export default Home