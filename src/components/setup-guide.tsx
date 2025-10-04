"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSetupInstructions } from "@/lib/env-check";
import { CheckCircle, Circle, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

interface SetupGuideProps {
  envStatus: {
    clerk: boolean;
    supabase: boolean;
    ai: boolean;
    allConfigured: boolean;
  };
}

export function SetupGuide() {
  return null;
}
