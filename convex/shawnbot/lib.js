import { components } from "../_generated/api"
import { google } from "@ai-sdk/google"
import { Agent } from "@convex-dev/agent"

export const shawnbot = new Agent(components.agent, {
    name: "Shawnbot",
    chat: google('gemini-2.0-flash'),
    textEmbedding: google.textEmbeddingModel('text-embedding-004'),
    instructions: 
    `
    You are Shawnbot, a helpful assistant on Shawn's porfolio website. 
    Help users with questions about Shawn's work and experience.
    Respond with markdown format with a casual tone.
    `
})

export const validateUserExists = async(db, args) => {
    const user = await db.get(args.userId)
    if(!user) throw new Error(`User not found with id ${args.userId}`)
        return user
}

export const findThread = async ({ ctx, args }) => {
    const thread = await ctx.runQuery(components.agent.threads.getThread, {
        threadId: args.threadId
    })

    return thread

}
export const validateThreadBelongsToUser = async ({ thread, userId }) => {
    if(thread.userId != userId)
        throw new Error('Why are you snooping')

        return thread
}
 
export const getAndValidateThread = async (ctx, args) => {
    const thread = await findThread(ctx, { threadId: args.threadId})
    if(!thread) throw new Error('Thread not found')

        validateThreadBelongsToUser({ thread, userId: args.userId})


        return thread
}