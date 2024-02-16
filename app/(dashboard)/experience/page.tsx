import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/column'

const Experiencepage = async () => {

  const {userId} = auth()

  if(!userId){
    redirect('/')
  }

  const experience = await db.experience.findMany({
    where: {
      userid: userId
    }
  })

  return (
    <div className='p-12 justify-center'>
       <h1 className="text-3xl m-2 p-2 font-bold ">Los documentos de tu experiencia de aprendizaje 2024</h1>
        <DataTable columns={columns} data={experience} />
    </div>
  )
}

export default Experiencepage