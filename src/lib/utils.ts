import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const httpsClient=axios.create({
  baseURL:import.meta.env.VITE_HOST_URL,
})

export const oncloseApp=()=>window.ipcRenderer.send('closeApp')

export const fetchUserProfile=async (userId:string)=>{
const response=await httpsClient.get(`/auth/${userId}`,{
  headers:{
    'Content-Type':'application/json',
  }
})
console.log(response.data)
return response.data
}

export const getMediaResources = async () => {
  try {
    const displays = await window.ipcRenderer.invoke('getSources');
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter((device) => device.kind === 'audioinput');

    console.log('Getting resources...');
    return { displays, audio: audioInputs };
  } catch (error) {
    console.error('Error while getting media resources:', error);
    return { displays: [], audio: [] };
  }
};


export const updateStudioSettings=async (
  id:string,
  screen:string,
  audio:string,
  preset:'HD'|'SD',
)=>{
  const response=await httpsClient.put(`/studio/${id}`,{
    screen,
    audio,
    preset,
  },{
    headers:{
      "Content-Type":"application/json",
    }
  })
  console.log(response)
  return response.data;
}