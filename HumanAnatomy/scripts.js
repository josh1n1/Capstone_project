import * as THREE from 'three';

const canvas = document.getElementById

const partsContainer = document.getElementById("parts-container");
const parts = Array.from (partsContainer.children);

parts.forEach((child) => {
    child.addEventListener("click", () => {
        parts.forEach((part) => (part.style.backgroundColor = "#020234"));
        child.style.backgroundColor = "#FF7900";
      });   
  });