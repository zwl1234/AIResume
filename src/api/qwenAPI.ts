export async function sendToQwenAI(prompt: string, onResponse: (responseText: string, isComplete: boolean) => void): Promise<void> {
  const API_URL = "https://ai.2911396166.workers.dev/"; // Cloudflare Workers 代理
  const userApiKey = "sk-e001472871c347d5bbae4e693423655e"; // ⚠️ 你应该让用户输入

  const requestData = {
    model: "qwen-turbo",
    messages: [{ role: "user", content: prompt }],
    stream: true, // 开启流式
    // 设置stream_options以获取token使用情况
    stream_options: {
      include_usage: true
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.body) {
      throw new Error("服务器未返回流数据");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let currentText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonLine = line.slice(6).trim();

          if (jsonLine === '[DONE]') {
            // 流式响应结束
            onResponse(currentText, true);
            return;
          }

          try {
            const parsedLine = JSON.parse(jsonLine);
            // 检查是否是最后一个chunk（包含usage信息）
            if (Array.isArray(parsedLine.choices) && parsedLine.choices.length === 0) {
              continue;
            }
            const deltaContent = parsedLine?.choices?.[0]?.delta?.content;
            if (deltaContent) {
              currentText += deltaContent;
              onResponse(currentText, false);
            }
          } catch (err) {
            console.error("解析流数据时出错:", err);
          }
        }
      }
    }

  } catch (error) {
    console.error("请求 Qwen AI 失败:", error);
    onResponse("请求失败，请稍后重试", true);
  }
}
