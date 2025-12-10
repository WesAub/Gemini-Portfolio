
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string; // Main display image
  year: string;
  link?: string;
  createdAt: string;
}

export type ViewState = 'home' | 'admin';
export type PortfolioTab = 'creative' | 'engineer' | 'service inds.';

export interface ResumeItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ResumeData {
  title: string;
  summary: string;
  experience: ResumeItem[];
  education: ResumeItem[];
  skills: string[];
  projects?: ResumeItem[]; // Added for Engineering Resume
  leadership?: ResumeItem[]; // Added for Engineering Resume
  pdfUrl?: string; // Link to the downloadable PDF file
}

/*
  SUPABASE SCHEMA REFERENCE:

  -- Enable Storage
  insert into storage.buckets (id, name) values ('portfolio', 'portfolio');
  create policy "Public Access" on storage.objects for select using ( bucket_id = 'portfolio' );
  create policy "Auth Upload" on storage.objects for insert with check ( bucket_id = 'portfolio' );

  -- Table: projects
  create table public.projects (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    category text,
    image_url text,
    year text,
    link text,
    created_at timestamp with time zone default timezone('utc'::text, now())
  );
  
  -- Enable RLS (Row Level Security) if needed, currently keeping open for demo
  alter table public.projects enable row level security;
  create policy "Enable read access for all users" on "public"."projects" for select using (true);
  create policy "Enable insert for all users" on "public"."projects" for insert with check (true);
*/