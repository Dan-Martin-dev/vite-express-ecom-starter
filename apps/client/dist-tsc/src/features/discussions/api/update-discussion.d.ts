import { z } from 'zod';
import { MutationConfig } from '@/lib/react-query';
import { Discussion } from '@/types/api';
export declare const updateDiscussionInputSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
}, {
    title: string;
    body: string;
}>;
export type UpdateDiscussionInput = z.infer<typeof updateDiscussionInputSchema>;
export declare const updateDiscussion: ({ data, discussionId, }: {
    data: UpdateDiscussionInput;
    discussionId: string;
}) => Promise<Discussion>;
type UseUpdateDiscussionOptions = {
    mutationConfig?: MutationConfig<typeof updateDiscussion>;
};
export declare const useUpdateDiscussion: ({ mutationConfig, }?: UseUpdateDiscussionOptions) => import("@tanstack/react-query").UseMutationResult<Discussion, Error, {
    data: UpdateDiscussionInput;
    discussionId: string;
}, unknown>;
export {};
//# sourceMappingURL=update-discussion.d.ts.map