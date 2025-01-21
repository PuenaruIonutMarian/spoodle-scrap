"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Retrieves all workflows associated with the authenticated user.
 *
 * This function fetches workflows for the currently authenticated user from the database,
 * ordered by their creation date in ascending order. If the user is not authenticated,
 * an error is thrown.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of workflow objects.
 * @throws {Error} If the user is not authenticated.
 */

export async function GetWorkflowsForUser() {
    const {userId} = auth();
    if(!userId){
        throw new Error("Unauthenticated");
    }
    return prisma.workflow.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}