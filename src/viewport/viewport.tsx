import { extend, useApp } from "@pixi/react"
import { Viewport } from "pixi-viewport";
import { useEffect } from "react";
import React from "react";

type AppViewportProps = {
    children: React.ReactNode
}
extend({ Viewport });

export const AppViewport = (props: AppViewportProps) => {
    const app = useApp();
    const {events} = app.renderer;
    const ticker = app.ticker;
    const viewportRef = React.useRef<Viewport>(null);

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.drag(
              {
                pressDrag: true, 
              }
            )
            .pinch(
              {
                noDrag: true,
                percent: 0.1,
              }
            )
            .wheel(
              {
                wheelZoom: false,
                trackpadPinch: true
              }
            )
            .clamp({ 
              direction: "all",
            })
            .clampZoom({ 
              minScale: 0.1, maxScale: 1
            }).clamp(
              {
                direction: "all",
                underflow: "top-left",
              }
            )
        }
    }, [viewportRef.current])

    return (
        <viewport
            screenWidth={window.innerWidth}
            screenHeight={window.innerHeight}
            worldWidth={1000}
            worldHeight={1000}
            events={events}
            ticker={ticker}
            ref={viewportRef}
            >
            {props.children}
        </viewport>
    )
}
