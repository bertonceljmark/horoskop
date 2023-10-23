"use client";

import React, { Dispatch, useCallback } from "react";
import Particles from "react-particles";
import type { Container, ISourceOptions, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import particleOptions from "../helpers/particleOptions";

interface IProps {
  setPageLoading: Dispatch<React.SetStateAction<boolean>>;
}
const ParticlesBackground = ({ setPageLoading }: IProps) => {
  const particlesInit = async (main: Engine) => await loadFull(main);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      setPageLoading(false);
    },
    [setPageLoading]
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
    />
  );
};

export default ParticlesBackground;
