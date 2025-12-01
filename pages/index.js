import { useState, useEffect } from 'react';
import Head from 'next/head';

// 模拟数据（部署后通过API或JSON文件读取）
const mockData = {
  lastUpdated: "2025-10-24 14:00",
  articles: [
    {
      jp_source: "NHK News",
      jp_url: "#",
      jp_title_cn: "丰田宣布将在上海建立新的电动车研发中心",
      jp_summary_cn: "丰田汽车社长今日在发布会上表示，为了应对中国市场激烈的竞争，将投入500亿日元在上海设立专门针对中国消费者喜好的研发基地，缩短开发周期。",
      cn_source: "新浪财经",
      cn_url: "#",
      cn_title: "丰田加码中国市场，上海新研发中心落定",
      cn_summary: "针对近期日系车在中国市场份额下滑的趋势，丰田决定反击。新研发中心将聚焦智能座舱与自动驾驶技术，预计2026年投入使用。",
      ai_analysis: "日方报道侧重于具体的投资金额（500亿日元）和开发周期的缩短；中方报道则更关注市场份额背景以及具体的技术方向（智能座舱）。双方事实基本一致，但日媒强调'应对竞争'，中媒强调'反击'。"
    }
    // ... 更多数据
  ]
};

export default function Home() {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'sepia'

  // 初始化主题
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const getThemeClass = () => {
    if (theme === 'dark') return 'dark bg-slate-900 text-gray-100';
    if (theme === 'sepia') return 'mode-sepia'; // 使用全局CSS覆盖
    return 'bg-gray-50 text-gray-800';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClass()}`}>
      <Head>
        <title>中日视角 | 实时新闻对比</title>
      </Head>

      {/* 顶部导航 */}
      <header className={`sticky top-0 z-10 border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : theme === 'sepia' ? 'header-bg' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            中日<span className="text-red-600">视界</span>对比
          </h1>
          
          {/* 模式切换按钮组 */}
          <div className="flex space-x-2 bg-gray-200/50 p-1 rounded-lg">
            <button onClick={() => setTheme('light')} className={`px-3 py-1 text-xs rounded-md transition ${theme === 'light' ? 'bg-white shadow text-black' : 'text-gray-500'}`}>🌞 亮色</button>
            <button onClick={() => setTheme('dark')} className={`px-3 py-1 text-xs rounded-md transition ${theme === 'dark' ? 'bg-slate-700 shadow text-white' : 'text-gray-500'}`}>🌙 暗色</button>
            <button onClick={() => setTheme('sepia')} className={`px-3 py-1 text-xs rounded-md transition ${theme === 'sepia' ? 'bg-[#eaddcf] shadow text-brown-800' : 'text-gray-500'}`}>☕ 护眼</button>
          </div>
        </div>
      </header>

      {/* 新闻列表 */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <div className="text-center text-sm opacity-60 mb-8">
          更新时间: {mockData.lastUpdated} | 这里的每条新闻都由 AI 实时翻译并对比
        </div>

        {mockData.articles.map((item, index) => (
          <article key={index} className={`rounded-xl shadow-sm border overflow-hidden transition-colors duration-300 card 
            ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x dark:divide-slate-700">
              {/* 日本视角 */}
              <div className={`p-6 ${theme === 'dark' ? 'bg-blue-900/10' : theme === 'sepia' ? '' : 'bg-blue-50/30'}`}>
                <span className="text-xs font-bold text-blue-500 mb-2 block">🇯🇵 日本媒体 ({item.jp_source})</span>
                <h2 className="text-lg font-bold mb-3 hover:underline cursor-pointer">{item.jp_title_cn}</h2>
                <p className="text-sm opacity-80 leading-relaxed">{item.jp_summary_cn}</p>
              </div>

              {/* 中国视角 */}
              <div className={`p-6 ${theme === 'dark' ? 'bg-red-900/10' : theme === 'sepia' ? '' : 'bg-red-50/30'}`}>
                <span className="text-xs font-bold text-red-500 mb-2 block">🇨🇳 中国媒体 ({item.cn_source})</span>
                <h2 className="text-lg font-bold mb-3 hover:underline cursor-pointer">{item.cn_title}</h2>
                <p className="text-sm opacity-80 leading-relaxed">{item.cn_summary}</p>
              </div>
            </div>

            {/* AI 总结 */}
            <div className={`p-4 text-sm ${theme === 'dark' ? 'bg-slate-900 text-slate-300' : theme === 'sepia' ? 'bg-[#ece5d3] text-[#5d4037]' : 'bg-gray-50 text-gray-600'}`}>
              <span className="font-bold mr-2">🤖 AI 差异点分析:</span>
              {item.ai_analysis}
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
