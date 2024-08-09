import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const filePath = 'DATA/characters.json';

export default {
  async takeDamage(params) {
    const { amount } = params;
    const characterList = JSON.parse((await fs.readFile(filePath)).toString());
    let charIndex = null;

    // Runs a function for every item in the array
    characterList.map((char, index) => {
      // Transform the name to lowercase and trimmed
      const name = char.name.toLowerCase().trim();
      const searchName = params.character.name.toLowerCase().trim();

      console.log('Name is ' + name, searchName);

      if (name !== searchName) return; // Do nothing if name does not match

      console.log('Subtracting hp');
      // Subtract the character hp
      char.hp -= amount;
      charIndex = index;
    });

    // Write the new character stats into file
    if (charIndex) await fs.writeFile(filePath, JSON.stringify(characterList));

    // Null if character is not found
    return !charIndex ? null : characterList[charIndex].hp;
  },

  async character(param) {
    const characterList = JSON.parse((await fs.readFile(filePath)).toString());

    // Search through list for a matching name
    const character = await characterList.find((char) => {
      const { name, class: charClass } = char;
      const { name: searchedName } = param;

      return name.toLowerCase().trim() == searchedName.toLowerCase().trim();
    });

    return character;
  },

  async party() {
    return JSON.parse((await fs.readFile(filePath)).toString());
  },
};
