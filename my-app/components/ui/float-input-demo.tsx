"use client";

import FloatInput from "@/components/ui/float-input";
import { Mail } from "lucide-react";
import { useState } from "react";

export function FloatInputDemo() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <FloatInput
          icon={<Mail className="h-4 w-4 text-gray-400" />}
          label="Email Address"
          onChange={setEmail}
          placeholder="Enter your email"
          value={email}
        />
      </div>
    </div>
  );
}

export default FloatInputDemo;
