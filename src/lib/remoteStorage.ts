import type { Assignment, AttendanceRecord, JournalEntry } from '@/lib/types'
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient'

const TABLE_NAME = 'homeschool_state'
const SINGLETON_ID = 'primary'

type RemotePayload = {
  assignments: Assignment[]
  attendance: AttendanceRecord[]
  journal: JournalEntry[]
  updated_at: string
}

type RemoteRow = {
  id: string
  data: RemotePayload
  updated_at: string
}

export function supabaseEnabled(): boolean {
  return isSupabaseConfigured()
}

export async function fetchRemotePayload(): Promise<RemotePayload | null> {
  if (!supabaseEnabled()) {
    return null
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('data, updated_at')
    .eq('id', SINGLETON_ID)
    .maybeSingle<RemoteRow>()

  if (error) {
    // status 406/no rows is not an error condition for us
    if (error.code !== 'PGRST116') {
      throw error
    }
    return null
  }

  if (!data) {
    return null
  }

  return {
    ...data.data,
    updated_at: data.updated_at ?? new Date().toISOString()
  }
}

export async function persistRemotePayload(payload: RemotePayload): Promise<void> {
  if (!supabaseEnabled()) {
    return
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return
  }

  const timestamp = payload.updated_at ?? new Date().toISOString()
  const { error } = await supabase
    .from(TABLE_NAME)
    .upsert({
      id: SINGLETON_ID,
      data: {
        assignments: payload.assignments,
        attendance: payload.attendance,
        journal: payload.journal,
        updated_at: timestamp
      },
      updated_at: timestamp
    }, { onConflict: 'id' })

  if (error) {
    throw error
  }
}
