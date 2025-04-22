export const base = () => {
	if (import.meta.env.VITE_GITHUB_PAGES === 'true') return '/mtkit'
	return '';
}
