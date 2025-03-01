import React, { useState, useEffect } from 'react';
import { createActor, chairman_dao } from "../declarations/chairman_dao";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actor, setActor] = useState(chairman_dao);

  useEffect(() => {
    if (isAuthenticated) {
      // At this point we're authenticated, create an agent and actor
      const fetchActor = async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        const newActor = createActor("be2us-64aaa-aaaaa-qaabq-cai", { agent });
        setActor(newActor);
      };
      fetchActor();
    }
  }, [isAuthenticated]);

  const handleLoginClick = async () => {
    const authClient = await AuthClient.create();
    await new Promise((resolve) => {
      authClient.login({
        identityProvider: "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/",
        onSuccess: resolve,
      });
    });
    setIsAuthenticated(true);
  };

  return (
    <div>
      <button
        id="login"
        onClick={handleLoginClick}
        disabled={isAuthenticated}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
