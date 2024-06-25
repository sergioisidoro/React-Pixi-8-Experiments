import { Suspense, useCallback, useRef } from "react";
import "./App.css";

import { extend, useAsset, useTick } from "@pixi/react";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";

extend({ Container, Graphics, Text, Sprite });

function App() {
  const drawCallback = useCallback((graphics: Graphics) => {
    graphics.clear();
    graphics.setFillStyle({ color: "red" });
    graphics.rect(0, 0, 400, 200);
    graphics.fill();
  }, []);

  const bunnySprite = useAsset<Texture>("https://pixijs.com/assets/bunny.png");

  const spriteRef = useRef<Sprite>(null);

  useTick((ticker) => {
    // ^?

    if (spriteRef.current) {
      spriteRef.current.rotation += 0.01;
    }

    console.log(ticker);
  });

  return (
    <>
      <container x={100} y={100}>
        <graphics draw={drawCallback} />

        <container x={3}>
          <text text="This is text" />
          <pixiText text="This is pixiText" y={24} />
        </container>

        <container x={200}>
          <Suspense fallback={<pixiText text={"loading..."} />}>
            <pixiSprite
              texture={bunnySprite}
              anchor={0.5}
              x={100}
              y={100}
              width={150}
              height={150}
              ref={spriteRef}
            />
          </Suspense>
        </container>
      </container>
    </>
  );
}

export default App;
