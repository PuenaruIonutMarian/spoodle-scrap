import { cn } from "@/lib/utils"
import { TaskParam } from "@/types/task"
import { Handle, Position, useEdges } from "@xyflow/react"
import { ReactNode } from "react"
import NodeParamField from "./NodeParamField"
import { ColorForHandle } from "./common"


export function NodeInputs({children}:{children:React.ReactNode}) {
    return (
        <div className='flex flex-col gap-2 divide-y'>{children}</div>
    )
}

export function NodeInput({input, nodeId}:{input:TaskParam, nodeId:string}) {
    const edges = useEdges();
    const isConnected = edges.some(edge => edge.target === nodeId && edge.targetHandle === input.name);

    return (
        <div className='flex justify-start relative p-3 bg-secondary w-full'>
            {/* <pre>{JSON.stringify(input, null, 4)}</pre> */}

            <NodeParamField param={input} nodeId={nodeId} disabled={isConnected}/>
            {!input.hideHandle && (<Handle 
                id={input.name} 
                isConnectable={!isConnected}
                type="target" 
                position={Position.Left} 
                className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4", ColorForHandle[input.type])} />)}
        </div>
    )}