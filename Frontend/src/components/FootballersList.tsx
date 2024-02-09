'use client'

import { IFootballer } from '@/types/IFootballer';
import React, { useRef, useState } from 'react';
import Modal from './Modal';
import { TeamSelect } from '@/components/TeamSelect';
import { countries } from '@/consts/countries';
import { SubmitButton } from '@/components/SubmitButton';
import { editFootballerAction, IEditFootballerDto } from '@/actions/editFootballerAction';
import toast from 'react-hot-toast';
import { UpdateFootballerForm } from '@/components/UpdateFootballerForm';

const FootballersList = ({ footballers }: { footballers: IFootballer[] }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedFootballer, setSelectedFootballer] = useState<IFootballer | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const onModalClose = () => {
    setIsModalOpened(false)
    setSelectedFootballer(null)
    formRef.current?.reset()
  }

  const onPlayerCardClicked = (footballer: IFootballer) => {
    setIsModalOpened(true)
    setSelectedFootballer(footballer)
  }

  const editFootballerActionHandler = async (formData: FormData) => {
    if (!selectedFootballer)
      return

    const newFootballer: IEditFootballerDto = {
      footballerId: selectedFootballer.footballerId,
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      gender: formData.get('gender') as 'Female' | 'Male',
      country: formData.get('country') as string,
      teamName: formData.get('team') as string,
      birthDate: formData.get('birthdate') as string
    }

    const response = await editFootballerAction(newFootballer)

    if (!response.error) {
      toast.success('Игрок был успешно изменен')
      onModalClose()
    } else {
      toast.error(response.error)
    }
  }

  return (
    <>
      <div className='flex flex-wrap justify-self-stretch p-5 gap-5'>
        { footballers.map(footballer => {
          return (
            <div className='border-[1px] border-black p-3 flex flex-col gap-y-1 rounded-xl shadow-md'
                 key={ footballer.footballerId }>
              <div>Имя: { footballer.name }</div>
              <div>Фамилия: { footballer.surname }</div>
              <div>Пол: { footballer.gender == 'Male' ? 'Мужской' : 'Женский' }</div>
              <div>Дата рождения: { footballer.birthDate.toString() }</div>
              <div>Команда: { footballer.teamName }</div>
              <div>Страна: { footballer.country }</div>
              <button
                className='mt-3 text-white px-5 py-3 bg-blue-400 rounded-xl hover:bg-blue-700 transition-colors self-center'
                onClick={ () => onPlayerCardClicked(footballer) }>Редактировать игрока
              </button>
            </div>
          )
        }) }
      </div>
      <Modal open={ isModalOpened } onClose={ onModalClose }>
        <h2 className='text-2xl font-medium'>Редактировать игрока</h2>
        <UpdateFootballerForm selectedFootballer={ selectedFootballer } action={ editFootballerActionHandler }/>
      </Modal>
    </>

  );
};

export {
  FootballersList
};