import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState();
  const [content, setContent] = useState();
  // 검색 중인데 재중복 되는 것을 방지하기 위해
  const [isLoading, setIsLoading] = useState();

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (isLoading) {
        alert("검색 중입니다...");

        return;
      }

      if (!question) {
        alert("질문을 입력해주세요");

        return;
      }

      // 로딩 중 트루
      setIsLoading(true);
      setContent("");

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
      if (response.status !== 200) {
        alert("오류가 발생했습니다");
        setIsLoading(false);
        return;
      }

      console.log(response);
      setContent(response.data.choices[0].message.content);

      // 로딩중 폴스
      setIsLoading(false);
    } catch (error) {
      console.error(error);

      // 로딩중 폴스
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={onSubmitChat}>
        <input
          className="text-black mr-3 focus:outline-slate-400"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input type="submit" value="검 색" />
      </form>
      {content && <div className="mt-4 px-16">{content}</div>}
    </div>
  );
}

export default Chat;
