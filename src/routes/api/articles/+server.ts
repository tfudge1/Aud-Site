import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ArticleResponse } from '$lib/types/article';

// Sample article data - in a real app, this would come from a database
const sampleArticles = [
	{
		id: '1',
		title: 'Investigating Local Government Transparency',
		content: 'A deep dive into how local government meetings are conducted and the challenges facing transparency in municipal decision-making. This investigation reveals significant gaps in public access to government information and explores potential solutions to improve accountability.',
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
		content: 'An analysis of how the proposed highway expansion will affect local neighborhoods and businesses. Residents express mixed feelings about the development as city officials promise economic benefits.',
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
		content: 'A comprehensive look at how rural school districts are struggling with funding and what it means for students. Teachers and administrators share their concerns about maintaining quality education despite budget constraints.',
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
		content: 'Farmers in the region discuss how changing weather patterns are affecting their crops and livelihoods. Local agricultural experts weigh in on adaptation strategies for an uncertain future.',
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
		content: 'An examination of mental health services availability and accessibility in rural communities. Healthcare professionals discuss the challenges of providing mental health support in underserved areas.',
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
		content: 'How small businesses are adapting to digital transformation and the challenges they face. Local entrepreneurs share their experiences with modernizing operations and reaching new customers.',
		excerpt: 'Local entrepreneurs share their experiences with modernizing operations and reaching new customers.',
		imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
		imageAlt: 'Rural business with technology theme',
		publishDate: '2023-12-20',
		category: 'Business',
		author: 'Audrey Hill',
		readTime: '4 min read',
		url: 'https://example.com/article6'
	}
];

export const GET: RequestHandler = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const limit = parseInt(url.searchParams.get('limit') || '12');
	const category = url.searchParams.get('category');
	const search = url.searchParams.get('search');

	let filteredArticles = [...sampleArticles];

	// Filter by category if provided
	if (category && category !== 'all') {
		filteredArticles = filteredArticles.filter(article => 
			article.category.toLowerCase() === category.toLowerCase()
		);
	}

	// Filter by search query if provided
	if (search) {
		const searchLower = search.toLowerCase();
		filteredArticles = filteredArticles.filter(article =>
			article.title.toLowerCase().includes(searchLower) ||
			article.excerpt.toLowerCase().includes(searchLower) ||
			article.content.toLowerCase().includes(searchLower)
		);
	}

	// Sort by publish date (newest first)
	filteredArticles.sort((a, b) => 
		new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
	);

	// Pagination
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

	const response: ArticleResponse = {
		articles: paginatedArticles,
		total: filteredArticles.length,
		page,
		limit
	};

	return json(response);
};
