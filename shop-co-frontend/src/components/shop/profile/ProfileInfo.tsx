import React from "react";
import { IUser } from "@/shared/types/user.types";
import { Field } from "./Field";

interface ProfileInfoProps {
  user: IUser | null;
}



export default function ProfileInfo({ user }: ProfileInfoProps): React.JSX.Element {
  if (!user) {
    return (
      <div className="p-10 text-center text-[#888] text-sm tracking-widest uppercase">
        No user data available
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10">
      {/* Section header */}
      <div className="flex items-end justify-between border-b-2 border-[#1a1a1a] pb-4 mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#888] mb-1">Account</p>
          <h2 className="text-2xl font-light text-[#1a1a1a] tracking-wide">
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <span className="text-xs border border-[#1a1a1a] px-3 py-1 tracking-widest uppercase bg-[#1a1a1a] text-[#f5f0e8]">
          {user.role}
        </span>
      </div>

      {/* Avatar placeholder */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 bg-[#1a1a1a] text-[#f5f0e8] flex items-center justify-center text-xl font-light shrink-0">
          {user.firstName?.[0]}{user.lastName?.[0]}
        </div>
        <div>
          <p className="text-[#1a1a1a] font-medium">{user.email}</p>
          <p className="text-xs text-[#888] tracking-widest mt-1 uppercase">Primary account</p>
        </div>
      </div>

      {/* Fields */}
      <div>
        <Field label="First Name" value={user.firstName} />
        <Field label="Last Name" value={user.lastName} />
        <Field label="Email" value={user.email} />
        <Field label="Phone" value={user.phoneNumber} />
      </div>
    </div>
  );
}