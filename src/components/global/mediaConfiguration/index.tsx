import { SourceDeviceStateProps } from "@/hooks/useMediaResources";
import { useStudioSettings } from "@/hooks/useStudioSettings";
import React from "react";

type Props={
    state:SourceDeviceStateProps
    user:
    | ({
        subscription:{
            plan: 'PRO' | 'FREE'
        }|null
        studio:{
            id:string
            screen:string |null
            mic:string|null
            camera: string|null
            preset: 'HD'|'SD'
            userId:string|null
        }|null
    }&{
        id:string
        email:string
        firstname:string
        lastname:string
        createdAt: Date
        clerkId:string

    })|null
}
const MediaConfiguartion=({state,user}:Props)=>{
    const activeScreen=state.displays.find(display=>display.id===user?.studio?.screen)
    const activeAudio=state.audioInputs.find(audio=>audio.deviceId===user?.studio?.mic)
    const {isPending,
    onPreset,
    setPreset,
    register,
    watch}=useStudioSettings(
        user!.id,
        user?.studio?.screen || state.displays?.[0]?.id,
        user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
        user?.studio?.preset,
        user?.subscription?.plan

    )
    return (
<form action="
" className="flex h-full relative w-full flex-col gap-y-5">
    
</form>
    )
}
export default MediaConfiguartion;