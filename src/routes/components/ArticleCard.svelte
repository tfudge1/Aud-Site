<script lang="ts">
	import type { Article } from '$lib/types/article';

	/** @type {Article} */
	let { article } = $props();

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<a href="/articles/{article.id}" class="article-card">
	<div class="article-image">
		<img src={article.imageUrl} alt={article.imageAlt} />
		<!--<div class="article-category">{article.category}</div>-->
	</div>
	
	<div class="article-content">
		<h3 class="article-title">{article.title}</h3>
		<p class="article-excerpt">{article.excerpt}</p>
		
		<div class="article-meta">
			<span class="article-date">{formatDate(article.publishDate)}</span>
			<span class="article-read-time">{article.readTime}</span>
		</div>
		
		<div class="article-link">
			Read Full Article →
		</div>
	</div>
</a>

<style>
	.article-card {
		display: block;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		text-decoration: none;
		color: inherit;
	}

	.article-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.article-image {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: hidden;
	}

	.article-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.article-card:hover .article-image img {
		transform: scale(1.05);
	}

	.article-category {
		position: absolute;
		top: 12px;
		left: 12px;
		background: var(--color-theme-1);
		color: white;
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.article-content {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		height: calc(100% - 200px);
	}

	.article-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.article-excerpt {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.5;
		margin: 0;
		flex-grow: 1;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.article-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		margin-top: auto;
	}

	.article-date {
		font-weight: 500;
	}

	.article-read-time {
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 8px;
		border-radius: 12px;
		font-size: 0.75rem;
	}

	.article-link {
		display: inline-flex;
		align-items: center;
		color: var(--color-theme-1);
		text-decoration: none;
		font-weight: 600;
		font-size: 0.875rem;
		margin-top: 8px;
		transition: color 0.2s ease;
	}

	.article-card:hover .article-link {
		color: var(--color-theme-2);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.article-image {
			height: 150px;
		}
		
		.article-content {
			padding: 16px;
			height: calc(100% - 150px);
		}
		
		.article-title {
			font-size: 1.125rem;
		}
	}
</style>
