'use client'

import { TeamSelect } from '@/components/TeamSelect';
import { serverUrl } from '@/config/api';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { addFootballerAction } from '@/actions/addFootballerAction';
import { countries } from '@/consts/countries';
import { SubmitButton } from '@/components/SubmitButton';
import { FormTitle } from '@/components/FormTitle';
import { BaseForm } from '@/components/BaseForm';


const AddFootballerForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const addFootballerActionHandler = async (formData: FormData) => {
    const name = formData.get('name')! as string
    const surname = formData.get('surname')! as string
    const gender = formData.get('gender')! as 'Male' | 'Female'
    const birthdate = formData.get('birthdate')! as string
    const team = formData.get('team')! as string
    const country = formData.get('country')! as string

    const response = await addFootballerAction({
      name,
      surname,
      birthdate,
      team,
      country,
      gender
    })


    if (!response.error) {
      toast.success('Игрок добавлен успешно')
      formRef.current?.reset()
    } else {
      toast.error(response.error)
    }
  }

  return (
    <BaseForm
      ref={ formRef }
      action={ addFootballerActionHandler }>

      <FormTitle className='text-center' isMain>Введите данные о футболисте</FormTitle>

      <div className='grid grid-cols-[1fr_3fr] mt-10 gap-y-5'>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='name'>Имя</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='name' type='text' name='name'
               required/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='surname'>Фамилия</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='surname' type='text'
               name='surname' required/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='gender'>Пол</label>
        <select className='px-2 py-1 border-black border-[1px] rounded-md' id='gender' name='gender' required
                defaultValue=''>
          <option disabled value=''>Выбрать пол</option>
          <option value='Male'>Мужской</option>
          <option value='Female'>Женский</option>
        </select>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='birthdate'>Дата рождения</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='birthdate' type='date'
               name='birthdate' required/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='team'>Команда</label>
        <TeamSelect/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='country'>Страна</label>
        <select className='px-2 py-1 border-black border-[1px] rounded-md' id='country' name='country' required
                defaultValue=''>
          <option disabled value=''>Выберите страну</option>
          { countries.map(country => {
            return <option value={ country } key={ country }>{ country }</option>
          }) }
        </select>

      </div>

      <SubmitButton className='mt-10 text-center mx-auto block' pendingText='Добавление футболиста...'>
        Добавить футболиста</SubmitButton>

    </BaseForm>
  );
};

export { AddFootballerForm };