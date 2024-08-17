"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleEncode = () => {
    try {
      const encoded = btoa(
        encodeURIComponent(input).replace(
          /%([0-9A-F]{2})/g,
          (match, p1) => String.fromCharCode(parseInt(p1, 16))
        )
      );
      setOutput(encoded);
      navigator.clipboard.writeText(encoded).then(() => {
        setCopied(true); // 复制成功后更新状态
      });
    } catch (e) {
      setOutput("编码错误，请确保输入的字符有效。");
      setCopied(false);
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(
        Array.prototype.map
          .call(atob(input), (c) =>
            "%" + c.charCodeAt(0).toString(16).padStart(2, "0")
          )
          .join("")
      );
      setOutput(decoded);
      navigator.clipboard.writeText(decoded).then(() => {
        setCopied(true); // 复制成功后更新状态
      });
    } catch (e) {
      setOutput("Invalid Base64 string");
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-sm md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Base64 编码解码工具
        </h1>
        <textarea
          className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3 md:mb-4"
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入文本或Base64字符串"
        />
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mb-4 md:mb-6">
          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleEncode}
          >
            编码
          </button>
          <button
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            onClick={handleDecode}
          >
            解码
          </button>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">结果：</h3>
        <textarea
          className="w-full p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={output}
          readOnly
        />
        {copied && (
          <p className="text-green-500 text-sm mt-2 text-center">
            结果已复制到剪贴板！
          </p>
        )}
      </div>
    </div>
  );
}
