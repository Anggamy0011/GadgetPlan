export type AppUser = {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
};

export async function getCurrentUser(): Promise<AppUser | null> {
  // TODO: Implementasikan dengan Supabase Auth atau sesi kustom
  return null;
}
