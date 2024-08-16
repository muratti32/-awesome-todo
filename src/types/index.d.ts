export interface Todo {
    content: string
    completed: boolean
    $id: string
    $tenant: string
    $createdAt: string
    $updatedAt: string
    $permissions: any[]
    $databaseId: string
    $collectionId: string
}

export type FilterType = 'all' | 'completed' | 'incomplete'