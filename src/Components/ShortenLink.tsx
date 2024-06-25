import { useState } from 'react';
import '../assets/css/ShortenLink.css'
import { ShortenLinkInputArea } from './ShortenLinkInputArea'
import { ShortenLinkList, ShortenedLink } from './ShortenLinkList'

export const ShortenLink = ():JSX.Element => {
	const [links, setLinks] = useState<ShortenedLink[]>([]);

  const handleShortenLink = (originalUrl: string, shortUrl: string) => {
    setLinks((prevLinks: any) => {
			const newLink = { originalUrl, shortUrl };
      const newLinks = [newLink, ...prevLinks]; // 新しいリンクオブジェクトを配列に追加
      return newLinks.slice(0, 3); // 最新のデータ3件まで保持
    });
  };

	return(
		<div>
			<ShortenLinkInputArea onShorten={handleShortenLink} />
			<ShortenLinkList links={links} />
		</div>
	);
}