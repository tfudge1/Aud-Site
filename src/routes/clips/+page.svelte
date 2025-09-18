<script lang="ts">
	import { onMount } from 'svelte';
	import { ArticleService } from '$lib/services/articleService';
	import ArticleCard from '../components/ArticleCard.svelte';
	import LoadingSpinner from '../components/LoadingSpinner.svelte';
	import type { Article, ArticleResponse } from '$lib/types/article';

	let articles: Article[] = [];
	let filteredArticles: Article[] = [];
	let loading = true;
	let error = false;
	let searchQuery = '';
	let selectedCategory = 'all';
	let currentPage = 1;
	let totalPages = 1;
	let totalArticles = 0;

	// Get unique categories for filter
	$: categories = ['all', ...new Set(articles.map(article => article.category))];

	// Filter articles based on search and category
	$: filteredArticles = articles.filter(article => {
		const matchesSearch = searchQuery === '' || 
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.content.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
		
		return matchesSearch && matchesCategory;
	});

	onMount(async () => {
		try {
			const response: ArticleResponse = await ArticleService.getArticles(1, 50); // Load more articles for clips page
			articles = response.articles;
			totalArticles = response.total;
			totalPages = Math.ceil(totalArticles / 12);
			loading = false;
		} catch (err) {
			console.error('Failed to load articles:', err);
			error = true;
			loading = false;
		}
	});

	function clearFilters() {
		searchQuery = '';
		selectedCategory = 'all';
	}
</script>

<svelte:head>
	<title>Article Clips - Audrey Hill</title>
	<meta name="description" content="Browse all of Audrey Hill's investigative journalism articles and community reporting." />
</svelte:head>

<div class="clips-section">
	<div class="page-header">
		<h1>Article Clips</h1>
		<p class="page-subtitle">Explore my investigative journalism and community reporting</p>
	</div>

	<div class="filters-section">
		<div class="search-bar">
			<input 
				type="text" 
				placeholder="Search articles..." 
				bind:value={searchQuery}
				class="search-input"
			/>
		</div>
		
		<div class="category-filters">
			<select bind:value={selectedCategory} class="category-select">
				{#each categories as category}
					<option value={category}>
						{category === 'all' ? 'All Categories' : category}
					</option>
				{/each}
			</select>
			
			{#if searchQuery || selectedCategory !== 'all'}
				<button on:click={clearFilters} class="clear-filters">
					Clear Filters
				</button>
			{/if}
		</div>
	</div>

	{#if loading}
		<LoadingSpinner message="Loading articles..." />
	{:else if error}
		<div class="error-message">
			<p>Sorry, we couldn't load the articles right now. Please try again later.</p>
		</div>
	{:else if filteredArticles.length === 0}
		<div class="no-articles">
			<p>
				{#if searchQuery || selectedCategory !== 'all'}
					No articles found matching your criteria.
				{:else}
					No articles available at the moment.
				{/if}
			</p>
		</div>
	{:else}
		<div class="results-info">
			<p>Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}</p>
		</div>
		
		<div class="articles-grid">
			{#each filteredArticles as article (article.id)}
				<ArticleCard {article} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.clips-section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 1rem 0;
	}

	.page-subtitle {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
	}

	.filters-section {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.search-bar {
		margin-bottom: 1rem;
	}

	.search-input {
		width: 100%;
		max-width: 400px;
		padding: 0.75rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		font-size: 1rem;
		backdrop-filter: blur(10px);
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-theme-1);
		box-shadow: 0 0 0 2px rgba(255, 62, 0, 0.2);
	}

	.category-filters {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.category-select {
		padding: 0.5rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		font-size: 1rem;
		backdrop-filter: blur(10px);
	}

	.category-select:focus {
		outline: none;
		border-color: var(--color-theme-1);
	}

	.clear-filters {
		padding: 0.5rem 1rem;
		background: var(--color-theme-2);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 0.875rem;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.clear-filters:hover {
		background: var(--color-theme-1);
	}

	.results-info {
		margin-bottom: 1.5rem;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.875rem;
	}

	.articles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
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
		.page-header h1 {
			font-size: 2rem;
		}
		
		.articles-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		
		.clips-section {
			padding: 1rem;
		}
		
		.category-filters {
			flex-direction: column;
			align-items: stretch;
		}
		
		.category-select, .clear-filters {
			width: 100%;
		}
	}
</style>