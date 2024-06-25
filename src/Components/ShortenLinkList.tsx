import { useState } from "react";

export interface ShortenedLink {
  originalUrl: string;
  shortUrl: string;
}

export interface UrlProps {
  links: ShortenedLink[];
}

export const ShortenLinkList: React.FC<UrlProps> = ({ links }):JSX.Element => {
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	
  // Copyボタン作成
	const handleCopy = async (shortUrl: string, index: number) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000); // 2秒後に元に戻す
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

	return(
		<div className="shorten-link-list-box">
			<ul className="shorten-link-list">
				{links.map((link, index) => (
          <li key={index} className="shorten-link-item">
            <span className="shorten-link-origin">{link.originalUrl}</span>
            <div className="shorten-link-box">
              <span className="shorten-link">{link.shortUrl}</span>
              <button
                className={`shorten-link-copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                onClick={() => handleCopy(link.shortUrl, index)}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </li>
        ))}
			</ul>
		</div>
	)
}