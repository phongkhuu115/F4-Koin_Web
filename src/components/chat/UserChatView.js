import React, { useState, useEffect } from 'react';
import pageLogo from '../../assets/weblogo.png'
import '../../styles/Chat.css'
import MyMessageBox from './MyMessageBox'
import UserMessageBox from './UserMessageBox'
import UserChat from './UserChat'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { BaseURL, GetAPIToken, PostAPINoBody, PostAPINoToken, PostAPIToken } from '../helpers/GlobalFunction';

function App(props) {
  const [state, setState] = useState('');
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [userID, setUserID] = useState('')
  const [channel, setChannel] = useState('')

  useEffect(() => {
    let url = BaseURL() + "getMyProfile"
    GetAPIToken(url).then(res => {
      setUser(res.data.profile.username)
      setUserID(res.data.profile.userID)
    })
    GetAPIToken(url).then()
  }, [])

  function handleSendMessage(e) {
    e.preventDefault();
    let url = BaseURL() + 'sendMessage'
    // let url = "http://localhost:8000/api/sendMessage"
    let body = {
      channel_name: channel,
      message_content: message,
      user: user
    }
    PostAPIToken(url, body).then(res => {
      console.log(res.data)
    })
  }

  function getPrefixID(uuid) {
    return uuid.slice(0, 8)
  }

  useEffect(() => {
    let url = BaseURL() + "userJoinChannel"
    GetAPIToken(url).then(res => {
      setChannel(res.data.channel_name)
      const echo = new Echo({
        broadcaster: 'pusher',
        key: 'Wbhg5w.WbfBeA',
        wsHost: 'realtime-pusher.ably.io',
        wsPort: 443,
        disableStats: true,
        encrypted: true,
      })
      echo
        .channel(res.data.channel_name)
        .subscribed(() => {
          console.log(res.data.channel_name)
          console.log('You are subscribed');
        })
        // 5
        .listen('.message.new', (data) => {
          console.log(data)
          // 6
          setMessages((oldMessages) => [...oldMessages, data]);
        });
    })
  }, []);

  return (
    <>
      <div className='d-flex flex-column h-100 chat-page'>
        <div className='d-flex align-items-center p-2'>
          <img src={pageLogo} alt="" className='chat-page__logo me-5' />
          <p className='text-danger'>F4Koin</p>
        </div>
        <div className='d-flex col chat-page_container'>
          <div className='col-sm-3 user_chat p-5 m-5 rounded shadow-sm'>
            <div className='d-flex mb-3'>
              <div className='dot bg-success rounded-circle me-3'></div>
              <div className='dot bg-warning rounded-circle me-3'></div>
              <div className='dot bg-danger rounded-circle me-3'></div>
            </div>
          </div>
          <div className='col chat-page_view p-3 m-5 rounded shadow-sm d-flex flex-column justify-content-end'>
            <div className='d-flex flex-column mt-3 position-relative chat-page_view'>
              {messages.map(item => {
                // console.log(item.user)
                // console.log(item.channel)
                if (item.message === ' has joined the channel') {
                  return null;
                }
                console.log(item.user)
                if (item.user === user) {
                  return (
                    <MyMessageBox key={item.id} message={item}></MyMessageBox>
                  )
                }
                else {
                  return (
                    <UserMessageBox key={item.id} message={item}></UserMessageBox>
                  )
                }
              })}
            </div>
            <div className='d-flex mt-5'>
              <input type="text" className='form-control fs-3' onChange={e => setMessage(e.target.value)} />
              <button className='btn btn-primary fs-3 px-5 ms-4' onClick={e => handleSendMessage(e)}>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;