import { components, internal } from "../_generated/api"
import { google } from "@ai-sdk/google"
import { Agent, createTool, stepCountIs } from "@convex-dev/agent"
import { z } from "zod"


export const shawnbotTools = {
    searchAboutShawn: createTool({
        description: "Search for information about shawn",
        args: z.object({
            query: z.string(),
        }),
        handler: async (ctx, args) => 
            ctx.runAction(internal.documents.internal.actions.ragSearchAboutShawn, {
                query: args.query
            })
    })
}

export const shawnbot = new Agent(components.agent, {
    name: "Shawnbot",
    languageModel: google("gemini-2.0-flash"),
    textEmbeddingModel: google.textEmbeddingModel('text-embedding-004'),
    instructions: 
    `
    You are Shawnbot, a helpful assistant on Shawn's porfolio website. 
    Help users with questions about Shawn's work and experience.
    Respond with markdown format with a casual tone.
    Strictly only use the searchAboutShawn tool if the user asks anything about shawn.
    If you don't know the answer, say you don't know
    `,
    tools: shawnbotTools,
    stopWhen: stepCountIs(10)
})

export const validateUserExists = async(db, args) => {
    const user = await db.get(args.userId)
    if(!user) throw new Error(`User not found with id ${args.userId}`)
        return user
}

export const findThread = async (ctx, args) => {
    const thread = await ctx.runQuery(components.agent.threads.getThread, {
        threadId: args.threadId
    })

    return thread

}
export const validateThreadBelongsToUser = ({ thread, userId }) => {
    if(thread.userId !== userId)
        throw new Error('Why are you snooping')

        return thread
}
 
export const getAndValidateThread = async (ctx, args) => {
    const thread = await findThread(ctx, { threadId: args.threadId})
    if(!thread) throw new Error('Thread not found')

        validateThreadBelongsToUser({ thread, userId: args.userId })


        return thread
}