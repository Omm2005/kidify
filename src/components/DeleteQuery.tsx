'use client'

import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { deleteQuestion } from "~/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DeleteQueryProps {
  id: string
}

const DeleteQuery = ({id} : DeleteQueryProps) => {
    const router = useRouter()
    const handleDelete = async() => {
        try {
           await deleteQuestion(id).then(() => {
                toast.success("Question Deleted")
                router.refresh()
              })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button onClick={handleDelete} size='icon' variant='link' className="p-0 m-0">
        <Trash className="text-destructive" />
    </Button>
    )
}

export default DeleteQuery