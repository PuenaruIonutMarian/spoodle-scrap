"use client"
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip"
import React, {ReactNode} from 'react'

interface Props {
    children: ReactNode;
    content:ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}

const TooltipWrapper = (props:Props) => {
  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
            <TooltipTrigger asChild>
                {props.children}
            </TooltipTrigger>
            <TooltipContent side={props.side}>
                {props.content}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper