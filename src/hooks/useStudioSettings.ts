import { updateStudioSettingsSchema } from "@/schemas/studio-settings";
import { useZodForm } from "./useZodForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateStudioSettings } from "@/lib/utils";


type PresetType = 'HD' | 'SD';
type PlanType = 'PRO' | 'FREE';

export const useStudioSettings = (
  id: string,
  screen?: string | null,
  audio?: string,
  preset?: PresetType,
  plan?: PlanType
) => {
  const [onPreset, setPreset] = useState<PresetType | undefined>(preset);

  const { register, watch } = useZodForm(updateStudioSettingsSchema, {
    screen: screen || "", 
    audio: audio || "",
    preset: preset || "HD", 
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-studio"],
    mutationFn: async (data: {
      screen: string;
      id: string;
      audio: string;
      preset: PresetType;
    }) => {
      return await updateStudioSettings(data.id,
         data.screen, data.audio, data.preset);
    },
    onSuccess: (response) => {
      toast(response.status === 200 ? "success" : "error", {
        description: response.message,
      });
    },
    onError: (error: any) => {
      toast("error", {
        description: error.message || "Failed to update studio settings.",
      });
    },
  });
useEffect(() => {
    if(screen && audio && preset){
    window.ipcRenderer.send('media-sources',{
        screen,
        id:id,
        audio,
        preset,
        plan
      })
    }
    },[])

    useEffect(() => {
        const subscribe=watch((values)=>{

                setPreset(values.preset);
           
            mutate({
                screen:values.screen||"",
                id,
                audio:values.audio||"",
                preset:values.preset||"HD",
            })
            window.ipcRenderer.send('media-sources',{
                screen:values.screen||"",
                id:id,
                audio:values.audio||"",
                preset:values.preset||"HD",
                plan:values.plan||"FREE"
              })
        })
        return ()=>subscribe.unsubscribe()
    },[watch])

  return {
    onPreset,
    setPreset,
    register,
    watch,
    mutate,
    isPending,
  };
};
