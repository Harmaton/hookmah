import { CheckCheck } from 'lucide-react'
import React from 'react'
import { Actions } from './actions'
import { FirstAction } from '../../_components/actions'

type SubheadrProps = {
    id: string
    completedFields: number
    isComplete: boolean
    isfirst: boolean
    issecond: boolean
}

export default function Subheader({id,completedFields,isComplete, issecond, isfirst}: SubheadrProps) {
  return (
    <div className="flex justify-between items-center p-2 border rounded-md mb-2">
                <div className="flex items-center">
                  <h1 className="font-bold mr-2 ">
                    Todo{" "}
                    {completedFields}
                  </h1>
                  <div className="h-10 w-10 flex rounded-full bg-green-500">
                    <CheckCheck className="mx-auto my-auto" />
                  </div>
                </div>
                {(isComplete && issecond) && (
                  <div>
                    <Actions disabled={false} gapid={id} />
                  </div>
                )}
                 {(isComplete && isfirst) && (
                  <div>
                    <FirstAction disabled={false} gapid={id} />
                  </div>
                )}
              </div>
  )
}
