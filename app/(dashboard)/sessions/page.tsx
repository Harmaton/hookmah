import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'


const Sessionpage = async () => {
  const {userId} = auth()

  if(!userId){
    redirect('/')
  }
  const session = await db.session.findMany({
    where: {
      userid: userId
    }
  })

  return (
    <div className='p-12 justify-center'>
       <h1 className="text-3xl m-2 p-2 font-bold ">Crea tus sesiones de aprendizaje para 2024</h1>
        <DataTable columns={columns} data={session} />
    </div>
  )
}

export default Sessionpage