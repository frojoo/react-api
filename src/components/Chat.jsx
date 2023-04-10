import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState();

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        "https://holy-fire-2749.fly.dev/chat",
        {
          // question: question,
          question,
        },
        {
          headers: {
            Authorization: "Bearer BLOCKCHAINSCHOOL3",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <form onSubmit={onSubmitChat}>
        <input
          className="text-black mr-3 focus:outline-slate-400"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input type="submit" value="검 색" />
      </form>
    </div>
  );
}

export default Chat;
