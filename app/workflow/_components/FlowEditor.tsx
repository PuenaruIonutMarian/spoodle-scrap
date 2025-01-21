"use client"

import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, Position, ReactFlow, useNodesState, useReactFlow } from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'
import "@xyflow/react/dist/style.css"
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import NodeComponent from '@/app/workflow/_components/nodes/NodeComponent'
import { set } from 'date-fns'
import { AppNode } from '@/types/appNode'


const nodeTypes = {
    FlowScrapeNode: NodeComponent,
};

const snapGrid: [number, number]  = [50, 50];
const fitViewOptions = { padding: 1 };

const FlowEditor = ({workflow}:{workflow:Workflow}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const[edges, setEdges, onEdgesChange] = useNodesState([]);
    const {setViewport, screenToFlowPosition} = useReactFlow();


    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if(!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            if (!flow.viewport) return;
            const {x=0, y=0, zoom=1} = flow.viewport;
            setViewport({x, y, zoom});
        } catch (error) {
            
        }

    },[workflow.definition, setNodes, setEdges, setViewport])

    const onDragOver = useCallback((event:React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event:React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData("application/reactflow");
        if (typeof taskType === undefined || !taskType) return;

        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode = CreateFlowNode(taskType as TaskType, position);
        setNodes((nds) => nds.concat(newNode))
    }, [screenToFlowPosition, setNodes]);

  return (
    <main className='h-full w-full'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            snapToGrid
            snapGrid={snapGrid}
            fitView
            fitViewOptions={fitViewOptions}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <Controls position="top-left" fitViewOptions={fitViewOptions}/>
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
    </main>
  )
}

export default FlowEditor