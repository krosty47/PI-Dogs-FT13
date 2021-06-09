import React from 'react'

export default function BreedCard({anime}) {
	return (
		<article className="breed-card">
			<a 
				href={anime.url} 
				target="_blank" 
				rel="noreferrer">
				<figure>
					<img 
						src={anime.image_url} 
						alt="Anime Image" />
				</figure>
				<h3>{ anime.title }</h3>
			</a>
		</article>
	)
}

