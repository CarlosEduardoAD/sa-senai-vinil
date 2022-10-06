import React from "react";

import HeroHome from "../components/HeroHome";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden -mt-6">

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
      </main>


    </div>
  );
}

export default Home;
