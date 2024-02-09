'use client'

import { serverUrl } from '@/config/api';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { addTeamAction } from '@/actions/addTeamAction';
import { SubmitButton } from '@/components/SubmitButton';
import { FormTitle } from '@/components/FormTitle';
import { BaseForm } from '@/components/BaseForm';


const AddTeamForm = () => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const addTeamActionHandler = async (formData: FormData) => {
    const teamName = formData.get('team-name') as string

    if (!teamName)
      return

    const response = await addTeamAction(teamName)

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Команда была успешно добавлена')
      formRef.current?.reset()
      queryClient.setQueryData(['teams'], (oldData: {
        teamsList: string[]
      }) => {
        return {
          teamsList: [...oldData.teamsList, teamName]
        }
      })
    }
  }

  return (
    <BaseForm
      action={ addTeamActionHandler }
      ref={ formRef }>
      <FormTitle className='text-center'>Не нашли свою команду? Добавьте ее</FormTitle>
      <div className='flex gap-x-3 mt-10 items-center'>
        <label htmlFor='team_name'>Название команды</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' type='text' id='team_name'
               name='team-name' required/>
      </div>
      <SubmitButton className='mt-10 block mx-auto' pendingText='Добавление команды...'>Добавить команду</SubmitButton>
    </BaseForm>
  );
};

export { AddTeamForm };