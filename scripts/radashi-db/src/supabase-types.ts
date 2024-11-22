export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      benchmarks: {
        Row: {
          created_at: string
          func: string
          hz: number
          name: string
          rme: number
          sd: number
          sha: string
        }
        Insert: {
          created_at?: string
          func: string
          hz: number
          name: string
          rme: number
          sd: number
          sha: string
        }
        Update: {
          created_at?: string
          func?: string
          hz?: number
          name?: string
          rme?: number
          sd?: number
          sha?: string
        }
        Relationships: []
      }
      lodash_parity: {
        Row: {
          name: string
          notes: string | null
          rename: string | null
          status: Database['public']['Enums']['ParityStatus'] | null
          weekly_downloads_num: number
        }
        Insert: {
          name: string
          notes?: string | null
          rename?: string | null
          status?: Database['public']['Enums']['ParityStatus'] | null
          weekly_downloads_num: number
        }
        Update: {
          name?: string
          notes?: string | null
          rename?: string | null
          status?: Database['public']['Enums']['ParityStatus'] | null
          weekly_downloads_num?: number
        }
        Relationships: []
      }
      merged_functions: {
        Row: {
          committed_at: string | null
          committed_by: string | null
          created_at: string | null
          description: string | null
          documentation: string | null
          group: string | null
          id: number
          name: string
          ref: string | null
        }
        Insert: {
          committed_at?: string | null
          committed_by?: string | null
          created_at?: string | null
          description?: string | null
          documentation?: string | null
          group?: string | null
          id?: number
          name: string
          ref?: string | null
        }
        Update: {
          committed_at?: string | null
          committed_by?: string | null
          created_at?: string | null
          description?: string | null
          documentation?: string | null
          group?: string | null
          id?: number
          name?: string
          ref?: string | null
        }
        Relationships: []
      }
      meta: {
        Row: {
          id: string
          value: Json | null
        }
        Insert: {
          id: string
          value?: Json | null
        }
        Update: {
          id?: string
          value?: Json | null
        }
        Relationships: []
      }
      proposed_functions: {
        Row: {
          approval_rating: number
          breaking: boolean
          checks_passed: boolean
          committed_at: string | null
          committed_by: string | null
          created_at: string | null
          description: string | null
          documentation: string | null
          group: string | null
          id: number
          name: string
          pr_author: Json | null
          pr_number: number
          ref: string | null
          status: Database['public']['Enums']['pr_status']
        }
        Insert: {
          approval_rating: number
          breaking?: boolean
          checks_passed?: boolean
          committed_at?: string | null
          committed_by?: string | null
          created_at?: string | null
          description?: string | null
          documentation?: string | null
          group?: string | null
          id?: number
          name: string
          pr_author?: Json | null
          pr_number: number
          ref?: string | null
          status: Database['public']['Enums']['pr_status']
        }
        Update: {
          approval_rating?: number
          breaking?: boolean
          checks_passed?: boolean
          committed_at?: string | null
          committed_by?: string | null
          created_at?: string | null
          description?: string | null
          documentation?: string | null
          group?: string | null
          id?: number
          name?: string
          pr_author?: Json | null
          pr_number?: number
          ref?: string | null
          status?: Database['public']['Enums']['pr_status']
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      http: {
        Args: {
          request: Database['public']['CompositeTypes']['http_request']
        }
        Returns: Database['public']['CompositeTypes']['http_response']
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: Database['public']['CompositeTypes']['http_response']
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database['public']['CompositeTypes']['http_header']
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database['public']['CompositeTypes']['http_response']
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: Database['public']['CompositeTypes']['http_response']
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: Database['public']['CompositeTypes']['http_response']
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
    }
    Enums: {
      ParityStatus: 'no' | 'yes' | '100' | 'soon'
      pr_status: 'draft' | 'open' | 'closed' | 'merged'
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database['public']['CompositeTypes']['http_header'][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database['public']['CompositeTypes']['http_header'][] | null
        content: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
