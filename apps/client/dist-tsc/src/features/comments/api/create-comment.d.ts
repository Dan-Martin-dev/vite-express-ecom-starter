import { z } from 'zod';
import { MutationConfig } from '@/lib/react-query';
import { Comment } from '@/types/api';
export declare const createCommentInputSchema: z.ZodObject<{
    discussionId: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    body: string;
    discussionId: string;
}, {
    body: string;
    discussionId: string;
}>;
export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;
export declare const createComment: ({ data, }: {
    data: CreateCommentInput;
}) => Promise<Comment>;
type UseCreateCommentOptions = {
    discussionId: string;
    mutationConfig?: MutationConfig<typeof createComment>;
};
export declare const useCreateComment: ({ mutationConfig, discussionId, }: UseCreateCommentOptions) => import("@tanstack/react-query").UseMutationResult<Comment, Error, {
    data: CreateCommentInput;
}, unknown>;
export {};
//# sourceMappingURL=create-comment.d.ts.map