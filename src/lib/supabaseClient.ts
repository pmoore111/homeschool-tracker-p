import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

function getConfig() {
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
	const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
	return {
		supabaseUrl: supabaseUrl?.trim() ?? '',
		supabaseKey: supabaseKey?.trim() ?? ''
	}
}

export function isSupabaseConfigured(): boolean {
	const { supabaseUrl, supabaseKey } = getConfig()
	return Boolean(supabaseUrl && supabaseKey)
}

export function getSupabaseClient(): SupabaseClient | null {
	if (!isSupabaseConfigured()) {
		return null
	}

	if (!cachedClient) {
		const { supabaseUrl, supabaseKey } = getConfig()
		cachedClient = createClient(supabaseUrl, supabaseKey)
	}

	return cachedClient
}

export const supabase = getSupabaseClient()
