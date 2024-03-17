'use server'

import { getServerAuthSession } from "~/server/auth"
import db from "~/server/db"

export const CreateQuery = async (question: string , answer: string) => {
    const session = await getServerAuthSession()
    if(!session) {
        throw new Error("You must be logged in to do this")
    }

    const answerExists = await db.query.findFirst({
        where: {
            question: question,
            userId: session?.user.id
        }
    })

    if(!answerExists) {
        const response  = await db.query.create({
            data: {
                question: question,
                answer: answer,
                userId: session?.user.id,
            }
        })
        return response
    } else {
        return console.log("Question already exists")
    }
    }

    export const deleteQuestion = async (id: any) => {
        const session = await getServerAuthSession()
        if(!session) {
            throw new Error("You must be logged in to do this")
        }

        const response = await db.query.delete({
            where: {
                userId: session?.user.id,
                id: id
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
                id: true,
                question: true,
                answer: true
            }
        })
        return queries
    }