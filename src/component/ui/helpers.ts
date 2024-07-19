// // helpers.ts

// /**
//  * Convert hex color to RGB.
//  * @param {string} hex - The hex color code.
//  * @returns {object} An object with r, g, b properties.
//  */
// export function hexToRgb(hex: string): { r: number, g: number, b: number } {
//     const bigint = parseInt(hex.slice(1), 16);
//     const r = (bigint >> 16) & 255;
//     const g = (bigint >> 8) & 255;
//     const b = bigint & 255;
//     return { r, g, b };
//   }
  
//   /**
//    * Generate an array of random numbers within a specified range.
//    * @param {number} count - The number of random numbers to generate.
//    * @param {number} min - The minimum value of the range.
//    * @param {number} max - The maximum value of the range.
//    * @returns {number[]} An array of random numbers.
//    */
//   export function genRandomNumbers(count: number, min: number, max: number): number[] {
//     const arr: number[] = [];
//     for (let i = 0; i < count; i++) {
//       arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
//     }
//     return arr;
//   }
  