import{start}from"./time.js";import{render}from"./render.js";import{initialize}from"./initializer.js";import{simulate}from"./simulator.js";window.addEventListener("load",()=>{start(()=>{render(),initialize(),simulate()})});