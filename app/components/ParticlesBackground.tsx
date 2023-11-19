"use client";

import React, { ReactNode, useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particleOptions from "../helpers/particleOptions";

interface IProps {
  children?: ReactNode;
}

const ParticlesBackground = ({ children }: IProps) => {
  const particlesInit = useCallback(async (main: Engine) => {
    await loadFull(main);
  }, []);

  return (
    <div className="absolute h-screen w-screen z-[-9999]">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
      {children}
    </div>
  );
};

export default ParticlesBackground;
