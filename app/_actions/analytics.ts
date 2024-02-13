
'use server'

import { db } from "@/lib/db"

 
export async function getAnalytics() {
  try {
   const total_users = await db.user.count()

   const total_teachers = await db.user.count({where: {
    isTeacher: true
   }})

   const total_gaps_created = await db.gAP.count({})
   const total_gap_stage_2  = await db.gAP.count({})
   const total_gap_stage_3  = await db.gAP.count({})

   const total_sessions = await db.session.count({})
   const total_experiences = await db.experience.count({})


    return{
        total_users,
        total_gaps_created,
        total_teachers,
        total_experiences,
        total_sessions,

    }

  } catch (error) {
    console.error("TOTAL_USERS_ERROR",error)
    return {
        error
    }
  }
   
}

// export async function createTeachers(){
// try{

// }catch(error){
//     console.log("CREATE_TEACHERS_ERROR",error)
// }
// }


// export async function getTeachers(){
//     try{

//     }catch(error){
//         console.log("CREATE_TEACHERS_ERROR",error)
//     }
// }