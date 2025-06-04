import { z } from 'zod';
import { MutationConfig } from '@/lib/react-query';
import { Discussion } from '@/types/api';
export declare const createDiscussionInputSchema: z.ZodObject<{
    title: z.ZodString;
    body: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    body: string;
}, {
    title: string;
    body: string;
}>;
export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;
export declare const createDiscussion: ({ data, }: {
    data: CreateDiscussionInput;
}) => Promise<Discussion>;
type UseCreateDiscussionOptions = {
    mutationConfig?: MutationConfig<typeof createDiscussion>;
};
export declare const useCreateDiscussion: ({ mutationConfig, }?: UseCreateDiscussionOptions) => import("@tanstack/react-query").UseMutationResult<Discussion, Error, {
    data: CreateDiscussionInput;
}, unknown>;
export {};
//# sourceMappingURL=create-discussion.d.ts.map