import Spinner from "@/components/loader";
import { useMediaResources } from "@/hooks/useMediaResources";
import { fetchUserProfile } from "@/lib/utils";
import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import MediaConfiguration from "../mediaConfiguration";

const Widget=()=>{
    const {user}=useUser();
    const {state,fetchMediaResources}=useMediaResources();
    const [profile, setProfile] = useState<{
      status: number;
        user: {
          subscription: {
            plan: 'PRO' | 'FREE';
          } | null;
          studio: {
            id: string;
            screen: string | null;
            mic: string | null;
            preset: 'HD' | 'SD';
            camera: string | null;
            userId: string | null;
          } | null;
        } & {
          id: string;
          email: string;
          firstname: string | null;
          lastname: string | null;
          createdAt: string;
          clerkId: string;
        };
      } | null>(null);
      
      useEffect(() => {
        if(user && user.id){
          fetchUserProfile(user.id).then((res)=>{
            setProfile(res);
          })
        }
      }, [user]);
      console.log("state",state);
    return (
        <div className="p-5">
          <ClerkLoading>
            <div className="flex h-full justify-center items-center">
            <Spinner/>
            </div>
            </ClerkLoading>
            <SignedIn>
            {profile ? (
    <MediaConfiguration state={state} user={profile?.user} /> 
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner color='#3498db' />
    </div>
  )}
                </SignedIn>
        </div>
    )
}   

export default Widget