import React, { PropsWithChildren } from "react";
import Collections from "./components/Collections";
import Sort from "./components/Sort";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex gap-4 my-14 px-8">
      <div className="min-w-48">
        <Collections />
        <Sort />
      </div>
      <React.Fragment>{children}</React.Fragment>
    </main>
  );
};

export default layout;
