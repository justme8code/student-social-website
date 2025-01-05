'use client';

import useUserStore from "@/app/store/store";
import React, {useEffect} from "react";
import Navbar from "@/app/layout/Navbar";

import {Navbar2} from "@/app/layout/Navbar2";
import { ProfileHeader } from "../profile-info/ProfileHeader";
import {ProfileInfo} from "@/app/profile/profile-info/ProfileInfo";
import {ProfileBody} from "@/app/profile/profile-info/ProfileBody";
import {AboutProfile} from "@/app/profile/profile-info/AboutProfile";

export default function  ProfilePage() {
    const {user} = useUserStore();
  return (
      <>
      <Navbar2/>
      {
          user && (

              <div className={"mb-20"}>
                  <div className={"pt-14"}>
                      <ProfileHeader/>
                  </div>
                  <div className={"p-4 space-y-10"}>
                      <ProfileInfo/>

                      <ProfileBody/>

                      <AboutProfile/>

                  </div>
              </div>
          )
      }

      </>

  )
      ;
}
