<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { ArticleService } from '$lib/services/articleService';
	import type { Article } from '$lib/types/article';
	import ArticleCard from '../../components/ArticleCard.svelte';

	export let data: PageData;
	
	let article: Article = data.article;
	let relatedArticles: Article[] = [];
	let loading = true;

	onMount(async () => {
		try {
			// Fetch related articles (same category, excluding current article)
			const response = await ArticleService.getArticlesByCategory(article.category, 1, 4);
			relatedArticles = response.articles.filter(a => a.id !== article.id).slice(0, 3);
		} catch (err) {
			console.error('Error loading related articles:', err);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>{article.title} - Audrey Hill</title>
	<meta name="description" content={article.excerpt} />
	<meta property="og:title" content={article.title} />
	<meta property="og:description" content={article.excerpt} />
	<meta property="og:image" content={article.imageUrl} />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="article-page">
	<div class="article-header">
		<button class="back-button" on:click={goBack}>
			← Back to Articles
		</button>
		
		<div class="article-meta">
			<span class="article-category">{article.category}</span>
			<span class="article-date">{formatDate(article.publishDate)}</span>
			<span class="article-read-time">{article.readTime}</span>
		</div>
	</div>

	<article class="article-content">
		<header class="article-header-content">
			<h1 class="article-title">{article.title}</h1>
			<p class="article-author">By {article.author}</p>
		</header>

		<div class="article-image-container">
			<img src={article.imageUrl} alt={article.imageAlt} class="article-image" />
		</div>

		<div class="article-body">
			{@html article.content.replace(/\n/g, '<br>')}
		</div>

		{#if article.url}
			<div class="article-external-link">
				<a href={article.url} target="_blank" rel="noopener noreferrer" class="external-link">
					Read on Original Site →
				</a>
			</div>
		{/if}
	</article>

	{#if !loading && relatedArticles.length > 0}
		<section class="related-articles">
			<h2>Related Articles</h2>
			<div class="related-grid">
				{#each relatedArticles as relatedArticle (relatedArticle.id)}
					<ArticleCard article={relatedArticle} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.article-page {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.article-header {
		margin-bottom: 2rem;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 0.75rem 1rem;
		border-radius: 8px;
		text-decoration: none;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-bottom: 1rem;
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateX(-2px);
	}

	.article-meta {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.article-category {
		background: var(--color-theme-1);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.article-date, .article-read-time {
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.875rem;
	}

	.article-read-time {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
	}

	.article-content {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 2rem;
		margin-bottom: 3rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.article-header-content {
		text-align: center;
		margin-bottom: 2rem;
	}

	.article-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-text);
		line-height: 1.2;
		margin: 0 0 1rem 0;
	}

	.article-author {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.125rem;
		font-style: italic;
		margin: 0;
	}

	.article-image-container {
		margin-bottom: 2rem;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.article-image {
		width: 100%;
		height: auto;
		display: block;
	}

	.article-body {
		color: var(--color-text);
		line-height: 1.8;
		font-size: 1.125rem;
		margin-bottom: 2rem;
	}

	.article-body :global(br) {
		margin-bottom: 1rem;
	}

	.article-external-link {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.external-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-theme-1);
		color: white;
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.external-link:hover {
		background: var(--color-theme-2);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		text-decoration: none;
	}

	.related-articles {
		margin-top: 3rem;
	}

	.related-articles h2 {
		font-size: 1.75rem;
		color: var(--color-text);
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.article-page {
			padding: 1rem;
		}
		
		.article-title {
			font-size: 2rem;
		}
		
		.article-content {
			padding: 1.5rem;
		}
		
		.article-body {
			font-size: 1rem;
		}
		
		.article-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
		
		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
