// src/App.tsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [initData, setInitData] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Проверяем, доступен ли Telegram WebApp
    if ((window as any).Telegram?.WebApp) {
      const webApp = (window as any).Telegram.WebApp;

      // Убираем полосу загрузки
      webApp.ready();

      // Получаем initData
      const data = webApp.initData;
      setInitData(data || 'initData отсутствует');
    } else {
      setInitData('Telegram WebApp недоступен. Откройте в Telegram.');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(initData)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          alert('Не удалось скопировать: ' + err.toString());
        });
  };

  return (
      <div className="container">
        <header className="header">
          <h1>🔐 Telegram initData Viewer</h1>
          <p>Для отладки Mini App</p>
        </header>

        <main className="main">
          <div className="card">
            <label>Ваша initData:</label>
            <textarea
                value={initData}
                readOnly
                className="textarea"
                placeholder="initData загружается..."
            />
            <button
                className={`copy-btn ${copied ? 'success' : ''}`}
                onClick={copyToClipboard}
                disabled={!initData || initData.includes('отсутствует')}
            >
              {copied ? '✅ Скопировано!' : '📋 Скопировать initData'}
            </button>
          </div>
        </main>

        <footer className="footer">
          <small>Откройте DevTools → Console, чтобы увидеть детали</small>
        </footer>

        <script>
          {`
          // Дополнительно: лог в консоль
          if (window.Telegram?.WebApp) {
            console.log('🔐 initData:', window.Telegram.WebApp.initData);
            console.log('👤 user:', window.Telegram.WebApp.initDataUnsafe.user);
            console.log('📅 auth_date:', window.Telegram.WebApp.initDataUnsafe.auth_date);
            console.log('🔗 hash:', window.Telegram.WebApp.initDataUnsafe.hash);
          }
        `}
        </script>
      </div>
  );
}

export default App;