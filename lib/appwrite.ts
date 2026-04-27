import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage, TablesDB } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.pius.fastfood",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
    categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
    menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
    customizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATION_COLLECTION_ID!,
    menuCustomizationsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATION_COLLECTION_ID!
}

export const client = new Client();

client
        .setEndpoint(appwriteConfig.endpoint!)
        .setProject(appwriteConfig.projectId!)
        .setPlatform(appwriteConfig.platform!)

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const create_user = async ({name, email, password}: CreateUserParams) => {
    try {
        const newAccount = await account.create({
            userId: ID.unique(), 
            email: email, 
            password: password, 
            name: name});

        if (!newAccount) throw Error;

        await signIn({email, password});
        
        const avatarUrl = avatars.getInitialsURL(name)

        return await tablesDB.createRow({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.userCollectionId!,
            rowId: ID.unique(),
            data: {
                accountId: newAccount.$id,
                email: email,
                name: name,
                avatar: avatarUrl}
});

    } catch (e) {
        throw new Error(e as string);
        
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession({email:email, password:password})
        return session;
    } catch (error) {
        throw new Error(error as string);
        
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw new Error('No current account');

        const currentUser = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId!,
            tableId: appwriteConfig.userCollectionId!,
            queries: [Query.equal('accountId', currentAccount.$id)]
        })

        if(!currentUser ) throw new Error('No user found');
        
        return currentUser.rows;

    } catch (error) {
        console.log(error)
        throw new Error(error as string);
        
    }
}

export const get_menu = async ({category, query}:GetMenuParams) => {
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.equal('name', query));

        const menus = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.menuCollectionId,
            queries: queries
        })

        return menus.rows

    } catch (error) {
        throw new Error(error as string);
        
    }
}

export const get_categories = async () => {
    try {
        const categories = await tablesDB.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.categoriesCollectionId,
        })
        return categories.rows
    } catch (error) {
        throw new Error(error as string);
    }
}