import { db } from '@/lib/db'
import { auth, useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'


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

  const experiences = await db.experience.findMany({where: {
    userid: userId
  }})

  if (experiences.length === 0 ){

    return <>
    <div className='p-12 justify-center'>
    <h1 className="text-3xl m-2 p-2 font-bold ">Bienvedo, debes crear al menos una experiencia de aprendizaje para crear las sesiones de aprendizaje.</h1>
<Link href='/experience'>
    <Card className='border-red-500'>
      <CardHeader className='text-center font-bold'>
        Create your First Learning Experience 
      </CardHeader>
      <CardContent>
      <Image 
      src='/empty-red.svg'
      alt='undraw create image'
      width={150}
      height={150}
      className='m-auto'
      />
      </CardContent>
    </Card>
    </Link>
    </div>
    
    </>
  }
  return (
    <div className='p-12 justify-center'>
       <h1 className="text-3xl m-2 p-2 font-bold ">Crea tus sesiones de aprendizaje para 2024</h1>
        <DataTable columns={columns} data={session} />
    </div>
  )
}

export default Sessionpage