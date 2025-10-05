// js/combat-moves.js

export const AI_MOVE_SETS = {
    adaptive: [
        "aggressive rush attack",
        "defensive counter stance",
        "special energy blast",
        "quick dodge maneuver",
        "power charge combo"
    ],
    aggressive: [
        "relentless assault combo",
        "fury strike barrage",
        "berserker mode activation",
        "devastating power slam"
    ],
    defensive: [
        "impenetrable shield formation",
        "counter-attack preparation",
        "defensive matrix activation",
        "protective barrier deployment"
    ],
    ninja: [
        "shadow clone technique",
        "lightning fast strikes",
        "smoke bomb vanish",
        "silent assassin approach"
    ],
    magical: [
        "arcane energy manipulation",
        "elemental storm summoning",
        "mystical shield conjuration",
        "reality distortion field"
    ]
};

export function getMoveDescription(move) {
    const descriptions = {
        "aggressive rush attack": "The AI charges forward with devastating speed and power!",
        "defensive counter stance": "The AI prepares to counter any incoming attack!",
        "special energy blast": "The AI unleashes a powerful energy projection!",
        "relentless assault combo": "Multiple rapid strikes overwhelm the opponent!",
        "shadow clone technique": "The AI creates multiple copies to confuse enemies!",
        "arcane energy manipulation": "Mystical forces bend to the AI's will!",
        "adaptive combat evolution": "The AI learns and adapts its fighting style in real-time!"
    };
    return descriptions[move] || "The AI executes an innovative combat technique!";
}

import { getGeminiResponse } from "./ai-integration.js";
import { player, boss } from "./character-data.js";

export async function handlePlayerMove(move) {
  player.lastMove = move;
  const prompt = `Player HP: ${player.hp}, Last move: ${player.lastMove}, Combo: ${player.combo}. Boss HP: ${boss.hp}, Phase: ${boss.phase}. What does Ra.One do next? Give a one-sentence taunt and name a move from these options: ${Object.values(AI_MOVE_SETS).flat().join(", ")}. Return in format: MOVE_NAME : TAUNT`;
  
  const aiReply = await getGeminiResponse(prompt);
  
  // Parse move and taunt from response
  const [moveName, taunt] = aiReply.split(":").map(s => s.trim());
  
  // Update UI with taunt
  document.getElementById("taunt-box").innerText = taunt || aiReply;
  
  // Optionally, handle the moveName in your game logic (e.g., animations)
  console.log("Ra.One move:", moveName);
  
  return moveName; // if you want to use this to trigger effects
}
