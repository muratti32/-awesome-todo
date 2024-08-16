import { Client, Databases, ID, Query } from "appwrite";
import type { Todo } from "../types";

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.avk.aora",
    projectId: "668a91030039dbca8d01",
    databaseId: '668a92c10017a5f461f7',
    todosCollectionId: '66be63b40005d4afac06',
}

const {
    endpoint,
    projectId,
    databaseId,
    todosCollectionId,
} = appWriteConfig;

const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectId);

const databases = new Databases(client);





export const addTodo = async (content: string): Promise<any> => {
    try {
        const todo = await databases.createDocument(
            databaseId,
            todosCollectionId,
            ID.unique(),
            {
                content,
                completed: false
            }
        )
        if (!todo) throw new Error("No todo created");
        return todo;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getAllTodos = async (): Promise<Todo[]> => {
    try {
        const todos = await databases.listDocuments(
            databaseId,
            todosCollectionId,
            [
                Query.orderAsc("$createdAt")
            ]
        )
        if (!todos) throw new Error("No todo found");
        return todos.documents as Todo[];
    } catch (error: any) {
        throw new Error(error.message);
    }
}


export const deleteTodo = async (documentId: string) => {
    try {
        const todo = await databases.deleteDocument(
            databaseId,
            todosCollectionId,
            documentId
        )
        if (!todo) throw new Error("No todo deleted");
        return todo;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateTodo = async (documentId: string, content: string) => {
    try {
        const todo = await databases.updateDocument(
            databaseId,
            todosCollectionId,
            documentId,
            {
                content
            }
        )
        if (!todo) throw new Error("No todo updated");
        return todo;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateTodoStatus = async (documentId: string, completed: boolean) => {
    try {
        const todo = await databases.updateDocument(
            databaseId,
            todosCollectionId,
            documentId,
            {
                completed
            }
        )
        if (!todo) throw new Error("No todo updated");
        return todo;
    } catch (error: any) {
        throw new Error(error.message);
    }
}