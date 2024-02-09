'use server'

import { serverUrl } from '@/config/api';
import { IErrorResponse } from '@/types/IErrorResponse';

export const addTeamAction = async (teamName: string): Promise<IErrorResponse> => {
  const response = await fetch(`${ serverUrl }/teams`, {
    method: 'POST',
    body: JSON.stringify(
      {
        teamName
      }
    ),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const result = await response.json() as IErrorResponse
    return {
      error: result.error || 'Что-то пошло не так'
    }
  } else {
    return { error: undefined }
  }
}