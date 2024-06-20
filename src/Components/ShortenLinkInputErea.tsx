import { useState } from 'react';
import inputBackImg from '../assets/bg-shorten-desktop.svg'

export interface UrlProps {
  onShorten: (originalUrl: string, shortUrl: string) => void;
}

export const ShortenLinkInputErea: React.FC<UrlProps> = ({ onShorten }):JSX.Element => {
	const [url, setUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //submitボタンのデフォルト機能を解除

    // APIリクエスト
    try {
      const response = await fetch('/shortenuri/api/v1/shorten', {
        method: 'POST', // POSTで渡す
        headers: { // HTTP Acceptヘッダーを使用して、Content-Type値の戻り形式を指定
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json(); // レスポンスをJSON形式にパースする

      onShorten(url, data.result_url); // 親コンポーネントに短縮URLを渡す
      setUrl(''); // 保持してた入力フォームの内容を消去
    } catch (error) { // エラー時
      console.error('Error shortening the URL', error);
    }
  };

	return(
		<div className="shorten-link-input-erea-box">
			<img src={inputBackImg} alt="短縮したいURL入力エリア" className='shorten-link-input-erea-img' />
			<form onSubmit={handleSubmit} className='shorten-link-input-area'>
				<input
					type="text"
					value={url}
          onChange={(e) => setUrl(e.target.value)}
					className="shorten-link-input"
					placeholder="Shorten a link here..."
					required
				/>
				<button type="submit" className="shorten-link-btn">Shorten It!</button>
			</form>
		</div>
	);
}