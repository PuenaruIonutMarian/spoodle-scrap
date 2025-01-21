"use client"
import React, { useCallback, useState } from 'react';
import {Dialog, DialogTrigger, DialogContent} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Layers2Icon, Loader2 } from 'lucide-react';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { useForm } from 'react-hook-form';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflows';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createWorkflow } from '@/actions/workflows/createWorkflow';
import { toast } from 'sonner';


const CreateWorkflowDialog = ({triggerText}:{triggerText?:string}) => {
    const[open, setOpen] = useState(false);

    //part of the shadcn form creation process (also has the scehma folder with workflows.ts)
    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues:{},
      });

      const {mutate, isPending} = useMutation(
        {
            mutationFn: createWorkflow,
            onSuccess: () => {
                toast.success("Workflow created successfully", {id:"create-workflow"});
            },
            onError: () => {
                toast.error("Failed to create workflow", {id:"create-workflow"});
            },
        }
      );

      const onSubmit = useCallback((values:createWorkflowSchemaType)=>{
        toast.loading("Creating workflow...", {id:"create-workflow"});
        mutate(values);
      },[mutate]);

  return (
    <Dialog open={open} onOpenChange={open => {form.reset();setOpen(open)}}>
        <DialogTrigger asChild>
            <Button >{triggerText ?? "Create Workflow"}</Button>
        </DialogTrigger>    
        <DialogContent className='px-0'>
            <CustomDialogHeader 
                icon={Layers2Icon}
                title="Create Workflow"
                subTitle="Create a new workflow to manage your credentials"
            />
            <div className="p-6">
                <Form {...form}> 
                    <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>
                                        Name
                                        <p className='text-xs text-primary'>(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Give your workflow a name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />    
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>
                                        Description
                                        <p className='text-xs text-muted-foreground'>(optional)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className='resize-none' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief description of what your workflow does.
                                        <br/> This is optional but can help you remember the workflow&apos;s purpose.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />    
                        <Button type='submit' className='w-full' disabled={isPending}>
                            {!isPending && "Proceed"}
                            {isPending && <Loader2 className='animate-spin'/>}
                        </Button>
                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog

