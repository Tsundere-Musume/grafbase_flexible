'use client'
import { deleteProject, fetchToken } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProjectActions = ({projectId}:{projectId:string}) => {
  const router = useRouter()
  const [isDelete, setIsDelete] = useState(false)
  const handleDeleteProject = async() => {
    setIsDelete(true)

    const {token} = await fetchToken()

    try{
        await deleteProject(projectId,token)
        router.push('/')
    }catch(error){
        console.error(error)
    }
    finally{
        setIsDelete(false)
    }
  }
  return (
    <>
    <Link href={`/edit-project/${projectId}`}
    className="flexCenter edit-action_btn">
        <Image src="/pencile.svg" width={15} height={15} alt="edit"/>
    </Link>

    <button
    type="button"
    onClick={handleDeleteProject}
    className={`flexCenter delete-action_btn ${isDelete? 'bg-gray' : 'bg-primary-purple'}`}>
        <Image src="/trash.svg" width={15} height={15} alt="edit"/>
    </button>
    </>
  )
}

export default ProjectActions