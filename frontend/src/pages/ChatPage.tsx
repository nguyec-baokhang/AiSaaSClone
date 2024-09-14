import { useCallback, useState } from "react";
import { MessageRole } from "../enums/MessageRole";
import { Conversations } from "../types/index";
import { ChatUI } from "../components/ChatUi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TEST_USER_INFO = { firstName: "Test", lastName: "User" };
function App() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const navigate = useNavigate();
  const [token,] = useState(localStorage.getItem('token'));

  if(!token){
    toast.error('User is not authorized');
    navigate('/login');
  }

  const [chatConversations, setChatConversations] = useState<Conversations>([]);

  const handleSubmit = useCallback(async (value: string) => {
    setIsQuerying(true);
    setChatConversations((conversations) => [
      ...conversations,
      {
        userInfo: TEST_USER_INFO,
        id: (conversations.length + 1).toString(),
        role: MessageRole.USER,
        message: value,
      },

    ]);

    const formData = {
      message: value
    }

    const response = await axios.post('http://localhost:8080/api/v1/openAi', formData,{
      headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        }
    });

    const message: string = response.data.message;

    setTimeout(() => {
      setIsQuerying(false);
      setChatConversations((conversations) => [
        ...conversations,
        {
          id: (conversations.length + 1).toString(),
          role: MessageRole.ASSISTANT,
          message: message,
        },
      ]);
    }, 3000);
  }, []);

  return (
    <ChatUI
      isQuerying={isQuerying}
      onSubmit={handleSubmit}
      placeholder="Type here to interact with this demo"
      disabled={isQuerying}
      conversations={chatConversations}
      customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
    />
  );
}

export default App;