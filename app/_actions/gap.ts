import { GAP } from "@prisma/client";

import { db } from "@/lib/db";

type GetGapProps = {
    userid: string
}

export const getGap = async ({
    userid
}: GetGapProps) => {

    try {
        const gap =await db.gAP.findUnique({
            where: {
                userid: userid
            }
        })
        return {gap}
    } catch (error) {
        console.log("Error Getting Programming")
        return{gap: null}
    }

}