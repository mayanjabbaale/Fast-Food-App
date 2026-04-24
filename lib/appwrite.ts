import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, TablesDB } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    platform: "com.pius.fastfood",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID
}

export const client = new Client();

client
        .setEndpoint(appwriteConfig.endpoint!)
        .setProject(appwriteConfig.projectId!)
        .setPlatform(appwriteConfig.platform!)

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client)
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