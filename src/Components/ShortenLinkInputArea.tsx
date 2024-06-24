import { useState } from 'react';
import inputBackImg from '../assets/bg-shorten-desktop.svg'

export interface UrlProps {
  onShorten: (originalUrl: string, shortUrl: string) => void;
}

export const ShortenLinkInputArea: React.FC<UrlProps> = ({ onShorten }):JSX.Element => {
	const [url, setUrl] = useState<string>('');
  const [validation, setValidation] = useState<boolean>(false);

  //URL形式が正しいかどうかのチェック
  const isValidateUrl = (url: string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
                           '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}'+
                           '(\\/[-a-z\\d%_.~+]*)*', 'i');

    return urlPattern.test(url); //urlをtest()でチェックして、trueかfalseかを返す
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //submitボタンのデフォルト機能を解除
    
    //formに値があるかどうかを確認
    if(!url || !isValidateUrl(url)) { // urlが空 or URL形式がfalseの場合
      setValidation(true);
      return;
    }

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
			<form onSubmit={handleSubmit} className='shorten-link-input-area' noValidate>
				<input
					type="text"
					value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setValidation(false); // 新たに入力が始まったらfalseにリセット
          }}
					className={`shorten-link-input ${validation ? 'error' : ''}`} // validationがtrueの時はerrorというclassを付与
					placeholder="Shorten a link here..." 
					required
				/>
        { validation && <p className="validation-msg">Please add a link</p> } 
				<button type="submit" className="shorten-link-btn">Shorten It!</button>
			</form>
		</div>
	);
}