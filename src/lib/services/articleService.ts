import type { Article, ArticleResponse } from '$lib/types/article';

// Base URL for the API - using local SvelteKit API routes
const API_BASE_URL = '/api'; // Using relative path for SvelteKit API routes

export class ArticleService {
	private static baseUrl = API_BASE_URL;

	/**
	 * Fetch all articles
	 */
	static async getArticles(page: number = 1, limit: number = 12): Promise<ArticleResponse> {
		try {
			const response = await fetch(`${this.baseUrl}/articles?page=${page}&limit=${limit}`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching articles:', error);
			// Fallback to local sample data if API fails
			return this.getSampleArticles();
		}
	}

	/**
	 * Fetch a single article by ID
	 */
	static async getArticle(id: string): Promise<Article | null> {
		try {
			const response = await fetch(`${this.baseUrl}/articles/${id}`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			return await response.json();
		} catch (error) {
			console.error('Error fetching article:', error);
			return null;
		}
	}

	/**
	 * Fetch articles by category
	 */
	static async getArticlesByCategory(category: string, page: number = 1, limit: number = 12): Promise<ArticleResponse> {
		try {
			const response = await fetch(`${this.baseUrl}/articles/category/${category}?page=${page}&limit=${limit}`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching articles by category:', error);
			return this.getSampleArticles();
		}
	}

	/**
	 * Search articles
	 */
	static async searchArticles(query: string, page: number = 1, limit: number = 12): Promise<ArticleResponse> {
		try {
			const response = await fetch(`${this.baseUrl}/articles/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error searching articles:', error);
			return this.getSampleArticles();
		}
	}

	/**
	 * Get sample articles for development/fallback
	 */
	private static getSampleArticles(): ArticleResponse {
		return {
			articles: [
				{
					id: '1',
					title: 'Investigating Local Government Transparency',
					content: 'A deep dive into how local government meetings are conducted and the challenges facing transparency in municipal decision-making...',
					excerpt: 'This investigation reveals significant gaps in public access to government information and explores potential solutions.',
					imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Government building with transparency theme',
					publishDate: '2024-01-15',
					category: 'Investigative',
					author: 'Audrey Hill',
					readTime: '8 min read',
					url: 'https://example.com/article1'
				},
				{
					id: '2',
					title: 'Community Impact of New Infrastructure Project',
					content: 'An analysis of how the proposed highway expansion will affect local neighborhoods and businesses...',
					excerpt: 'Residents express mixed feelings about the development as city officials promise economic benefits.',
					imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Construction site with community impact theme',
					publishDate: '2024-01-10',
					category: 'Local News',
					author: 'Audrey Hill',
					readTime: '5 min read',
					url: 'https://example.com/article2'
				},
				{
					id: '3',
					title: 'Rising Costs of Education in Rural Areas',
					content: 'A comprehensive look at how rural school districts are struggling with funding and what it means for students...',
					excerpt: 'Teachers and administrators share their concerns about maintaining quality education despite budget constraints.',
					imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Rural school building with education theme',
					publishDate: '2024-01-05',
					category: 'Education',
					author: 'Audrey Hill',
					readTime: '7 min read',
					url: 'https://example.com/article3'
				},
				{
					id: '4',
					title: 'Climate Change Effects on Local Agriculture',
					content: 'Farmers in the region discuss how changing weather patterns are affecting their crops and livelihoods...',
					excerpt: 'Local agricultural experts weigh in on adaptation strategies for an uncertain future.',
					imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Farm field with climate change theme',
					publishDate: '2024-01-01',
					category: 'Environment',
					author: 'Audrey Hill',
					readTime: '6 min read',
					url: 'https://example.com/article4'
				},
				{
					id: '5',
					title: 'Mental Health Resources in Small Towns',
					content: 'An examination of mental health services availability and accessibility in rural communities...',
					excerpt: 'Healthcare professionals discuss the challenges of providing mental health support in underserved areas.',
					imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Mental health support theme',
					publishDate: '2023-12-28',
					category: 'Health',
					author: 'Audrey Hill',
					readTime: '9 min read',
					url: 'https://example.com/article5'
				},
				{
					id: '6',
					title: 'Technology Adoption in Rural Businesses',
					content: 'How small businesses are adapting to digital transformation and the challenges they face...',
					excerpt: 'Local entrepreneurs share their experiences with modernizing operations and reaching new customers.',
					imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
					imageAlt: 'Rural business with technology theme',
					publishDate: '2023-12-20',
					category: 'Business',
					author: 'Audrey Hill',
					readTime: '4 min read',
					url: 'https://example.com/article6'
				}
			],
			total: 6,
			page: 1,
			limit: 12
		};
	}
}
