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
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
      {children}
    </>
  );
};

export default ParticlesBackground;
