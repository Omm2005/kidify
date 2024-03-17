'use server'

import { getServerAuthSession } from "~/server/auth"
import db from "~/server/db"

export const QuestionToDB = async (question: string , answer: string) => {
    const session = await getServerAuthSession()
    if(!session) {
        throw new Error("You must be logged in to do this")
    }

    const isThere = await db.query.findFirst({
        where: {
            question: question,
        }
    })

    if(!isThere) {

        const response  = await db.query.create({
            data: {
                question: question,
                answer: answer,
                userId: session?.user.id
            }
        })
        return response
    }
    }

    export const deleteQuestion = async (question: string) => {
        const session = await getServerAuthSession()
        if(!session) {
            throw new Error("You must be logged in to do this")
        }

        const query = await db.query.findFirst({
            where: {
                question: question,
                userId: session?.user.id
            }
        })

        const response = await db.query.delete({
            where: {
                question: question,
                userId: session?.user.id,
                id: query?.id
            }
        })
        return response
    }

    export const getQueries = async () => {
        const session = await getServerAuthSession()
        if(!session) {
            throw new Error("You must be logged in to do this")
        }

        const queries = await db.query.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                question: true,
                answer: true
            }
        })
        return queries
    }