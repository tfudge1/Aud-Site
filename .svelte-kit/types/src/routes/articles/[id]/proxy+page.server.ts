// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ArticleService } from '$lib/services/articleService';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	const { id } = params;
	
	try {
		const article = await ArticleService.getArticle(id);
		
		if (!article) {
			throw error(404, {
				message: 'Article not found'
			});
		}
		
		return {
			article
		};
	} catch (err) {
		console.error('Error loading article:', err);
		throw error(500, {
			message: 'Failed to load article'
		});
	}
};
