export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          site_name: string
          logo_url: string | null
          favicon_url: string | null
          phone: string | null
          email: string | null
          address: string | null
          instagram_url: string | null
          facebook_url: string | null
          whatsapp_number: string | null
          footer_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_name?: string
          logo_url?: string | null
          favicon_url?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          whatsapp_number?: string | null
          footer_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_name?: string
          logo_url?: string | null
          favicon_url?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          instagram_url?: string | null
          facebook_url?: string | null
          whatsapp_number?: string | null
          footer_text?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      menu_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          slug: string
          display_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          slug: string
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          slug?: string
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          price: number
          sale_price: number | null
          image_url: string | null
          is_featured: boolean | null
          is_available: boolean | null
          slug: string
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          price: number
          sale_price?: number | null
          image_url?: string | null
          is_featured?: boolean | null
          is_available?: boolean | null
          slug: string
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          price?: number
          sale_price?: number | null
          image_url?: string | null
          is_featured?: boolean | null
          is_available?: boolean | null
          slug?: string
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      hero_banners: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          image_url: string
          button_text: string | null
          button_link: string | null
          display_order: number | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          image_url: string
          button_text?: string | null
          button_link?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          image_url?: string
          button_text?: string | null
          button_link?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          position: string | null
          content: string
          avatar_url: string | null
          rating: number | null
          is_active: boolean | null
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          position?: string | null
          content: string
          avatar_url?: string | null
          rating?: number | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          position?: string | null
          content?: string
          avatar_url?: string | null
          rating?: number | null
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image_url: string | null
          author_id: string | null
          is_published: boolean | null
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image_url?: string | null
          author_id?: string | null
          is_published?: boolean | null
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image_url?: string | null
          author_id?: string | null
          is_published?: boolean | null
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          phone: string | null
          email: string | null
          latitude: number | null
          longitude: number | null
          opening_hours: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          phone?: string | null
          email?: string | null
          latitude?: number | null
          longitude?: number | null
          opening_hours?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          phone?: string | null
          email?: string | null
          latitude?: number | null
          longitude?: number | null
          opening_hours?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string | null
          description: string | null
          image_url: string
          is_active: boolean | null
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          description?: string | null
          image_url: string
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          description?: string | null
          image_url?: string
          is_active?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
