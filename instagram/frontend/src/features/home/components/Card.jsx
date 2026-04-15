import React from 'react'
import './Card.scss'
const Card = ({post}) => {
    console.log(post);
  return (
    <div className="card">
        <div className="card-header">
            <div className="profile">
                <img src={post.user.profileImg} alt="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                <span>{post.user.username}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z">
                </path>
            </svg>
        </div>
        <div className="card-image">
            <img src={post.imageUrl} alt="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </div>
        <div className="card-content">
            <div className="card-actions">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 8.81056L13.6352 6.48845C14.2721 5.58412 15.3179 5 16.5 5C18.433 5 20 6.567 20 8.5C20 11.3788 18.0407 14.1215 15.643 16.3358C14.4877 17.4027 13.3237 18.2603 12.4451 18.8521C12.2861 18.9592 12.1371 19.0571 11.9999 19.1456C11.8627 19.0571 11.7137 18.9592 11.5547 18.8521C10.6761 18.2604 9.51216 17.4028 8.35685 16.3358C5.95926 14.1216 4 11.3788 4 8.5C4 6.567 5.567 5 7.5 5C8.68209 5 9.72794 5.58412 10.3648 6.48845L12 8.81056ZM10.5557 3.92626C9.68172 3.3412 8.63071 3 7.5 3C4.46243 3 2 5.46243 2 8.5C2 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 22 16 22 8.5C22 5.46243 19.5376 3 16.5 3C15.3693 3 14.3183 3.3412 13.4443 3.92626C12.8805 4.3037 12.3903 4.78263 12 5.33692C11.6097 4.78263 11.1195 4.3037 10.5557 3.92626Z">
                        </path>
                </svg>
                
                <svg xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM5.76282 17H20V5H4V18.3851L5.76282 17ZM8 10H16V12H8V10Z">
                    </path>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.4999 2C20.0945 1.99965 20.6988 2.15061 21.2499 2.46875C22.924 3.43525 23.4977 5.57598 22.5312 7.25L15.0312 20.2402C14.0647 21.9142 11.924 22.488 10.2499 21.5215C9.41368 21.0386 8.85171 20.2606 8.62005 19.3975L6.85345 12.8037L2.02533 7.97461C0.65837 6.60765 0.658729 4.39208 2.02533 3.02539C2.65755 2.39311 3.53385 2.00011 4.49994 2H19.4999ZM4.49994 4C4.08555 4.00011 3.71182 4.167 3.43939 4.43945C2.85354 5.0254 2.85378 5.97494 3.43939 6.56055L7.914 11.0352L14.8906 7.00684C15.3688 6.7308 15.9806 6.89487 16.2568 7.37305C16.5327 7.85124 16.3687 8.46312 15.8906 8.73926L8.914 12.7676L10.5517 18.8789C10.6515 19.2509 10.8913 19.5819 11.2499 19.7891C11.9673 20.2032 12.8845 19.9575 13.2988 19.2402L20.7988 6.25C21.213 5.53256 20.9674 4.61539 20.2499 4.20117C20.0128 4.06427 19.7555 3.99982 19.5009 4H4.49994Z">
                        </path>
                </svg>
            </div>
            <div className="card-likes">
                <span>1,234 likes</span>
            </div>
            <div className="card-caption">
                <p><strong>{post.user.username}</strong> {post.caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Card