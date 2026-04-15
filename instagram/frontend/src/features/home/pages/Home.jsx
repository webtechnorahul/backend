import React from 'react'
import Navbar from '../../../shared/components/Navbar'
import TwoPost from '../components/TwoPost'
import '../styles/Home.scss'
const Home = () => {
  return (

    <div id="main">
      <h3><a href='/login'>Login</a></h3>
      <h3><a href="/register">Register</a></h3>
        <Navbar/>
        <div className="twopost">
          <TwoPost/>
        </div>
        <div className="suggestion-friend">
          <h2>suggest for you</h2>
          <div className="suggestion-friend-list">
            <div className="suggestion-friend-item">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="" />
              <div className="suggestion-friend-item-info">
                <h3>john doe</h3>
                <p>followed by jane doe</p>
              </div>
              <button>follow</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home