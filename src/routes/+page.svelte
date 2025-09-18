<script lang="ts">
	import { onMount } from 'svelte';
	import { ArticleService } from '$lib/services/articleService';
	import ArticleCard from './components/ArticleCard.svelte';
	import LoadingSpinner from './components/LoadingSpinner.svelte';
	import type { Article, ArticleResponse } from '$lib/types/article';

	let articles: Article[] = [];
	let loading = true;
	let error = false;

	onMount(async () => {
		try {
			const response: ArticleResponse = await ArticleService.getArticles(1, 6); // Show 6 articles on home
			articles = response.articles;
			loading = false;
		} catch (err) {
			console.error('Failed to load articles:', err);
			error = true;
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Audrey Hill - Investigative Journalist</title>
	<meta name="description" content="Audrey Hill's portfolio featuring investigative journalism, local news, and community stories." />
</svelte:head>

<section class="home-section">
	<div class="hero">
		<h1>Audrey Hill</h1>
		<p class="hero-subtitle">Investigative Journalist & Community Reporter</p>
		<p class="hero-description">
			Bringing transparency to local government, investigating community issues, 
			and telling the stories that matter most to our readers.
		</p>
	</div>

	<div class="articles-section">
		<h2>Recent Articles</h2>
		
		{#if loading}
			<LoadingSpinner message="Loading articles..." />
		{:else if error}
			<div class="error-message">
				<p>Sorry, we couldn't load the articles right now. Please try again later.</p>
			</div>
		{:else if articles.length === 0}
			<div class="no-articles">
				<p>No articles available at the moment.</p>
			</div>
		{:else}
			<div class="articles-grid">
				{#each articles as article (article.id)}
					<ArticleCard {article} />
				{/each}
			</div>
			
			<div class="view-all">
				<a href="/clips" class="view-all-button">View All Articles →</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.home-section {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.hero {
		text-align: center;
		padding: 2rem 0;
	}

	.hero h1 {
		font-size: 3rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 1rem 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	.hero-subtitle {
		font-size: 1.5rem;
		color: var(--color-theme-1);
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.hero-description {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.9);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.articles-section h2 {
		font-size: 2rem;
		color: var(--color-text);
		text-align: center;
		margin-bottom: 2rem;
		font-weight: 600;
	}

	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.view-all {
		text-align: center;
		margin-top: 2rem;
	}

	.view-all-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-theme-1);
		color: white;
		padding: 1rem 2rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.125rem;
		transition: all 0.3s ease;
	}

	.view-all-button:hover {
		background: var(--color-theme-2);
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		text-decoration: none;
	}

	.error-message, .no-articles {
		text-align: center;
		padding: 3rem 1rem;
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.125rem;
	}

	.error-message p, .no-articles p {
		margin: 0;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2.5rem;
		}
		
		.hero-subtitle {
			font-size: 1.25rem;
		}
		
		.hero-description {
			font-size: 1rem;
		}
		
		.articles-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.home-section {
			padding: 1rem;
			gap: 2rem;
		}
	}
</style>
