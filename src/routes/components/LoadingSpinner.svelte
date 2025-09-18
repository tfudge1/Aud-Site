<script lang="ts">
	/** @type {string} */
	let { message = 'Loading...' } = $props();
</script>

<div class="loading-container">
	<div class="spinner"></div>
	<p class="loading-message">{message}</p>
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		gap: 1rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-top: 4px solid var(--color-theme-1);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.loading-message {
		color: rgba(255, 255, 255, 0.8);
		font-size: 1rem;
		margin: 0;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
