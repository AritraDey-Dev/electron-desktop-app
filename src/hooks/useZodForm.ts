import {zodResolver} from '@hookform/resolvers/zod'
import { DefaultValues,useForm } from 'react-hook-form'
import { z } from 'zod'

export const useZodForm = <T extends z.ZodType<any>>(
    schema: T,
    defaultValues?: DefaultValues<z.TypeOf<T>>|undefined,
) => {
    const { register, handleSubmit, formState:{errors},
     watch,
      reset } = useForm<T>({
        defaultValues,
        resolver: zodResolver(schema),
    })

    return {
        register,
        handleSubmit,
        errors,
        watch,
        reset,
    }
}