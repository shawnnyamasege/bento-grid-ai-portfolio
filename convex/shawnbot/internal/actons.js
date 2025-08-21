import { internalAction } from "../../_generated/server";
import { v } from "convex/values";
import { shawnbot } from "../lib";

export const streamStory = internalAction({
    args: { promptMessageId: v.string(), threadId: v.string()},
    handler: async (ctx, {promptMessageId, threadId}) => {

        await shawnbot.generateAndSaveEmbeddings(ctx, {
            messageIds: [promptMessageId]
        })

        // start streaming the response word by word
        const result = await shawnbot.streamText(
            ctx,
            { threadId },
            { promptMessageId },
            {
                saveStreamDeltas: {
                    chunking: "word",
                    throttleMs: 250
                }
            }
        )

        await result.consumeStream()


    }
})